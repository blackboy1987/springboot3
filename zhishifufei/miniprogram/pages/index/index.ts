// index.ts
// 获取应用实例
import {config, get, post} from "../../utils/util";

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    lunboList: [],
    speed:30,
    color:'#807C7C',
    page: 1,
    list:[],
    load: "上拉加载更多",
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    config();
    this.lunbo();
    this.all(this.data.page);
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  lunbo:function (){
    const root = this;
    get("lunbo",response => {
      root.setData({
        lunboList: response.data,
      });
    });
  },
  all:function (page: number){
    const root = this;
    post("all",{page},response => {
      console.log("all",response.data);
      if(page===1){
        root.setData({
          list: response.data,
          page: root.data.page+1,
          load:response.data.length>0?'上拉加载更多':'~~·我是有底线的人·~~'
        });
      }else{
        root.setData({
          list: root.data.list.concat(response.data),
          page: root.data.page+1,
          load:response.data.length>0?'上拉加载更多':'~~·我是有底线的人·~~'
        });
      }
    });
  },
  onReachBottom:function (){
    this.all(this.data.page);
  },
  
  openWin: function(e:{currentTarget:{dataset:{id: number,title: string}}}) {
    wx.navigateTo({
      url: "/pages/details/details?tid=" + e.currentTarget.dataset.id + "&title=" + e.currentTarget.dataset.title
    });
  },
})
