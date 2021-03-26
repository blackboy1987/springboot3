import * as React from 'react';
import {View, Swiper, SwiperItem, Image, Text, Button, OpenData, navigateTo, Ad,ScrollView,showToast} from 'remax/wechat';
// @ts-ignore
import classNames from "classnames";
import {usePageEvent} from 'remax/macro';
import './index.css';
import OtherModal, {AnswerStatus} from "@/components/OtherModal";
import RedPackageModal from "@/components/RedPackageModal";

// @ts-ignore
import NativeAd from '@/components/NativeAd';
import {getStorage, getUserInfo, post, setMyInterval, setStorage, themeMode, userLogin} from "@/util/wxUtils";
import {useRef, useState} from "react";
import {AdjustType, Answer, Question, UserInfo} from "@/util/data";
import {defaultUserInfo} from "@/util/constants";
import user from "../../../../min_program_cpanel/mock/user";

const sysinfo = {
  sys_is_xcxlist:2,
  sys_is_cashout:2,
  sys_ad_videob_id:'1234',
  sys_rightlist:true,
  sys_is_ranklist:true,
  sys_ad_banner_id:'124',
}
const xcxlist:any[] = [{
  singleList:[
    {
      appid:'appid',
      path:'path',
      litpic:'litpic',
      title:'title',
    }
  ]
}];
const notice = {
  text:'版本已升级，包含全新题库，有任何问题请联系客服',
  marqueeDistance:0,
}

const index_total = {
  money:12345,
  redbag:38545,

};

const showAd = 'c3';

const rankList = [
  {
    "id":"338",
    "title":"葡萄籽",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019032009105747041.jpg",
    "rightnum":"1024",
    "money":"100",
    "uniacid":"8"
  },
  {
    "id":"295",
    "title":"张学友",
    "litpic":"https://pic.qqtn.com/up/2019-4/2019040208030018512.jpg",
    "rightnum":"978",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"153",
    "title":"啪啪1314520",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019032009105628370.jpg",
    "rightnum":"542",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"185",
    "title":"奋斗一生",
    "litpic":"https://ntx.qqtn.com/up/2019-07-08/5d22fec02b4ac8.84132687.jpg",
    "rightnum":"859",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"100",
    "title":"安晓逸丶",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019031417572618630.jpg",
    "rightnum":"415",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"167",
    "title":"阿帅",
    "litpic":"https://ntx.qqtn.com/up/2019-07-08/5d2300ad1ae2b7.23981690.jpg",
    "rightnum":"556",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"305",
    "title":"不良人",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019031108004880099.jpg",
    "rightnum":"988",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"220",
    "title":"快快快快",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019031808022275204.jpg",
    "rightnum":"895",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"301",
    "title":"PLA壮爷",
    "litpic":"https://ntx.qqtn.com/up/2019-07-08/5d23005d088118.25882801.jpg",
    "rightnum":"984",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"70",
    "title":"太太奶奶",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019032208012814149.jpg",
    "rightnum":"364",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"76",
    "title":"小粉狐",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019032609102228272.jpg",
    "rightnum":"368",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"145",
    "title":"情场",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019032108000416945.jpg",
    "rightnum":"534",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"205",
    "title":"李萌萌",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019031808110668186.jpg",
    "rightnum":"879",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"13",
    "title":"J0Ker",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019031908191769268.jpg",
    "rightnum":"311",
    "money":"20",
    "uniacid":"8"
  },
  {
    "id":"193",
    "title":"杨辰逸",
    "litpic":"https://pic.qqtn.com/up/2019-3/2019032908334770310.jpg",
    "rightnum":"866",
    "money":"20",
    "uniacid":"8"
  }
];

const sys_rightlist=[10,30,60,100,180,300];

let timer:NodeJS.Timeout;

const defaultQuestionTime = 15;

