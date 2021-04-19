import * as React from 'react';
import {View, Ad, Image, navigateTo, request,createInterstitialAd} from 'remax/wechat';
import './index.css';
import {Constants, data} from "@/util/constant";
import {usePageEvent} from "remax/macro";
import {useState} from "react";
import MyAd from "@/component/myAd";

export default () => {
    const [indexAd,setIndexAd] = useState<{[key: string]: any}>({});
    usePageEvent("onLoad",()=>{
        request({
            url:Constants.baseUrl+"config",
            method:'POST',
            header:{
                'appCode':Constants.appCode,
                'appToken':Constants.appToken,
            }
        }).then(response=>{
            wx.setStorageSync("appConfig",response.data.data);
            setIndexAd(response.data.data.indexAd||{});
            const interstitialAd = createInterstitialAd({
                adUnitId:response.data.data.indexAd.interstitialAdId
            });
            interstitialAd.onLoad(() => {
                console.log("11111111111111");
            })
            interstitialAd.onError((err) => {
                console.log("222222222222222222");})
            interstitialAd.onClose(() => {
                console.log("3333333333333333");})
            interstitialAd.show().catch((err) => {
                console.error(err)
            })
        });
    });

  return (
    <View>
      <view className="fortune_box bg5">
          <MyAd adConfig={indexAd} />
        <View className="fortune">
          {
            data.map((item,index)=>(
                <View className="li" onClick={()=>{
                    navigateTo({
                        url:'/pages/fortune_info/index?id='+(index+1)
                    })
                }} key={index}>
                  <Image className="li_img" mode="widthFix" src={`https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/pince/item-circle/${index+1}.png`} />
                  <View className="name">{item.name}</View>
                  <View className="date">{item.date}</View>
                </View>
            ))
          }
        </View>
      </view>
    </View>
  );
};
