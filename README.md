# scpay-h5

基于 Vite 5 + Vue 3 + TypeScript + Vant 4 + UnoCSS 的移动端 H5 项目模板，内置路由/权限、Axios 封装、移动端适配、主题/暗黑模式、Mock、SVG 雪碧图、图表 Hook 等，开箱即用，适合快速构建移动端业务。

## 特性一览

- 技术栈与工程化
  - Vite 5 + Vue 3.3+ + TypeScript
  - Vant 4 移动端组件库（按需自动引入）
  - UnoCSS（原子化/图标/属性化/排版/WebFonts/RemToPx）
  - Less + PostCSS 移动端适配（postcss-mobile-forever）
  - 自动导入 API（vue/vue-router/pinia/@vueuse/core）
  - 组件自动按需（unplugin-vue-components + VantResolver）
- 业务与基础设施
  - 路由/路由守卫/菜单/KeepAlive + Tabbar 布局
  - Axios 二次封装（请求/响应拦截、错误处理、Token 注入）
  - ECharts Hook（useECharts）便捷绘图
  - SVG 雪碧图（vite-plugin-svg-icons）
  - 本地/生产 Mock（vite-plugin-mock）
- 构建与质量
  - 产物目录：dist/vant-mobile
  - Gzip/Brotli 压缩可选
  - Bundle 可视化（rollup-plugin-visualizer）
  - ESLint + lint-staged + commitlint + simple-git-hooks
  - 仅允许 pnpm 管理（only-allow）

## 技术栈

- 运行环境
  - Node: ^20.9.0 或 >=21.7.1
  - pnpm: >=8.15.4（本项目 packageManager: pnpm@9.8.0）
- 主要依赖
  - vue、vue-router、pinia、@vueuse/core
  - vant
  - axios、qs、lodash-es、date-fns
  - echarts
- 工程相关
  - vite、@vitejs/plugin-vue、rollup
  - unocss 系列、unplugin-auto-import、unplugin-vue-components
  - vite-plugin-mock、vite-plugin-svg-icons、vite-plugin-html
  - postcss、postcss-mobile-forever、less
  - eslint、@antfu/eslint-config、commitlint、simple-git-hooks

## 项目结构（节选）

## 快速开始

- 软件要求
  - 安装 Node（>= 20.9.0）
  - 安装 pnpm（>= 8.15.4）：npm i -g pnpm
  - 注意：项目使用 only-allow 强制 pnpm 安装依赖

- 安装依赖
  - pnpm install 或 pnpm bootstrap

- 启动开发环境
  - pnpm dev
  - 默认端口从 .env.development 读取（VITE_PORT 默认 9999）

- 构建
  - pnpm build
  - 产物目录：dist/vant-mobile

- 预览构建产物
  - pnpm preview

## 可用脚本

- bootstrap：安装依赖（pnpm install）
- dev：启动开发环境
- dev:debugcjs：调试 CJS 兼容输出
- build：生产构建并执行构建后处理（tsx ./build/script/postBuild.ts）
- build:no-cache：清理缓存后构建
- report：生成构建分析报告（可视化 bundle）
- preview：本地预览打包产物
- type:check：类型检查（vue-tsc）
- lint：代码检查
- lint:fix：修复代码风格
- clean:cache：清理 vite 缓存目录
- clean:lib：删除 node_modules

## 环境变量说明

根目录 .env/.env.development/.env.production 提供了以下变量（仅列常用）：

- 运行与基础
  - VITE_PORT：本地开发端口（dev）
  - VITE_PUBLIC_PATH：应用基础路径，默认 /
  - VITE_DROP_CONSOLE：是否移除 console（prod 通常开启）
- 接口与资源
  - VITE_GLOB_API_URL：后端 API 根地址（无跨域可直接配置）
  - VITE_GLOB_API_URL_PREFIX：接口前缀（默认 /api）
  - VITE_GLOB_UPLOAD_URL：上传地址
  - VITE_GLOB_IMG_URL：图片前缀
- Mock
  - VITE_USE_MOCK：开发环境是否启用 Mock
  - VITE_GLOB_PROD_MOCK：生产环境是否启用 Mock（需同时在构建时开启）
