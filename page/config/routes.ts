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
    name: '小程序',
    path: '/admin/app',
    component: './admin/app',
  },
  {
    name: '订单管理',
    path: '/admin/order',
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
    redirect: '/admin/app',
  },
  {
    component: './404',
  },
];
