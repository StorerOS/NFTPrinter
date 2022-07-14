import Vue from 'vue'
import Router from 'vue-router'

import _ from 'lodash'
import beforeEachHooks from './beforeEachHooks'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import PortalLayout from '@/views/portal'

import Home from '@/views/portal/home/index'

const componentRouterView = {
  render(h) { return h('router-view') }
}

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/403'),
    hidden: true
  },
  {
    path: '/portal',
    component: PortalLayout,
    name: 'Portal',
    children: [{
      path: '/home',
      name: 'Home',
      component: Home,
      hidden: true
    }, {
      path: '/rent',
      name: 'Rent',
      component: () => import('@/views/rent/index'),
      meta: { title: 'REGISTER NFT' }
    }, {
      path: '/printer',
      name: 'Printer',
      component: () => import('@/views/printer/index'),
      meta: { title: 'PRINT PRODUCTS' }
    },
    {
      path: '/go-print/:id',
      name: 'GoPrint',
      component: () => import('@/views/printer/print/index'),
      meta: { title: 'PRINT PRODUCTS' },
      hidden: true
    }, {
      path: '/submit-print/:id',
      name: 'SubmitPrint',
      component: () => import('@/views/printer/submit-print/index'),
      meta: { title: 'PRINT PRODUCTS' },
      hidden: true
    }, {
      path: '/recent-transactions',
      name: 'RecentTransactions',
      component: () => import('@/views/recent-transactions/index'),
      meta: { title: 'PRINT PRODUCTS' },
      hidden: true
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/portal/about/index'),
      meta: { title: 'ABOUT' }
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/portal/community/index'),
      meta: { title: 'COMMUNITY' }
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: () => import('@/views/portal/faq/index'),
      meta: { title: 'FAQ' }
    }]
  },
  {
    path: '/m',
    name: 'Mobile',
    component: componentRouterView,
    children: [
      {
        path: 'traceability/check',
        name: 'TraceabilityCheck',
        component: () => ({ template: '<div />' })
      },
      {
        path: 'traceability',
        name: 'Traceability',
        component: () => import('@/views/mobile/traceability/query'),
        meta: { title: 'Traceability query' }
      },
      {
        path: 'traceability/validate',
        name: 'TraceabilityValidate',
        component: () => import('@/views/mobile/traceability/validate'),
        meta: { title: 'Traceability query' }
      },
      {
        path: 'traceability/scan-code-record',
        name: 'TraceabilityScanCodeRecord',
        component: () => import('@/views/mobile/traceability/scan-code-record'),
        meta: { title: 'Traceability query' }
      }
    ]
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/home'
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

_.values(beforeEachHooks).forEach((hook) => {
  router.beforeEach(hook)
})

export default router
