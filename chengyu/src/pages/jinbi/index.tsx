import * as React from 'react';
import {
  View,
  Image,
  Button,
  Text,
  getStorageSync,
  setStorageSync,
  OpenData, showToast
} from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
// @ts-ignore
import className from 'classnames';
import './index.css';
import {useState} from "react";
import CustomAd from "@/components/CustomAd";
import {SiteConfig, UserInfo} from "@/data";
import {defaultSiteConfig, defaultUserInfo} from "@/util/constants";
import {
  getUserInfo,
  interstitialAdCreate1,
  post,
  rewardedVideoAdCreate1,
  rewardedVideoAdShow1,
  siteInfo
} from "@/util/wxUtils";

let rewardedVideoAd: WechatMiniprogram.RewardedVideoAd;
let interstitialAd: WechatMiniprogram.InterstitialAd;
let timer:NodeJS.Timeout;
const wuser = [
  {
    headimgurl:'',
  },
  {
    headimgurl:'',
  },
]
const wList=[
  {},{},{},
];

export const JinBi = () => {

  const [time,setTime] = useState<number>(getStorageSync('rewardedVideoAdInterval')||0);
  const [userInfo,setUserInfo]  = useState<UserInfo>(defaultUserInfo);
  const [siteConfig,setSiteConfig]  = useState<SiteConfig>(defaultSiteConfig);
  const [rewardedVideoAdLoading,setRewardedVideoAdLoading]  = useState<boolean>(false);
  const [showVideoAdButton,setShowVideoAdButton]  = useState<boolean>(false);



  const reward = (type: string) =>{
    post("reward",{
      type
    },data=>{
      getUserInfo(data=>setUserInfo(data));
    })
  }


  /**
   * 插屏广告的显示
   */
  const interstitialAdShow=()=>{
    if(interstitialAd){
      interstitialAd.show().then((e)=>{
        console.log("show",e);
      })
    }
  }

  /**
   * 激励视频广告的显示
   */
  const rewardedVideoAdShow=()=>{
    let dayRewardedVideoAdCount = siteConfig.config.dayRewardedVideoAdCount||5;
    const reviewRewardedVideoAdCount =getStorageSync('reviewRewardedVideoAdCount')||0;
    if(dayRewardedVideoAdCount<=reviewRewardedVideoAdCount){
      showToast({
        icon:'none',
        title:'哎呀，客官，今日广告以为您全部播放完毕，请明日再来吧！！！',
      }).then();
      setShowVideoAdButton(false);
      return ;
    }


    if(rewardedVideoAdLoading){
      showToast({
        icon:'none',
        title:'客官莫要着急，视频广告正在来的路上！！！',
      }).then();
    }
    setRewardedVideoAdLoading(true);
    if(rewardedVideoAd){
      rewardedVideoAdShow1(rewardedVideoAd);
    }
  }


  const flushTime=(newTime:number)=>{
    const timer = setTimeout(()=>{
      setTime(newTime-1);
      setStorageSync('rewardedVideoAdInterval',newTime-1);
      if(newTime<=0){
        setStorageSync('rewardedVideoAdInterval',0);
        clearTimeout(timer);
      }else{
        flushTime(newTime-1);
      }
    },1e3);
  }

  usePageEvent('onLoad',()=>{
    const newTimer = getStorageSync('rewardedVideoAdInterval')||0;
    flushTime(newTimer);
    // 用户信息
    getUserInfo(data=>setUserInfo(data));
    siteInfo((data:SiteConfig)=>{
      setSiteConfig(data);
      setStorageSync('rewardedVideoAdInterval',data.config.rewardedVideoAdInterval||0);
      setTime(getStorageSync('rewardedVideoAdInterval')||0)
      if(data.ads?.index.interstitialAdId&&!interstitialAd){
        interstitialAd = interstitialAdCreate1(data.ads.index.interstitialAdId,{});
      }
      if(data.ads?.index.rewardedVideoAdId&&!rewardedVideoAd){
        rewardedVideoAd = rewardedVideoAdCreate1(data.ads.index.rewardedVideoAdId,{
          onClose:({isEnded})=>{
            if(isEnded){
              reward('reviewRewardedVideoAd');
              setStorageSync('rewardedVideoAdInterval',siteConfig.config.rewardedVideoAdInterval||300);
            }else{
              showToast({
                icon:'none',
                title:'哎呀，客官您浪费了一次获取奖励的机会，可惜了！！！',
              }).then()
            }
            setRewardedVideoAdLoading(false);
          },
          onError:(e)=>{
            showToast({
              icon:'none',
              title:'广告再来的路上被打劫了，客官稍后再来吧！！！',
            }).then()
            setRewardedVideoAdLoading(false);
          },
        });
      }
    });
  });

  usePageEvent('onShow',()=>{
    timer = setTimeout(()=>{
      interstitialAdShow();
    },15e3);
  })

  usePageEvent('onHide',()=>{
    console.log("onHide");
  })

  return (
    <>
      <View className="main">
        <View className="user">
          {
            userInfo.avatarUrl ? (
                <Image className="user-avatar" src={userInfo.avatarUrl} />
            ) : (
                <View className='user-avatar1'>
                  <OpenData lang='zh_CN' type='userAvatarUrl' />
                </View>
            )
          }
          {
            userInfo.nickName ? (
                <View className="user-nickname">{userInfo.nickName}</View>
            ) : (
                <View className="user-nickname"><OpenData lang='zh_CN' type='userNickName' /></View>
            )
          }

          <View className="user-power">体力：<Text>{userInfo.point}</Text></View>
        </View>
        <View className="jinbi-box">
          {
            showVideoAdButton&&time<=0 ? (
                <Button className="wshiping" disabled={time>0} onClick={rewardedVideoAdShow}> 观看视频每次奖励 {siteConfig.config.perVideoGold} 体力</Button>
            ) : null
          }
          {
            time>0 ? (
                <View className="wshiping">视频正在赶来的路上：{time}秒</View>
            ) : null
          }
          <View className="qiandao" onClick={()=>reward("sign")}>签到领取{siteConfig.config.signPoint}体力</View>
          <Button className="wyaoqing w_button" openType="share"> {siteConfig.config.inviteButtonText}</Button>
          <View className="wuser">
            <View className="wusertitle">{siteConfig.config.inviteText}</View>
            <View className="w365-list">
              {
                wuser.length>0?(
                    <>
                      {
                        wuser.map((item,index)=>(
                            <View className="wlistitem" key={index}>
                              <Image className="wavatar" src={item.headimgurl} />
                            </View>
                        ))
                      }
                    </>
                ): null
              }
              {
                wList.map((item,index)=>(
                    <View className="wlistitem" key={index}>
                      <Image className="img" src="/images/icon/invite/fans.png" />
                    </View>
                ))
              }
              <View className="wlistitem">
                <Image className="img" src="/images/icon/invite/more.png" />
              </View>
            </View>
          </View>
        </View>
      </View>
      {
        siteConfig.ads?.jinbi ? (
            <View className="wad">
              <CustomAd adIds={siteConfig.ads?.jinbi} />
            </View>
        ) : null
      }


    </>
  );
};

export default JinBi;
