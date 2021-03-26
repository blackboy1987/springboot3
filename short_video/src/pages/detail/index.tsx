import * as React from 'react';
import {View, Button, ScrollView, Image, Ad, Text, navigateTo,switchTab,getCurrentPages} from 'remax/wechat';
// @ts-ignore
import MyVideo from '@/components/MyVideo';
// @ts-ignore
import classNames from 'classnames';
import {usePageEvent} from 'remax/macro';

import './index.css';
import {post} from "@/util/wxUtils";
import {useState} from "react";

const showMoreDetails= false;
const channelImgUrl = "http://static01.baomihua.com/img/userchannel/defaultx.jpg";
const channelName = "热播综艺咖";
const percent = (250/300)*100*18/5;
export default () => {
    const [data,setData] = useState<{[key:string]: any}>({});
    const [list,setList] = useState<{[key:string]: any}[]>([]);
    usePageEvent('onLoad',(e)=>{
        post('short_video/detail',e,data=>{
            setData(data);
            post('short_video/getrecommend',e,data=>{
                setList(data.retStr);
            })
        })
    })

    usePageEvent('onUnload',()=>{
        switchTab({
            url:'/pages/index/index'
        }).then();
    })

  return (
    <View id="page-wrap">
        <MyVideo
            poster={(data.video_img||'').replace('x','640_360')}
            src={'https://'+data.alipalyurl}
            controls
        />
        <ScrollView className="scroll_wrap" scrollIntoView="toView_3" scrollWithAnimation scrollY style={{top:460}}>
            <View className="video_infos_wrap">
                <View className="video_title">{data?.title}</View>
                <View className="video_user">
                    <View className="video_user_info" data-channelid={data?.appId}>
                        <Image mode="aspectFit" src={data?.channelImgUrl} />
                        <text>{data?.channelName}</text>
                    </View>
                    <Button className="share_btn" openType="share">分享
                        <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQUJCRjM5MTMzNDQxMUU5OENCNUQ2QkI1MkI3NzYxOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQUJCRjM5MjMzNDQxMUU5OENCNUQ2QkI1MkI3NzYxOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBBQkJGMzhGMzM0NDExRTk4Q0I1RDZCQjUyQjc3NjE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBBQkJGMzkwMzM0NDExRTk4Q0I1RDZCQjUyQjc3NjE5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TRM28gAAAc5JREFUeNq8lrtLA0EQxu8uMUQbBdEgiI9UamFhEcVXxFZiYWclKgSttBBSChb+BYKFj0qsxcbmFEHBFKJYiJBKI8RCLUR8xEPWb3GVY9j1HgsO/AiZ2dvvbmZ3dg1DYoyxCjAIVsEV+7ZncALmQRIY2oZJTDANPpm3nYMWHbE4yLPglg38tXgg6kpdGMsGEeOsMH1L+hVMKOozC54Uk+fALvHZvlKLQQuSCatFrEcSm3MtMIfEarz0LDAh8SfE23ZKYu0iVgWiJNbhJcjfUpWHG9CsiN2BWlAAy6AIIuBDxB7Ai2ma0pQ6IRZICaTBFLhXjCmCURChgnZAsR3QBx59jr8GjW7B8QBiZ2A45LZp/alhJX5ffW7bLpAHsRDNjNe2yUJh3xQrldoxGCJi3aBXMnYd1IN9l68BZNzdZs0jJWOSRmCJtkhtRMybI/4jelIs/iGYlvguwKXE74jFRa1s0r4KK4nPp8bTeah5Ar7TThEXYrdgBjggBfiyLos69msIbtE9mQIZnl5F3x3QPFHaDElKvY4yO6TYZqhrCR6KgdOAYnt8RetcRyzFsSazJVWJwt6DeM23QcHVOzfAgfg/afyHiXrXib396/8SYAAWBfRkEUPiqgAAAABJRU5ErkJggg==" />
                    </Button>
                </View>
            </View>
            <view id="recommend">
                <View>
                    <View className="flow-link">
                        <Ad unitId="adunit-d6fb6396a875309c" />
                    </View>
                    {
                        list.map((video,index)=>(
                            <View className="flow-link" key={index}>
                                {
                                    (index+1)%9==0 ? (
                                        <View>
                                            <Ad unitId="adunit-606e0961f30e013c" />
                                        </View>
                                    ) : (
                                        <View className="flow-linka" onClick={()=>{
                                            navigateTo({
                                                url:'/pages/detail/index?id='+video.videoid
                                            }).then();
                                        }}>
                                            <View id="pic">
                                                <Image id="img" mode="widthFix" src={video.videoimgurl} />
                                                <Text className="video-time">{video.time}</Text>
                                            </View>
                                            <View className="info">
                                                <Text className="info-title">{video.videoname}</Text>
                                                <Text className="info-count">{video.channelName|| ''}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        ))
                    }
                </View>
            </view>
        </ScrollView>
        <View className="play-fixed-btn">
            <Image src="/images/index-fixed-icon.png" />
        </View>
        <View className="wrap">
            <View className="circle">
                <View className="percent left" style={{transform:`rotate(${percent}deg)`}} />
                <View className="percent right wth0" />
            </View>
            <View className="num">50</View>
        </View>
    </View>
  );
};
