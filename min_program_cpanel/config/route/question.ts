const movie = [
  {
    path: '/question',
    name: '答题小程序',
    routes: [
      {
        path: '/question/setting/base',
        name: '基本设置',
        component: './setting/base',
      },
      {
        path: '/question/setting/ad',
        name: '广告配置',
        component: './setting/ad',
      },
      {
        path: '/question/setting/other',
        name: '其他配置',
        component: './setting/other',
      },
    ],
  },
];

export default movie;
