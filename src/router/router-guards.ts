import type { Router } from 'vue-router'
import { isNavigationFailure } from 'vue-router'
import NProgress from 'nprogress'
import { useRouteStoreWithOut } from '@/store/modules/route'
import { useUserStoreWithOut } from '@/store/modules/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { PageEnum } from '@/enums/pageEnum'
import 'nprogress/nprogress.css'
import { getAppEnvConfig } from '@/utils/env'

NProgress.configure({ parent: '#app' })

const LOGIN_PATH = PageEnum.BASE_LOGIN

const whitePathList = [LOGIN_PATH] // no redirect whitelist
// 允许通过“路由名”白名单（错误页/登录页）
const whiteNameList = [PageEnum.ERROR_PAGE_NAME, 'ErrorPageSon', PageEnum.BASE_LOGIN_NAME] as const

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // to: 即将要进入的目标
    // from: 当前导航正要离开的路由
    NProgress.start()
    const userStore = useUserStoreWithOut()

    // 允许错误页始终放行（避免未登录时进入 404 被重定向死循环）
    if (to.name && (whiteNameList as readonly string[]).includes(to.name as string)) {
      next()
      return
    }

    // Whitelist path 可直接进入（/login）
    if (whitePathList.includes(to.path as PageEnum)) {
      // 已登录访问登录页 -> 跳首页
      const token = storage.get(ACCESS_TOKEN)
      if (to.path === LOGIN_PATH && token) {
        next(PageEnum.BASE_HOME)
        return
      }
      next()
      return
    }

    const token = storage.get(ACCESS_TOKEN)

    if (!token) {
      // 未登录访问受限页，带上 redirect 返回登录后能回跳
      next({ path: LOGIN_PATH, query: { redirect: to.fullPath } })
      return
    }

    if (from.path === LOGIN_PATH && to.name === PageEnum.ERROR_PAGE_NAME) {
      next(PageEnum.BASE_HOME)
      return
    }

    // 当上次更新时间为空时获取用户信息
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.GetUserInfo()
      }
      catch (err) {
        // 拉取用户信息失败，视为登录失效，回登录并保留回跳路径
        next({ path: LOGIN_PATH, query: { redirect: to.fullPath } })
        return
      }
    }

    next()
  })

  // 进入某个路由之后触发的钩子
  router.afterEach((to, _, failure) => {
    // 设置每个页面的 title：路由标题 - 站点标题（优先中文标题）
    const { VITE_GLOB_APP_TITLE_CN, VITE_GLOB_APP_TITLE } = getAppEnvConfig()
    const appTitle = VITE_GLOB_APP_TITLE_CN || VITE_GLOB_APP_TITLE || document.title
    const routeTitle = (to?.meta?.title as string) || ''
    document.title = routeTitle ? `${routeTitle} - ${appTitle}` : appTitle

    if (isNavigationFailure(failure)) {
      console.warn('failed navigation', failure)
    }

    const routeStore = useRouteStoreWithOut()
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = routeStore.keepAliveComponents
    // 获取当前组件名
    const currentComName: any = to.matched.find(item => item.name === to.name)?.name

    // 如果 currentComName 且 keepAliveComponents 不包含 currentComName 且 即将要进入的路由 meta 属性里 keepAlive 为 true，则缓存该组件
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName)
      // keepAlive 为 false 则不缓存
    }
    else if (!to.meta?.keepAlive) {
      // 不需要缓存的组件

      // 这里的作用一开始组件设置为缓存，之后又设置不缓存但是它还是存在 keepAliveComponents 数组中
      // keepAliveComponents 使用 findIndex 与 当前路由对比，如果存在则返回具体下标位置，不存在返回 -1
      const index = routeStore.keepAliveComponents.findIndex(name => name === currentComName)
      if (index !== -1) {
        // 通过返回具体下标位置删除 keepAliveComponents 数组中缓存的 元素
        keepAliveComponents.splice(index, 1)
      }
    }
    routeStore.setKeepAliveComponents(keepAliveComponents)
    NProgress.done()
  })

  router.onError((error) => {
    console.error(error, '路由错误')
  })
}
