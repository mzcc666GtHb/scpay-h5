# scpay-h5 AI 编码规范

本规范用于指导 AI 编辑器在本项目中进行统一、可维护、与现有配置一致的开发。请严格遵循本文档的「必须 / 建议 / 禁止」事项与流程清单。

## 1. 技术栈与总体原则

- 技术栈
  - Vue 3（Composition API, `<script setup>`）
  - Vite 5 + TypeScript
  - Pinia（含 pinia-plugin-persist 持久化）
  - Vue Router 4（hash 模式）
  - Axios 二次封装（请只用封装的 http 实例）
  - Vant 4（unplugin-vue-components 自动按需引入）
  - UnoCSS（含 icons、rem-to-px、attributify 等）
  - Less + PostCSS（mobile-forever）
- 包管理与 Node 版本
  - 只能使用 pnpm 安装依赖（已通过 only-allow 强制）
  - Node >= 20.9.0；pnpm >= 8.15.4
- 总体原则
  - 新增代码必须符合 ESLint 规则和 TypeScript 类型约束，确保 `pnpm lint`、`pnpm type:check` 通过
  - 仅通过项目提供的工具与封装（路由、状态、HTTP、存储、样式等）实现功能，避免自建“平行体系”

## 2. 目录结构与命名

- 目录组织（节选）
  - `src/views` 页面组件（按业务模块划分子目录）
  - `src/components` 可复用 UI 组件（组件文件名使用 PascalCase，如 `UserCard.vue`）
  - `src/store/modules` Pinia 模块（文件名使用 lowerCamel，如 `user.ts`、`designSetting.ts`）
  - `src/api` 接口模块（按域划分，文件名 kebab/camel 皆可，保持与现有一致，如 `system/user.ts`）
  - `src/utils` 工具库（含 `http/axios` 封装、`Storage.ts`、`env.ts` 等）
  - `src/router` 路由（`base.ts`、`modules.ts`、`router-guards.ts` 等）
  - `src/enums` 枚举（文件名 lowerCamel + `Enum` 后缀，如 `httpEnum.ts`, `pageEnum.ts`）
  - `src/styles` 全局样式（less、UnoCSS、过渡等）
  - `src/hooks` 组合式工具
- 命名规范
  - 组件名：PascalCase（如 `UserList.vue`）
  - 组件文件名：与组件名一致
  - Store Id：`app-xxx` 或与模块含义一致（如 `app-design-setting`）
  - 常量与枚举：使用大写或 `XxxEnum`（如 `ACCESS_TOKEN`、`ResultEnum`）
  - 路由名：使用统一常量或规范命名，尽量与页面、功能一致

## 3. 代码风格（ESLint/TS）

- ESLint（基于 @antfu/eslint-config）
  - 2 空格缩进、单引号
  - `vue/block-order`：SFC 顶级块顺序必须是 `template > script > style`
  - 禁止 `var`；回调函数必须用箭头函数
  - `curly: ["error","all"]` 所有控制语句必须带大括号
  - `brace-style: ['error','stroustrup']` 大括号风格
  - `max-params: 4`、`max-depth: 4`
- TypeScript
  - 严格模式开启（`strict: true`），`noImplicitAny` 当前为 false，但仍优先补全类型
  - 使用路径别名：`@/*` 指向 `src`，`#/*` 指向 `types`
  - 所有对外接口（API 层、Store state、Props/Emit）尽量具备明确类型

## 4. 组件开发规范（Vue + Vant + UnoCSS）

- SFC 约定
  - 使用 `<script setup lang="ts">`
  - 块顺序：`template`、`script`、`style`
  - 避免在 `style` 中使用全局样式污染，必要时 `scoped` 或合理使用 `:global()`/`:deep()`
- Vant
  - 组件由 `unplugin-vue-components` 自动按需引入，直接使用 `<van-*>` 标签即可，无需手动注册
  - 样式在 `src/main.ts` 已全局引入，无需重复引入
- UnoCSS
  - 优先使用原子类与 `shortcuts`（见 `uno.config.ts` 中的 `flex-center`、`wh-full` 等）
  - 类名过多时可使用 Attributify（如 `flex items-center` 可写为 `flex items-center` 或 `flex-center`）
  - 动态图标类名需加入 `safelist`，或用 `<SvgIcon name="...">` 组件
- 样式/主题
  - 全局 Less 变量通过 Vite `additionalData` 注入（`src/styles/var.less`）
  - 主题相关使用 `designSetting` Store（如 `appTheme`），不要另起全局变量体系

