import * as React from 'react';
import {
    View,
    Text,
    Image,
    showToast,
    Swiper,
    SwiperItem,
    getSystemInfoSync,
    ScrollView,
    request,
    Button,
    getStorageSync
} from 'remax/wechat';
import './index.css';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {usePageEvent} from 'remax/macro';
import {Popup} from "annar";
import {Constants, xingZuo} from "@/util/constants";
import MyAd from "@/component/MyAd";
import {myCreateInterstitialAd, myCreateRewardedVideoAd} from "@/util/adUtils";

const tab=[ "今日", "明日", "本周", "本月", "今年", "爱情" ];

type Data = {
    desc: string;
    vdate: string;
    url: string;
    index:{
        t: string;
        s: number;
        v: string;
    }[];
    content:{
        t: string;
        "v": string;
    }[];

}

const systemInfo:{
    windowHeight: number;
} = getSystemInfoSync();
console.log(systemInfo);

export default () => {

    const [rewardedVideoAd,setRewardedVideoAd] = useState<any>();
    const [interstitialAd,setInterstitialAd] = useState<WechatMiniprogram.InterstitialAd>();
    const [currentTab,setCurrentTab] = useState<number>(0);
    const [infoData,setInfoData] = useState<Data[]>([]);
    const [id,setId] = useState<number>(1);
    const [name,setName] = useState<string>('金牛座');
    const [open,setOpen] = useState<boolean>(false);
    const [ads,setAds] = useState<{
        bannerId?: string;
        gridAdId?: string;
        interstitialAdId?: string;
        nativeAdId?: string;
        rewardedVideoAdId?: string;
        videoAdId?: string;
        videoFrontAdId?: string;
    }>({});

    const switchNav=(index: number)=>{
        setCurrentTab(index)
    }

    const load=(id: number)=>{
        setAds(getStorageSync("appConfig").indexAd || {});
        request({
            url:Constants.baseUrl+"com/json/fortune",
            header:{
                appCode: Constants.appCode,
                appToken: Constants.appToken,
            },
            data:{
                id:id+1,
            }
        }).then(response=>{
            setInfoData(response.data.data);
            setId(id);
            setName(xingZuo[id].name);
            setOpen(false);
        });
    }

    usePageEvent("onLoad",(e)=>{
       load(parseInt(e.id));
        const ad = getStorageSync("appConfig").indexAd || {};
        if (rewardedVideoAd == null && ad.rewardedVideoAdId) {
            setRewardedVideoAd(myCreateRewardedVideoAd(ad.rewardedVideoAdId));
        }
        if (interstitialAd == null && ad.interstitialAdId) {
            const myInterstitialAd = myCreateInterstitialAd(ad.interstitialAdId);
            setInterstitialAd(myInterstitialAd);
            myInterstitialAd.show();
        }

    });

    const share = () =>{

    }

    const switchXingZuo=()=>{
        if(rewardedVideoAd){
            rewardedVideoAd.offClose();
            rewardedVideoAd.show()
                .catch(() => {
                    rewardedVideoAd.load()
                        .then(() => rewardedVideoAd.show())
                        .catch(() => {
                            setOpen(true)
                        })
                })
            rewardedVideoAd.onClose((res:{isEnded: boolean})=>{
                console.log(res);
                if(res.isEnded){
                    setOpen(true)
                }else{
                    showToast({
                        icon:'none',
                        title:'请先看完广告'
                    }).then();
                }
            })
        }else{
            setOpen(true)
        }
    }

    const changeXingZuo = (index: number)=>{
        load(index);
    }

    usePageEvent("onShareAppMessage",()=>{
       return {
           title:'赶紧来看看你的运势吧'
       }
    });

    return (
      <>

          {
              (infoData||[]).length>0 ? (
                  <Swiper style={{height:`${systemInfo.windowHeight-60}PX`}} current={currentTab} circular onChange={(e)=>switchNav(e.detail.current)}>
                      {
                          infoData.map((item,index)=>(
                              <SwiperItem key={index}>
                                  <ScrollView className='bg1' style={{height:`${systemInfo.windowHeight-60}PX`}} scrollY>
                                      <View className='bg_t' />
                                      <View className="inner">
                                          <View className="title">
                                              <View className="ico_change" onClick={()=>switchXingZuo()} />
                                              <View onClick={()=>switchXingZuo()} >切换星座</View>
                                          </View>
                                          <View className="box">
                                              <View className="box_t clear">
                                                  <View className="dt">
                                                      <Image className="dt_img" mode="widthFix" src={`/image/item/${id+1}.png`} />
                                                      <text className="dt_title">{name}</text>
                                                  </View>
                                                  <View className="dd">
                                                      <Text className="dd_title">{tab[currentTab]}运势({item.vdate})</Text>
                                                      <View className="star1">
                                                          <View className="star_on" style={{width:'60%'}} />
                                                      </View>
                                                      <Text className="dd_text">{item.desc}</Text>
                                                  </View>
                                              </View>
                                              <View className="ul">
                                                  {
                                                      ( item.index||[]).filter((_,index)=>index>0).map((item,index)=>(
                                                          <View className="li" key={index}>
                                                              <Text className="li_title">{item.t}</Text>
                                                              {
                                                                  item.s ? (
                                                                      <View className="star2">
                                                                          <View className="star_on" style={{width:`${item.s*20}%`}} />
                                                                      </View>
                                                                  ) : null
                                                              }
                                                              {
                                                                  item.v ? (
                                                                      <Text className="li_text">{item.v}</Text>
                                                                  ) : null
                                                              }

                                                          </View>
                                                      ))
                                                  }
                                              </View>
                                              <View className="content">
                                                  <MyAd ads={ads} />
                                              </View>
                                              <View className="content">
                                                  {
                                                      (item.content||[]).map((item,index)=>(
                                                          <View key={index}>
                                                              <Text className="c_title">{item.t}</Text>
                                                              <Text className="c_info">{item.v}</Text>
                                                          </View>
                                                      ))
                                                  }
                                              </View>
                                              <Button className="sharebtn" openType='share'>
                                                  <view className="ys">炫耀结果</view>
                                              </Button>
                                          </View>
                                      </View>
                                  </ScrollView>
                              </SwiperItem>
                          ))
                      }
                  </Swiper>
              ) : null
          }
          <View className="tab_date">
              <Image className="tab_date__img" mode="widthFix" src="/image/bottom.png" />
              {
                  tab.map((item,index)=>(<View key={index} onClick={()=>switchNav(index)} className={classNames('tabli', currentTab==index?'tabli_on':'')}>{item}</View>))
              }
          </View>


          <Popup open={open} position="bottom" style={{background: 'rgba(0,0,0,0)'}} onClose={()=>setOpen(false)}>
              <View className='float_box slideup'>
                  <View className="f_title">
                      <Image className="f_titleimg" src="https://api.xzw.com/static/image/xcx/s_xz.png" />
                  </View>
                  <View className="f_main">
                      <View className="f_ul clear">
                          {
                              xingZuo.map((item,index)=>(
                                  <View className="f_li" key={index} onClick={()=>changeXingZuo(index)}>
                                      <View className="f_libg">
                                          <Image className="f_liimg" mode="widthFix" src={`/image/item/${index+1}.png`} />
                                      </View>
                                      <View className="f_litxt">{item.name}</View>
                                  </View>
                              ))
                          }
                      </View>
                  </View>
              </View>
          </Popup>
      </>
  );
};
