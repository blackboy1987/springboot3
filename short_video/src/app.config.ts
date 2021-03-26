import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: [
    'pages/index/index',
    'pages/detail/index',
  ],
  window: {
    navigationBarTitleText: '短视频',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle:'black',
  },
  tabBar:{
    color: "#A9A9A9",
    selectedColor: "#f49c36",
    borderStyle: "black",
    backgroundColor: "#323232",
    list:[
      {
        "pagePath": "pages/index/index",
        "text": "首页",
      },
      {
        "pagePath": "pages/index/index",
        "text": "分类",
      },
    ]
  }
};

export default config;
