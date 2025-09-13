import type { PluginOption } from 'vite'
import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(
  compress: string | undefined,
  deleteOriginFile = false,
): PluginOption | PluginOption[] {
  // 统一规范：去掉首尾引号，并支持逗号分隔、多值、空白
  const compressValue = String(compress ?? 'none').replace(/^['"]|['"]$/g, '')
  const compressList = compressValue.split(',').map(s => s.trim()).filter(Boolean)

  const plugins: PluginOption[] = []

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
      }),
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile,
      }),
    )
  }
  return plugins
}