## 5. 路由规范（Vue Router）

- 基础路由在 `src/router/base.ts`，业务路由在 `src/router/modules.ts`（或相应模块化文件）
- 路由模式使用 `createWebHashHistory`
- 路由守卫位于 `src/router/router-guards.ts`，统一处理 NProgress、鉴权（基于 `ACCESS_TOKEN`）
- 白名单在守卫中维护（登录、错误页）
- KeepAlive 配置通过 `route` store 统一管理 `keepAliveComponents`

示例（新增一个业务路由，尽量采用模块化）：
```ts
// src/router/modules/example.ts
import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/example',
    name: 'Example',
    component: () => import('@/views/example/index.vue'),
    meta: { title: '示例页', keepAlive: true },
  },
] as RouteRecordRaw[]
```

## 6. 状态管理规范（Pinia）

- 在 `src/store/index.ts` 中已创建 Pinia，并全局启用 `pinia-plugin-persist`
- 新建 Store
  - 使用 `defineStore`，设置明确的 `id`，编写 `state/getters/actions`
  - 持久化：按需开启 `persist.enabled = true` 并设置 `strategies.key`，默认 `localStorage`
  - 提供 `useXxxStoreWithOut()` 便于在 `setup` 外（如路由守卫、工具函数）访问
- 示例：
```ts
// src/store/modules/example.ts
import { defineStore } from 'pinia'
import { store } from '@/store'

interface ExampleState {
  count: number
}

export const useExampleStore = defineStore({
  id: 'app-example',
  state: (): ExampleState => ({ count: 0 }),
  getters: {
    double: (s) => s.count * 2,
  },
  actions: {
    inc() { this.count++ },
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'EXAMPLE-STATE', storage: localStorage }],
  },
})
export function useExampleStoreWithOut() { return useExampleStore(store) }
```

## 7. HTTP/接口层规范（Axios 封装）

- 只使用 `src/utils/http/axios` 中暴露的 `http` 实例发起请求，禁止直接使用原生 axios/fetch
- 默认响应处理
  - 后端返回格式统一为 `{ code, message, result }`
  - `code === 200`（`ResultEnum.SUCCESS`）时返回 `result`
  - 401（`ResultEnum.TOKEN_EXPIRED`）自动对话框提示并清理存储，跳转登录
  - 错误提示默认使用 Vant 的 `showFailToast`/`showDialog`
- 常用可选项（第二参数）
  - `isTransformResponse: boolean`：是否跳过 transform，直接返回后端原始格式
  - `isReturnNativeResponse: boolean`：是否返回 `AxiosResponse`，用于取响应头
  - 其他：`errorMessageMode`、`withToken`、`joinPrefix`、`joinParamsToUrl` 等（参考封装实现）
- GET 参数/RESTful 约定
  - GET 非字符串 `params` 会自动追加时间戳避免缓存
  - 如 `params` 为字符串，将拼接到 URL（RESTful 风格）
- 示例：
```ts
// src/api/system/example.ts
import { http } from '@/utils/http/axios'

// 获取列表
export function fetchList(params: { page: number; pageSize: number }) {
  return http.request({
    url: '/example/list',
    method: 'GET',
    params,
  })
}

// 提交表单（需要拿原始返回）
export function submitForm(data: any) {
  return http.request(
    { url: '/example/submit', method: 'POST', data },
    { isTransformResponse: false },
  )
}
```

## 8. 本地缓存与 Token

- 统一使用 `src/utils/Storage.ts` 的 `createStorage` 实例或 Pinia 持久化，不直接操作 `localStorage`
- Token 等关键字段的 Key 从 `src/store/mutation-types.ts` 获取（如 `ACCESS-TOKEN`）
- 示例：
```ts
import { createStorage } from '@/utils/Storage'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const storage = createStorage({ storage: localStorage })
storage.set(ACCESS_TOKEN, 'token-value')
const token = storage.get(ACCESS_TOKEN)
```

## 9. 环境变量与配置

- 环境变量通过 `.env.*` 管理，必须以 `VITE_` 前缀
- 读取方式：`getAppEnvConfig()`（`src/utils/env.ts`）
- 新增环境变量需要同步更新 `types/config.d.ts` 的类型声明
- 代理按 `vite.config.ts` 中 `createProxy` 配置，统一走 `/api` 前缀

## 10. 样式与移动端适配

- 使用 UnoCSS + Less
  - UnoCSS 默认单位为 rem，已使用 `preset-rem-to-px` 将 rem 转为 px
  - PostCSS（mobile-forever）再将 px 转为 vw/vh，完成移动端适配
