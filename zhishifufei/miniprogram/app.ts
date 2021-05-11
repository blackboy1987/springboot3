// app.ts
import {config} from "./utils/util";

App<IAppOption>({
  globalData: {},
  onLaunch() {

    config();

    // 小程序启动就执行登录。获取用户的最基本信息
    wx.login({
      success: res => {
        console.log(res.code)
      },
    });
  },
})
