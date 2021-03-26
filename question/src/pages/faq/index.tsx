import * as React from 'react';
import {Ad, Image, View,setNavigationBarTitle} from 'remax/wechat';
import './index.css';
import {useState} from "react";
import {usePageEvent} from "remax/macro";

const maskData = [
  {
    "id":"1",
    "title":"1、这个小程序怎么玩？",
    "litpic":"",
    "content":"根据题目，选择正确答案，即可得到奖励~",
    "sortrank":"1",
    "create_time":"1609480641",
    "uniacid":"8"
  },
  {
    "id":"2",
    "title":"2、为什么提示答题卡不足？",
    "litpic":null,
    "content":"每次答题需要消耗答题卡1张，答题卡可进入领取答题卡页面，完成相应的任务，即可得到~",
    "sortrank":"2",
    "create_time":"1609479029",
    "uniacid":"8"
  },
  {
    "id":"3",
    "title":"3、答对题目的奖励是什么？",
    "litpic":"",
    "content":"随机奖励红包，可提现~",
    "sortrank":"3",
    "create_time":"1609480772",
    "uniacid":"8"
  },
  {
    "id":"4",
    "title":"4、提现后，什么时候到账？",
    "litpic":"",
    "content":"发起提现后24小时内到账，若未到账请联系客服~",
    "sortrank":"4",
    "create_time":"1609480610",
    "uniacid":"8"
  },
  {
    "id":"5",
    "title":"5、这个小程序收费吗？",
    "litpic":null,
    "content":"不收费，这是一款免费的小程序，供您休闲娱乐，益智消遣~",
    "sortrank":"5",
    "create_time":"1609479029",
    "uniacid":"8"
  },
  {
    "id":"6",
    "title":"6、客服怎么联系？",
    "litpic":"",
    "content":"请加客服微信【usopking】，或通过提现页面，进入客服会话~",
    "sortrank":"6",
    "create_time":"1609480751",
    "uniacid":"8"
  }
];
const sysinfo = {
  sys_ad_videob_id:'1234',
};

export default () => {
  const [showIndex,setShowIndex] = useState<number>(0);
  usePageEvent('onLoad',()=>{
    setNavigationBarTitle({
      title:'规则说明'
    }).then();
  })
  return (
    <>
      <View className="help">
        {
          maskData.map((item,index)=>(
              <View className="help_item" key={item.id} >
                <View className="title" onClick={()=>setShowIndex(index+1)}>
                  <View className="title_1">{item.title}</View>
                  <View className="title_2">
                    <Image src={`/images/${showIndex==index+1?'icon_down':'icon_right'}.png`} />
                  </View>
                </View>
                {
                  showIndex===index+1 ? (
                      <View className="detail">
                        {item.content}
                        {
                          item.litpic ? (
                              <Image mode="widthFix" src="{{item.litpic}}"/>
                          ) : null
                        }
                      </View>
                  ) : null
                }
              </View>
          ))
        }
      </View>
      {
        sysinfo.sys_ad_videob_id ? (
            <View style={{margin:20}}>
              <Ad adTheme="white" adType="video" unitId="{{sysinfo.sys_ad_videob_id}}" />
            </View>
        ) : null
      }
    </>
  );
};
