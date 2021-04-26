import * as React from 'react';
import {View, Image, navigateTo, request, setStorageSync} from 'remax/wechat';
import './index.css';
import {Constants, xingZuo} from "@/util/constants";
import {usePageEvent} from "remax/macro";
import {useState} from "react";
import MyAd from "@/component/MyAd";
import {myCreateInterstitialAd, myCreateRewardedVideoAd} from "@/util/adUtils";

export default () => {
    const [rewardedVideoAd,setRewardedVideoAd] = useState<WechatMiniprogram.InterstitialAd>();
    const [interstitialAd,setInterstitialAd] = useState<WechatMiniprogram.InterstitialAd>();
    const [ads,setAds] = useState<{
        bannerId?: string;
        gridAdId?: string;
        interstitialAdId?: string;
        nativeAdId?: string;
        rewardedVideoAdId?: string;
        videoAdId?: string;
        videoFrontAdId?: string;
    }>({});

    usePageEvent("onLoad",(e)=>{
        request({
            url:Constants.baseUrl+"config",
            header:{
                appCode: Constants.appCode,
                appToken: Constants.appToken,
            },
            method:"POST",
        }).then(response=> {
            setStorageSync("appConfig", response.data.data);
            const ad = response.data.data.indexAd || {};
            setAds(ad);
            if (rewardedVideoAd == null && ad.rewardedVideoAdId) {
                setRewardedVideoAd(myCreateRewardedVideoAd(ad.rewardedVideoAdId));
            }
            if (interstitialAd == null && ad.interstitialAdId) {
                const myInterstitialAd = myCreateInterstitialAd(ad.interstitialAdId);
                setInterstitialAd(myInterstitialAd);
                myInterstitialAd.show();
            }
        });
    });
  return (
      <View className="fortune_box bg5">
          <view className="fortune">
                <MyAd ads={ads} />
              {
                  xingZuo.map((item,index)=>(
                      <View className="li" key={index} onClick={()=>navigateTo({
                          url:'/pages/fortune/index?id='+index,
                      })}>
                          <Image className="li_img" mode="widthFix" src={`/image/item-circle/${index+1}.png`} />
                          <View className="name">{item.name}</View>
                          <View className="date">{item.date}</View>
                      </View>
                  ))
              }
          </view>
      </View>
  );
};
