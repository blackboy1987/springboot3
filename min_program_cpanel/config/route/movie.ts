const movie = [
  {
    path: '/movie',
    name: '电影小程序',
    routes: [
      {
        path: '/movie/setting',
        name: '基本设置',
        component: './Welcome',
      },
      {
        path: '/movie/ad',
        name: '广告配置',
        component: './setting/ad',
      },
    ],
  },
];

export default movie;