export default () => {


  // 题目信息
  const [question,setQuestion] = useState<Question>({title:'',answers:[]});
  // 选项按钮是否点击，防止过快点击
  const [buttonClicked,setButtonClicked] = useState<boolean>(false);

  const [answerStatus,setAnswerStatus] = useState<AnswerStatus>('');

  const [otherModalVisible,setOtherModalVisible] = useState<boolean>(false);

  const [userInfo,setUserInfo] = useState<UserInfo>(defaultUserInfo);

  const [questionTime,setQuestionTime] = useState<number>(defaultQuestionTime);

  const [redPackageMoney,setRedPackageMoney] = useState<number>(0);

  const get=()=>{
    clearInterval(timer);
    post('question/get',{},data=>{
      setQuestion(data);
      setQuestionTime(defaultQuestionTime)
      countDown();
    });
  }

  const countDown=()=>{
    timer = setInterval(() => {
      setQuestionTime(v => {
        if(v<=0){
          clearInterval(timer);
          get();
          return defaultQuestionTime;
        }
        return v - 1;
      });
    }, 1000);
  }

  usePageEvent('onLoad',(e)=>{
    userLogin(e.detail,data=>{
      setStorage('totalRight',data.userInfo.totalRight || 0);
      setUserInfo(data.userInfo);
    });
  })

  usePageEvent('onHide',(e)=>{
    clearInterval(timer);
  })

  usePageEvent('onShow',(e)=>{
    get();
  })

  /**
   * 答案的选择
   */
  const choose = (answer:Answer) =>{
    // 判断答题卡够不够
    if(userInfo.point<100){
      setOtherModalVisible(true);
      setAnswerStatus('empty');
      return ;
    }

    if(buttonClicked){
      showToast({
        title:'请勿点击过快',
        icon:'none',
      }).then();
      return ;
    }
    setButtonClicked(true);
    setOtherModalVisible(true);
    // 默认是失败
    let type:AdjustType='error';
    if(answer.isRight){
      setStorage('continuousRightCount',parseInt(getStorage('continuousRightCount'))+1);
      setAnswerStatus('right');
      setStorage('totalRight',parseInt(getStorage('totalRight'))+1);
      setUserInfo({
        ...userInfo,
        totalRight:getStorage('totalRight'),
        point:userInfo.point-100,
      });
      type='right';
    }else{
      setStorage('continuousRightCount',0);
      type='error';
      setAnswerStatus('error');
      setUserInfo({
        ...userInfo,
        point:userInfo.point-100,
      });
    }
    // 不管答成功还是答失败，都需要请求接口来扣除答题卡
    post('question/adjust',{
      type ,
    },data=>{
      console.log(data);
    })

    setButtonClicked(false);
  }

  return (
    <>
      {
        sysinfo.sys_is_xcxlist ? (
            <Swiper autoplay circular className="index_swiper">
              {
                xcxlist.map((item,index)=>(
                    <SwiperItem key={index}>
                      <view className="more_app">
                        {
                          item.singleList.map((item1:any)=>(
                              <view className="box" key={item1.title}>
                                <Image src={item1.litpic} />
                                <view className="p">{item1.title}</view>
                              </view>
                          ))
                        }
                      </view>
                    </SwiperItem>
                ))
              }
            </Swiper>
        ): null
      }
      {
        notice.text ? (
            <View className="index_notice clearfix">
              <Image src="/images/icon_notice.png" />
              <View className="marquee_box">
                <Text className="marquee_text" style={{transform: `translateX(-${notice.marqueeDistance}px)`}}>{notice.text}</Text>
              </View>
              <View onClick={()=>navigateTo({url:'/pages/faq/index'}).then()} className="btn">规则说明</View>
            </View>
        ) : null
      }

      <View className="index-header clearfix">
        <View className="user-msg">
          <View className="avatar">
            <OpenData type="userAvatarUrl" />
          </View>
          <View className="name">
            <OpenData type="userNickName"/>
          </View>

        </View>
        <View className="account clearfix">
          <Image src="/images/icon_hongbao.png" />
          <Text className="amount">{userInfo.balance}</Text>
          {sysinfo.sys_is_cashout == 1 ? '元' : '个'}
          {
            sysinfo.sys_is_cashout?(
                <View className="cashbox">
                  {
                    userInfo.isAuth ? (
                        <Button className="cashbtn">提现</Button>
                    ) : (
                        <Button className="cashbtn" openType="getUserInfo">提现</Button>
                    )
                  }
                </View>
            ):null
          }
        </View>
      </View>
      <View className="index-content">
        <View className="left side-bar" />
        <View className="right side-bar" />
        <View className="answer-card">
          <View className="index_bg">
            <Image mode="widthFix" src="/images/rp_card_bg.png" />
          </View>
          <text className="card-desc">参与答题
            答对领{sysinfo.sys_is_cashout == 1 ? '红包' : '金币'}</text>
          <View className="jackpot">
            <View className="account">
              <Text className="number">{index_total.money}</Text>
              {sysinfo.sys_is_cashout == 1 ? '元' : '个'}
            </View>
            <view className="count">剩余{index_total.redbag}个红包</view>
          </View>
          <View className="timer">{questionTime}</View>
          <View className="problem">
            <View className="tit">{question.title}</View>
            <View className="list">
              {
                question.answers.map((item,index)=>(
                    <Button className="item" key={index} onClick={()=>choose(item)}>{item.answer}</Button>
                ))
              }
            </View>
          </View>
          <View className="foot">
            <View className="text">
              <Image className="icon_card" src="/images/ancard.png" />
              答题卡：{userInfo.point/100} 张
            </View>
            <View className="text2">
              <view className="btn" onClick={()=>navigateTo({url:'/pages/receive/index'}).then()}>领取答题卡</view>
            </View>
          </View>
        </View>
      </View>

      <View style={{margin:'10 30 0 30'}}>
        {
          showAd==='c3' ? (
              <NativeAd unitId="adunit-921e9b557628182f" />
          ) : null
        }
        {
          showAd==='b' ? (
              <Ad unitId="adunit-6aa72d94fb93b0a1"  />
          ) : null
        }
        {
          sysinfo.sys_ad_videob_id&&showAd=='v' ? (
              <Ad adTheme="white" adType="video" unitId={sysinfo.sys_ad_videob_id} />
          ) : null
        }
      </View>
      {
        sysinfo.sys_rightlist ? (
            <View className="index-redpacket">
              <View className="rp-header">累计答对题目：{userInfo.totalRight||0}题</View>
              <ScrollView scrollX className="rp-content" style={{width:'100%'}}>
                <View className="list">
                  {
                    sys_rightlist.map((item,index)=>(
                        <View className="rp-item" key={index}>
                          <View className="s-rp-con">
                            <View className={classNames(
                                'status',
                                (userInfo.totalRight||0)>=item?'active':''
                            )}>领</View>
                            <View className="desc">累计答对</View>
                            <View className="desc">{item}题可开</View>
                          </View>
                          <Button className={classNames(
                              'btn',
                              (userInfo.totalRight||0)>=item?'active':''
                          )}>{(userInfo.totalRight||0) >= item ? '拆红包' : '再答' + (item - (userInfo.totalRight||0)) + '题'}</Button>
                        </View>
                    ))
                  }
                </View>
              </ScrollView>
            </View>
        ) : null
      }
      {
        sysinfo.sys_is_ranklist ? (
            <View className="index-rank">
              <View className="rank-header" />
              <View className="list">
                {
                  rankList.map((item,index)=>(
                      <View className="item bt1" key={item.id}>
                        <View className="left">
                          {
                            index+1>0&&index+1<=3 ? (
                                <View className={classNames(
                                    'dt-icons',
                                    `icon-${index+1}`
                                )}/>
                            ) : (<>{index+1}</>)
                          }
                        </View>
                        <Image className="avatar" src={item.litpic} />
                        <View className="user">
                          <View className="nickName">{item.title}</View>
                          <View className="desc">累计答对{item.rightnum}题</View>
                        </View>
                        <View className="right">
                          <View className="amount">{item.money}{sysinfo.sys_is_cashout == 1 ? '元' : '个'}</View>
                        </View>
                      </View>
                  ))
                }
              </View>
            </View>
        ) : null
      }
      {
        sysinfo.sys_ad_banner_id ? (
            <View style={{margin: '20 20 30 20'}}>
              <Ad unitId={sysinfo.sys_ad_banner_id} />
            </View>
        ) : null
      }


      <OtherModal visible={otherModalVisible} status={answerStatus} onClose={(status)=>{
        setOtherModalVisible(false);
        setAnswerStatus('');
        get();
      }} />
      <RedPackageModal visible={false} />
    </>
  );
};
