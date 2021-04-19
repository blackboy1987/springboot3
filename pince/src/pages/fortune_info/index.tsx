import * as React from 'react';
import {
    View,
    Image,
    Button,
    request,
    ScrollView,
    Text,
    createRewardedVideoAd,
    getStorageSync,
    createInterstitialAd
} from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
import classNames from 'classnames';
import './index.css';
import {useState} from "react";
import {Loading, Popup} from "annar";
import {Constants, data} from "@/util/constant";

type InfoData = {
    desc: string;
    index: { t: string,s?: number,v?: number }[];
    content: { t: string,v: string }[];
    vdate: string;
    url?: string;
}

const tabs = [ "今日", "明日", "本周", "本月", "今年", "爱情" ];

export default () => {

    const [systeInfo,setSystemInfo] = useState({
        swidth: wx.getSystemInfoSync().windowWidth,
        hei: wx.getSystemInfoSync().windowHeight,
    });

    const [infoData,setInfoData] = useState<InfoData[]>([]);
    const [id,setId] = useState<number>(1);
    const [name,setName] = useState<string>("金牛座");
    const [changexzModal,setChangexzModal] = useState<boolean>(false);
    const [rewardedVideoAd,setRewardedVideoAd] = useState(null);
    const load = (xzId: number) =>{
        request({
            url:Constants.baseUrl+"fortune/?id="+xzId+"&ld=-1&vc=xcx&token=Mh8tGmSoW3fyH642Y+Eb3E",
            method:'GET',
            header:{
                'appCode':Constants.appCode,
                'appToken':Constants.appToken,
            }
        }).then(response=>{
            setInfoData(response.data.data);
        });
    }

    const rewardedVideoAdCreate = () =>{
        const detailAd = getStorageSync("appConfig").detailAd;
        if(detailAd.rewardedVideoAdId&&!rewardedVideoAd){
            const rewardedVideoAd1 = createRewardedVideoAd({ adUnitId: 'xxxx' })
            rewardedVideoAd1.onLoad(() => {
                console.log('onLoad event emit')
            })
            rewardedVideoAd1.onError((err) => {
                console.log('onError event emit', err)
            })
            rewardedVideoAd1.onClose((res) => {
                console.log('onClose event emit', res)
            })
            setRewardedVideoAd(rewardedVideoAd1);
        }

    }

    usePageEvent("onLoad",(e)=>{
        setId(e.id);
        setName(data[e.id-1].name);
        load(e.id);
        if(!rewardedVideoAd){
            rewardedVideoAdCreate();
        }

        const interstitialAd = createInterstitialAd({
            adUnitId:getStorageSync("appConfig").detailAd.interstitialAdId
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

    usePageEvent("onShareAppMessage",()=>{

    })

    const [currentTab,setCurrentTab] = useState<number>(0);

    const switchNav = (index: number) =>{
        setCurrentTab(index);
    }

    const changexz=(index: number,name: string)=>{
        console.log(rewardedVideoAd,"rewardedVideoAd");
        rewardedVideoAd && rewardedVideoAd.show()
            .catch(() => {
                rewardedVideoAd.load()
                    .then(() => rewardedVideoAd.show())
                    .catch(err => {
                        console.log('激励视频 广告显示失败')
                    })
            })
        setId(index);
        setName(name);
        load(index);
        setChangexzModal(false);
    }

  return (
      <>
          {
              infoData.length>0? (
                  <>
                      {
                          infoData.map((currentInfoData,index)=>(
                              <View className="swiper-box" style={{height:(systeInfo.hei-31)*2,display:currentTab===index?'':'none'}} key={index}>
                                  {
                                      currentTab===index?(
                                          <ScrollView className="bg1" scrollY style={{height:(systeInfo.hei)*2}}>
                                                  <View className="bg_t" />
                                                  <View className="inner">
                                                      <View className="title">
                                                          <View className="ico_change" onClick={()=>setChangexzModal(true)} />
                                                          <View onClick={()=>setChangexzModal(true)} >切换星座</View>
                                                          <Popup position='bottom' open={changexzModal} style={{background:'rgba(0,0,0,0)'}} onClose={() => {
                                                              setChangexzModal(false);
                                                          }}>
                                                              <View className="float_box">
                                                                  <View className="f_title">
                                                                      <Image className="f_titleimg" src="https://api.xzw.com/static/image/xcx/s_xz.png" />
                                                                  </View>
                                                                  <View className="f_main">
                                                                      <View className="f_ul clear">
                                                                          {
                                                                              data.map((item,index)=>(
                                                                                  <View className="f_li" key={index} onClick={()=>changexz(index+1,item.name)}>
                                                                                      <View className="f_libg">
                                                                                          <Image className="f_liimg" mode="widthFix" src={`https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/pince/item/${index+1}.png`} />
                                                                                      </View>
                                                                                      <View className="f_litxt">{item.name}</View>
                                                                                  </View>
                                                                              ))
                                                                          }
                                                                      </View>
                                                                  </View>
                                                              </View>
                                                          </Popup>
                                                      </View>
                                                      <View className="box">
                                                          <View className="box_t clear">
                                                              <View className="dt">
                                                                  <Image className="dt_img" mode="widthFix" src={`https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/pince/item/${id}.png`} />
                                                                  <Text className="dt_title">{name}</Text>
                                                              </View>
                                                              <View className="dd">
                                                                  <Text className="dd_title">{tabs[currentTab]}运势({currentInfoData.vdate})</Text>
                                                                  <View className="star1">
                                                                      <View className="star_on" style={{width:`${(currentInfoData.index[0].s||0)*20}%`}} />
                                                                  </View>
                                                                  <Text className="dd_text">{currentInfoData.desc}</Text>
                                                              </View>
                                                          </View>
                                                          <View className="ul">
                                                              {
                                                                  currentInfoData.index.filter((item,index)=>index>0).map((item,index)=>(
                                                                      <View className="li" key={index}>
                                                                          <Text className="li_title">{item.t}</Text>
                                                                          {
                                                                              item.s ? (
                                                                                  <View className="star2">
                                                                                      <View className="star_on" style={{width:`${(item.s)*20}%`}} />
                                                                                  </View>
                                                                              ) : null
                                                                          }
                                                                          {
                                                                              item.v ? (<Text className="li_text" >{item.v}</Text>) : null
                                                                          }
                                                                      </View>
                                                                  ))
                                                              }
                                                          </View>
                                                          <View className="content">
                                                              {
                                                                  currentInfoData.content.map((item,index)=>(
                                                                      <View key={index}>
                                                                          <Text className="c_title">{item.t}</Text>
                                                                          <Text className="c_info">{item.v}</Text>
                                                                      </View>
                                                                  ))
                                                              }
                                                          </View>
                                                          <Button className="sharebtn" openType='share' >
                                                              <View className="ys">炫耀结果</View>
                                                          </Button>
                                                      </View>
                                                  </View>
                                              </ScrollView>
                                      ): null
                                  }
                              </View>
                          ))
                      }
                  </>
              ) : (
                  <Loading color="#1890FF" />
              )
          }
          <View className="tab_date">
              <Image className="tab_date__img" mode="widthFix" src="https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/pince/bottom.png" />
              {tabs.map((item,index)=>(
                  <View onClick={()=>switchNav(index)} className={classNames(
                      'tabli',
                      currentTab===index ? "tabli_on":""
                  )} key={index}>{item}</View>
              ))}
          </View>
      </>
  );
};