- 优先使用 UnoCSS 原子类与 `shortcuts`，必要时在 Less 中编写样式
- 全局变量在 `src/styles/var.less`，按需引用颜色/间距规范

## 11. 图标与资源

- 使用 `vite-plugin-svg-icons` + `virtual:svg-icons-register` 的本地图标：`<SvgIcon name="xxx"/>`
- 使用 UnoCSS 图标预设：`i-xxx:yyy` 类名（动态类名务必加入 `uno.config.ts` 的 `safelist`）
- 不随意引入外部图标库，保持一致性

## 12. Mock 数据

- 开发/调试使用 `vite-plugin-mock`，接口文件放在 `mock/` 下
- 约定接口前缀 `/api/*`，具体见示例 `mock/user/user.ts`
- 生产环境是否启用由 `VITE_GLOB_PROD_MOCK` 控制

## 13. 提交规范与校验

- 提交信息遵循 conventional commit，使用 `cz-git`（`pnpm dlx cz` 或配置的交互提交流程）
- 类型（部分）：`feat`、`fix`、`perf`、`style`、`docs`、`refactor`、`test`、`build`、`ci`、`chore`、`revert` 等
- 已配置 `simple-git-hooks` + `lint-staged`：提交前自动执行 `eslint --fix`
- 保证以下命令通过后再提交：
  - `pnpm lint`
  - `pnpm type:check`
  - 可选构建检查：`pnpm build`

## 14. 给 AI 的执行清单

当 AI 被要求进行以下任务时，请严格按下面步骤完成：

- 新增页面（View）
  1) 在 `src/views/<module>/` 下创建页面组件（SFC，`<script setup lang="ts">`）
  2) 在 `src/router/modules` 新建或更新对应路由模块，配置 `name`、`meta.title`、`keepAlive`
  3) 如需状态，先创建 Pinia 模块（带 `persist`），再在页面中使用
  4) 所需接口在 `src/api/<domain>/` 新建模块，通过 `http.request` 调用
  5) 使用 Vant 组件与 UnoCSS 原子类构建 UI；必要时在 Less 内使用 `@import "src/styles/var.less"`

- 新增接口（API）
  1) 在 `src/api/<domain>/xxx.ts` 新建函数，使用已封装的 `http.request`
  2) 定义请求/响应类型，默认处理返回 `result`，如需原始返回设置 `isTransformResponse: false`
  3) 统一错误提示交由封装处理，避免重复 Toast

- 新增 Store（Pinia）
  1) 文件放在 `src/store/modules/`，`defineStore` + 明确 `id`
  2) 提供 `state/getters/actions`，如需持久化配置 `persist`
  3) 导出 `useXxxStoreWithOut()` 便于在非 `setup` 环境使用

- 使用图标
  - 本地 SVG：`<SvgIcon name="your-icon-name" />`
  - UnoCSS 图标：`class="i-weui:home-filled"`；若动态类名，务必加入 `uno.config.ts` 的 `safelist`

## 15. 禁止事项

- 禁止直接使用 `axios` 或 `fetch`；必须使用 `src/utils/http/axios` 暴露的 `http`
- 禁止直接操作 `localStorage/sessionStorage`；使用 `Storage` 或 Pinia 持久化
- 禁止引入与现有栈冲突的 UI/样式框架（如再引入其他 UI 库、Tailwind 等）
- 禁止修改 `types/auto-imports.d.ts`、`components.d.ts` 等自动生成文件
- 禁止无视 ESLint、TypeScript 报错强行提交
- 禁止使用与现有路由守卫冲突的自定义鉴权逻辑

## 16. 附：常用代码片段

- 新建 `<script setup lang="ts">` 组件模板
```vue
<template>
  <div class="p-16">
    <van-button type="primary" class="w-full">提交</van-button>
  </div>
</template>

<script setup lang="ts">
// 这里编写逻辑，优先使用组合式 API + 类型提示
</script>

<style scoped lang="less">
/* 必要时编写局部样式，优先使用 UnoCSS 原子类 */
</style>
```

- 通过 HTTP 获取数据并渲染
```ts
// src/views/example/index.ts (伪示例，逻辑写在 <script setup> 中)
import { fetchList } from '@/api/system/example'
const list = ref<any[]>([])
onMounted(async () => {
  list.value = await fetchList({ page: 1, pageSize: 10 })
})
```

---

如需调整或补充（如引入 i18n、E2E 测试规范等），请在本文件基础上迭代，保持与项目配置一致。