import { resolve } from 'node:path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { format } from 'date-fns'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { OUTPUT_DIR } from './build/constant'
import { createProxy } from './build/vite/proxy'
import pkg from './package.json'

const { dependencies, devDependencies, name, version } = pkg

// 当使用文件系统路径的别名时，请始终使用绝对路径。相对路径的别名值会原封不动地被使用，因此无法被正常解析。
// path.resolve () 方法用于将一系列路径段解析为绝对路径。它通过处理从右到左的路径序列来工作，在每个路径之前添加，直到创建绝对路径。
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const __APP_INFO__ = {
  // APP 后台管理信息
  pkg: { dependencies, devDependencies, name, version },
  // 最后编译时间
  lastBuildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
}

/** @type {import('vite').UserConfig} */
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // process.cwd() 方法返回 Node.js 进程的当前工作目录
  // mode 返回应用的环境模式 development（开发环境） 或者 production（生产环境）
  // command 返回（dev/serve 或 build）命令模式，yarn dev 返回 dev/serve yarn build 返回 build
  const root = process.cwd()
  // loadEnv() 根据 mode 检查 root(项目根路径) 路径下 .env、.env.development 环境文件，输出 NODE_ENV 和 VITE_ 开头的键值队
  const env = loadEnv(mode, root)
  // 读取并处理所有环境变量配置文件 .env
  const viteEnv = wrapperEnv(env)

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PORT, VITE_PROXY, VITE_GLOB_PROD_MOCK }
    = viteEnv

  const prodMock = VITE_GLOB_PROD_MOCK

  const isBuild = command === 'build'
  // command === 'build'
  return {
    base: VITE_PUBLIC_PATH,
    root,

    // 别名
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`,
        },
        // #/xxxx => types/xxxx
        {
          find: /\#\//,
          replacement: `${pathResolve('types')}/`,
        },
      ],
      dedupe: ['vue'],
    },

    // 定义全局常量替换方式
    define: {
      // 在生产中 启用/禁用 intlify-devtools 和 vue-devtools 支持，默认值 false
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    esbuild: {
      // 使用 esbuild 压缩 剔除 console.log
      drop: VITE_DROP_CONSOLE ? ['debugger', 'console'] : [],
      // minify: true, // minify: true, 等于 minify: 'esbuild',
    },

    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      minify: 'esbuild',
      // 构建后是否生成 source map 文件(用于线上报错代码报错映射对应代码)
      sourcemap: false,
      cssTarget: 'chrome80',
      // 指定输出路径（相对于 项目根目录)
      outDir: OUTPUT_DIR,
      // 只有 minify 为 terser 的时候, 本配置项才能起作用
      // terserOptions: {
      //   compress: {
      //     // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
      //     keep_infinity: true,
      //     // 打包是否自动删除 console
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // 启用/禁用 gzip 压缩大小报告
      // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      reportCompressedSize: true,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          // 将常见三方库按组拆分，其他依赖并入 vendor，避免产出大量小 chunk
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            const groups: Record<string, string[]> = {
              vue: ['vue', 'vue-router', 'pinia'],
              vant: ['vant', '@vant/use'],
              echarts: ['echarts'],
              lodash: ['lodash-es'],
            }
            for (const [chunk, pkgs] of Object.entries(groups)) {
              if (pkgs.some((pkg) => id.includes(`/node_modules/${pkg}/`))) {
                return chunk
              }
            }
            return 'vendor'
          },
        },
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
          // 注入全局 less 变量
          additionalData: `@import "src/styles/var.less";`,
        },
      },
    },

    server: {
      host: true,
      // 服务启动时是否自动打开浏览器
      open: true,
      // 服务端口号
      port: Number(VITE_PORT),
      proxy: createProxy(VITE_PROXY),
      // 预热文件以降低启动期间的初始页面加载时长
      warmup: {
        // 预热的客户端文件：首页、views、 components
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
      // proxy: {
      //     '/api': {
      //         target: '',
      //         changeOrigin: true,
      //         rewrite: (path) => path.replace(/^\/api/, '/api/v1')
      //     }
      // }
    },

    optimizeDeps: {
      /**
       * 依赖预构建...
       */
      include: [
        // 原有
        'pinia',
        'lodash-es',
        'axios',
        // 新增：核心/常用依赖，优化冷启动 & 路由切换体验
        'vue',
        'vue-router',
        '@vueuse/core',
        'nprogress',
        'qs',
        'echarts',
      ],
      exclude: [
        // https://www.mulingyuer.com/archives/928/
        'vant',
        '@vant/use',
      ],
    },

    // 加载插件
    plugins: createVitePlugins(viteEnv, isBuild, prodMock),
  }
}
