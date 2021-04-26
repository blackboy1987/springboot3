export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: '首页',
    component: './Welcome',
  },
  {
    name: '公众号设置',
    path: '/base',
    component: './app/base',
  },
  {
    name: '广告配置',
    path: '/ad',
    component: './app/ad',
  },
  {
    name: '公众号',
    path: '/app',
    component: './admin/app',
    access: 'canAdmin'
  },
  {
    name: '订单管理',
    path: '/order',
    component: './admin/order',
    access: 'canAdmin'
  },
  {
    name: '修改密码',
    path: '/password',
    component: './app/password',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