- 其它
  - VITE_GLOB_APP_TITLE：英文标题
  - VITE_GLOB_APP_TITLE_CN：中文标题
  - VITE_GLOB_APP_SHORT_NAME：短名（仅字母/下划线）
  - VITE_PROXY：开发代理配置（JSON 字符串，例如：[[\"/api\",\"http://localhost:8001\"]]）

提示：

- 生产构建产物目录由 build/constant.ts 指定：dist/vant-mobile
- 别名：@ 指向 src，# 指向 types（见 vite.config.ts）

## 代理与 Mock

- 代理
  - 在 .env.development 的 VITE_PROXY 中配置，格式为二维数组字符串
  - 例如：VITE_PROXY=[["/api","http://localhost:8001"]]
  - 由 build/vite/proxy.ts 解析并注入到 server.proxy

- Mock（vite-plugin-mock）
  - 开发环境：VITE_USE_MOCK=true 时启用
  - 生产环境：需 VITE_USE_MOCK=true 且 VITE_GLOB_PROD_MOCK=true
  - Mock 目录：/mock，生产注入代码见 build/vite/plugin/mock.ts

## 样式与移动端适配

- UnoCSS
  - 预设：presetUno、presetIcons、presetAttributify、presetTypography、presetWebFonts、preset-rem-to-px
  - 属性化写法、图标（i-xxx）、常用快捷类（shortcuts）在 uno.config.ts 已内置
  - safelist 预生成了一些图标类，解决运行时动态类名问题

- PostCSS 移动端适配（postcss-mobile-forever）
  - 统一移动端适配方案，默认 375 设计稿宽度，自动转换为 vw
  - 桌面端展示最大宽度 600
  - 可在 postcss.config.js 调整

- 主题与暗黑
  - App.vue 中基于 Vant ConfigProvider 注入主题变量
  - less 变量在 src/styles/var.less，Vant 主题覆盖见 src/styles/vant.less

## SVG 图标（雪碧图）

- 存放目录：src/assets/icons
- 生成规则：symbolId = icon-[dir]-[name]（参见 build/vite/plugin/svgSprite.ts）
- 使用组件：src/components/SvgIcon.vue
- 使用示例：
  - 将 my/icon.svg 放入 src/assets/icons/my/icon.svg
  - 组件中使用：<SvgIcon name="my-icon" size="20" color="#333" />

## 路由与布局

- 路由
  - Hash 模式：createWebHashHistory
  - 基础路由：登录、根路由、404（见 src/router/base.ts）
  - 模块化路由：src/router/modules.ts（带 Tabbar 的四个主菜单及若干内页）
  - 守卫：src/router/router-guards.ts（Token 校验、动态标题、KeepAlive 记录等）

- 布局
  - 布局组件：src/layout/index.vue
  - 顶部 NavBar + 内容区 + 底部 Tabbar
  - 支持基于 meta.keepAlive 的页面缓存、不显示 Header 的内页、Tabbar 菜单过滤

- 菜单图标
  - 采用 UnoCSS 图标，示例：i-simple-icons:atlassian
  - 如需新增图标，可在 uno.config.ts 的 safelist 中添加

## Axios 封装

- 位置：src/utils/http/axios
- 能力：请求/响应拦截、错误提示、Token 注入、URL/时间戳拼接、原生响应可选等
- 自定义请求参数结构见 types.ts 的 RequestOptions
- 使用建议：
  - 统一通过封装后的实例发起请求
  - 根据后端返回结构调整 transform 与错误处理

## 构建与产物

- 构建命令：pnpm build
- 产物目录：dist/vant-mobile
- 可视化报告：pnpm report（bundle 分析）
- 压缩：通过 .env.production 配置 VITE_BUILD_COMPRESS（可选：gzip | brotli | none），并可设置是否删除原文件

## 部署

- 纯静态资源部署（Nginx/静态托管）：
  - 将 dist/vant-mobile 目录内容部署即可
  - 路由为 Hash 模式，无需额外服务端回退配置
- Vercel：
  - 根目录提供 vercel.json，可直接构建静态站点发布

## 代码规范与提交

- ESLint：执行 pnpm lint / pnpm lint:fix
- 提交校验：
  - simple-git-hooks：pre-commit 执行 lint-staged、commit-msg 执行 commitlint
  - lint-staged：提交前自动修复已暂存文件
  - commitlint：校验提交信息（遵循约定式提交）
- 包管理：
  - preinstall 使用 only-allow 强制 pnpm

## 常见问题

- 启动时报错 “The CJS build of Vite's Node API is deprecated.”
  - 已在 postcss.config.js 中迁移为 ESM 语法
- 依赖安装失败或冲突
  - 确认使用 pnpm（而不是 npm/yarn）
  - Node 版本符合要求
- 图标不显示
  - 确保 SVG 文件位于 src/assets/icons
  - 使用名称符合 icon-[dir]-[name] 规则
- keep-alive 不生效
  - 组件需要存在 name（路由 name 与组件 name 匹配）
  - meta.keepAlive === true 的页面会被缓存

## 许可证

MIT License
