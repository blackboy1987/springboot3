const answer = [
  {
    path: '/answer',
    name: '答题小程序',
    routes: [
      {
        path: '/answer/setting',
        name: '基本设置',
        component: './setting/base',
      },
      {
        path: '/answer/ad',
        name: '广告配置',
        component: './Welcome',
      },
      {
        path: '/answer/member',
        name: '会员管理',
        component: './Welcome',
      },
      {
        path: '/answer/memberRank',
        name: '会员等级',
        component: './Welcome',
      },
      {
        path: '/answer/subject',
        name: '题库管理',
        component: './Welcome',
      },
      {
        path: '/answer/answerRecord',
        name: '答题记录',
        component: './Welcome',
      },
    ],
  },
];
export default answer;
