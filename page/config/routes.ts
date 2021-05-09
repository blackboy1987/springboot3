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
    access: 'canAdmin'
  },
  {
<<<<<<< HEAD
    name: '订单管理',
    path: '/admin/order',
    component: './admin/order',
    access: 'canAdmin'
=======
    path: '/movie',
    name: '影视',
    access: 'movie',
    routes: [
      {
        path: '/movie/welcome',
        name: '首页',
        component: './movie/Welcome',
        access: 'movie',
      },
      {
        name: '基本设置',
        path: '/movie/base',
        component: './app/base',
        access: 'movie',
      },
      {
        name: '广告配置',
        path: '/movie/ad',
        component: './movie/app/ad',
        access: 'movie',
      },
    ]
  },
  {
    path: '/daKa',
    name: '打卡',
    access: 'daKa',
    routes: [
      {
        path: '/daKa/welcome',
        name: '首页',
        component: './daKa/Welcome',
        access: 'daKa',
      },
      {
        name: '基本设置',
        path: './app/base',
        component: './app/base',
        access: 'daKa',
      },
      {
        name: '广告配置',
        path: '/daKa/ad',
        component: './daKa/app/ad',
        access: 'daKa',
      },
      {
        name: '分享配置',
        path: '/daKa/share',
        component: './daKa/app/share',
        access: 'daKa',
      },
      {
        name: '打卡配置',
        path: '/daKa/click',
        component: './daKa/app/click',
        access: 'daKa',
      },
    ]
>>>>>>> f655aed9a917c8bab7e799ccd98186dfb9ef669f
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
