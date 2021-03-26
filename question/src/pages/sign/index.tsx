import * as React from 'react';
import {Ad, Image, Text, View} from 'remax/wechat';
import classNames from 'classnames';
import './index.css';

const user = {
    sign_total_str: (12+'').split(""),
    sign_total:9,
}
const sysinfo = {
    sys_sign_card:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    sys_ad_videob_id:'1234',
}

export default () => {
  return (
    <>
        <View className="maina">
            <View className="maina_bg">
                <Image mode="widthFix" src="/images/bg_sign.png" />
            </View>
            <View className="box1">已坚持
                {
                    user.sign_total_str.map((item,index)=><Text key={index}>{item}</Text>)
                }
                天签到
            </View>
            <View className="box2">
                <Image src="/images/icon_jinbi.png" />
                签到7天，即可开启神秘大礼
            </View>
        </View>
        <View className="mainb">
            <View className="cont clearfix">
                {
                    sysinfo.sys_sign_card.map((item,index)=>(
                        <View className={classNames(
                            'box',
                            user.sign_total>=index+1?'active':''
                        )} key={index}>
                            <View>第{index+1}天</View>
                            <Image src="/images/ancard.png" />
                            <View>答题卡+{item}</View>
                        </View>
                    ))
                }
                <View className={classNames(
                    'box',
                    'box2',
                    user.sign_total>=7?'active':''
                )}>
                    <View className="text">
                        <View>第7天</View>
                        <View>神秘大礼</View>
                    </View>
                    <Image src="/images/icon_lipin.png" />
                </View>
            </View>
            <View className="btn">立即签到</View>
        </View>
        {
            sysinfo.sys_ad_videob_id? (
                <View style={{margin:20}}>
                    <Ad unitId="adunit-921e9b557628182f" />
                </View>
            ) : null
        }

    </>
  );
};
