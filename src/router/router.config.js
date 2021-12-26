/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/market/index'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login'),
    meta: { title: '登陆', keepAlive: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register'),
    meta: { title: '注册', keepAlive: false }
  },
  {
    path: '/PasswordUpdate',
    name: 'PasswordUpdate',
    component: () => import('@/views/login/PasswordUpdate'),
    meta: { title: '注册', keepAlive: false }
  },
  {
    path: '/changePhone',
    name: 'changePhone',
    component: () => import('@/views/login/changePhone'),
    meta: { title: '修改手机号', keepAlive: false }
  },
  {
    path: '/changePhone2',
    name: 'changePhone2',
    component: () => import('@/views/login/changePhone2'),
    meta: { title: '修改手机号', keepAlive: false }
  },
  // 平台详情页
  {
    path: '/platformDeatil',
    name: 'platformDeatil',
    component: () => import('@/views/platform/platformDeatil'),
    meta: { title: '详情', keepAlive: false }
  },
  // 货币详情页
  {
    path: '/marketDetail',
    name: 'marketDetail',
    component: () => import('@/views/market/marketDetail'),
    meta: { title: '详情', keepAlive: false }
  },
  // 概念详情页
  {
    path: '/conceptDetail',
    name: 'conceptDetail',
    component: () => import('@/views/market/conceptDetail'),
    meta: { title: '概念详情', keepAlive: false }
  },
  // 富文本页面
  {
    path: '/detail',
    name: 'richHtml',
    component: () => import('@/views/richHtml/richHtml'),
    meta: { title: '详情', keepAlive: false }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/wallet/search'),
    meta: { title: '搜索', keepAlive: false }
  },
  {
    path: '/connectus',
    name: 'connectus',
    component: () => import('@/views/mine/connectus'),
    meta: { title: '联系我们', keepAlive: false }
  },
  {
    path: '/setPassword',
    name: 'setPassword',
    component: () => import('@/views/login/setPassword'),
    meta: { title: '设置密码', keepAlive: false }
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('@/views/mine/aboutus'),
    meta: { title: '关于我们', keepAlive: false }
  },
  {
    path: '/userAgreement',
    name: 'userAgreement',
    component: () => import('@/views/mine/userAgreement'),
    meta: { title: '用户协议', keepAlive: false }
  },
  {
    path: '/findpassword',
    name: 'findpassword',
    component: () => import('@/views/login/findpassword'),
    meta: { title: '找回密码', keepAlive: false }
  },
  // 我的
  {
    path: '/mine',
    component: () => import('@/views/layouts/index'),
    children: [
      {
        path: 'index',
        name: 'Mine',
        component: () => import('@/views/mine/mine'),
        meta: {
          title: '我的',
          keepAlive: false,
          hidePreview: true// 全局预览弹窗true隐藏false显示
        }
      }
    ]
  },
  // 钱包
  {
    path: '/wallet',
    component: () => import('@/views/layouts/index'),
    children: [
      {
        path: 'index',
        name: 'Wallet',
        component: () => import('@/views/wallet/wallet'),
        meta: { title: '钱包', keepAlive: false }
      },
      {
        path: '1',
        name: 'Wallet1',
        component: () => import('@/views/wallet/wallet1'),
        meta: { title: '钱包', keepAlive: false }
      },
      {
        path: '1',
        name: 'Wallet2',
        component: () => import('@/views/wallet/wallet1'),
        meta: { title: '钱包', keepAlive: false }
      }
    ]
  },
  {
    path: '/walletDetail',
    name: 'walletDetail',
    component: () => import('@/views/wallet/walletDetail'),
    meta: { title: '详情', keepAlive: false }
  },
  // 资讯
  {
    path: '/information',
    component: () => import('@/views/layouts/index'),
    children: [
      {
        path: 'index',
        name: 'Information',
        component: () => import('@/views/information/information'),
        meta: { title: '资讯', keepAlive: false }
      }
    ]
  },
  // 平台
  {
    path: '/platform',
    component: () => import('@/views/layouts/index'),
    children: [
      {
        path: 'index',
        name: 'Platform',
        component: () => import('@/views/platform/platform'),
        meta: { title: '平台', keepAlive: false }
      }
    ]
  },
  // 行情
  {
    path: '/market',
    component: () => import('@/views/layouts/index'),
    children: [
      {
        path: 'index',
        name: 'Market',
        component: () => import('@/views/market/market'),
        meta: { title: '行情', keepAlive: false }
      }
    ]
  }
]
