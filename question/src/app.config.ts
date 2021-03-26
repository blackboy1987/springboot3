import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: [
      'pages/index/index',
    'pages/sign/index',
    'pages/faq/index',
    'pages/receive/index',
    'pages/record/index',
    'pages/cashout/index'
  ],
  window: {
    navigationBarTextStyle: "white",
    navigationBarBackgroundColor: "#FF9528",
    backgroundColor: "#EEE",
  }
};

export default config;
