import * as React from 'react';
import { View, Text, Image,ScrollView,navigateTo } from 'remax/wechat';
// @ts-ignore
import classNames from 'classnames';
import {usePageEvent} from 'remax/macro';
import './index.css';
import {useState} from "react";
import BlankPage from "@/components/BlankPage";
import {post} from "@/util/wxUtils";

export type TabItem = {
    id: string;
    name: string;
}

export default () => {
    const [activeTab,setActiveTab] = useState<string>('0');
    const [data,setData] = useState<any[]>([]);
    const [tabs,setTabs] = useState<TabItem[]>([]);
    const [page,setPage] = useState<number>(1);

    const list =(id: string,page:number)=>{
        post("short_video/list",{
            categoryId:id,
            page:page||1,
        },res=>{
            if(page===1){
                setData(res.retStr);
            }else{
                setData([
                    ...data,
                    ...res.retStr,
                ]);
            }

            setPage(page||1);
        })
    }

    const category = () =>{
        post("short_video/category",{},data=>{
            setTabs(data.data);
        })
    }

    usePageEvent('onLoad',()=>{
        category();
        list(activeTab,1);
    });

    /**
     * 分享
     */
    usePageEvent("onShareAppMessage",()=>{

    });

    usePageEvent('onReachBottom',()=>{
        list(activeTab,page+1);
    })

    usePageEvent('onPullDownRefresh',()=>{
        list(activeTab,1);
    })

  return (
    <View>
        <View className='tabs'>
            <View className='tabs-bar'>
                <ScrollView scrollX scrollIntoView={`item_${parseInt(activeTab)-2}`} scrollWithAnimation>
                    <View className='tabs-bar-content'>
                        {
                            tabs.map(item=>(
                                <View onClick={()=>{
                                    setActiveTab(item.id);
                                    list(item.id,1);
                                }} key={item.id} id={`item_${item.id}`} className={classNames('tabs-bar-content-item',activeTab==item.id?'active':'')}><View>{item.name}</View></View>
                            ))
                        }

                    </View>
                </ScrollView>
            </View>
            <View className='content'>
                {
                    data.length<=0 ? (<BlankPage />) : (
                        <>
                            {
                                data.map(video=>(
                                    <View className="list" key={video.itemid} onClick={()=>{
                                        navigateTo({
                                            url:'/pages/detail/index?id='+video.itemid,
                                        }).then();
                                    }}>
                                        <View>
                                            <View>
                                                <Text className="video-txt">{video.videoname}</Text>
                                            </View>
                                            <View className="video-link">
                                                <Image className="video-img" src={video.videoimgurl} />
                                                <Text className="play-btn" />
                                                <Text className="list-video-time">{video.time}</Text>
                                            </View>
                                            <View className="video-footer">
                                                <View className="share-panel">分享</View>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }
                        </>
                    )
                }

            </View>
        </View>
    </View>
  );
};
