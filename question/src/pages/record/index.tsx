import * as React from 'react';
import {View,Text,setNavigationBarTitle} from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
import './index.css';
const paging = {
    searchLoading: true
}
const data = {
    "result":"success",
    "record":[
        {
            "id":"8017",
            "userid":"0",
            "title":"提现eTf0xSo2dv",
            "money":"-20",
            "time":"1606959827",
            "uniacid":"8"
        },
        {
            "id":"8016",
            "userid":"0",
            "title":"答题",
            "money":"0.01",
            "time":"1606959739",
            "uniacid":"8"
        },
        {
            "id":"8015",
            "userid":"0",
            "title":"答题",
            "money":"0.04",
            "time":"1606959729",
            "uniacid":"8"
        },
        {
            "id":"8014",
            "userid":"0",
            "title":"答题",
            "money":"0.04",
            "time":"1606959720",
            "uniacid":"8"
        },
        {
            "id":"8013",
            "userid":"0",
            "title":"答题",
            "money":"0.04",
            "time":"1606959715",
            "uniacid":"8"
        },
        {
            "id":"8012",
            "userid":"0",
            "title":"答题",
            "money":"0.08",
            "time":"1606959706",
            "uniacid":"8"
        },
        {
            "id":"8011",
            "userid":"0",
            "title":"提现DdpuA1lNy5",
            "money":"-20",
            "time":"1606959610",
            "uniacid":"8"
        },
        {
            "id":"8010",
            "userid":"0",
            "title":"答题",
            "money":"0.04",
            "time":"1606959567",
            "uniacid":"8"
        },
        {
            "id":"8009",
            "userid":"0",
            "title":"答题",
            "money":"0.1",
            "time":"1606959556",
            "uniacid":"8"
        },
        {
            "id":"8008",
            "userid":"0",
            "title":"答题",
            "money":"0.01",
            "time":"1606959546",
            "uniacid":"8"
        }
    ],
    "total":"14"
};

export default () => {

    usePageEvent('onLoad',()=>{
        setNavigationBarTitle({
            title: '****',
        }).then();
    })

  return (
    <>
        <View className="list">
            {
                data.record.map(item=>(
                    <View className="box clearfix" key={item.id}>
                        <View className="text">
                            <View className="h3">{item.title}</View>
                            <View className="p">{item.time}</View>
                        </View>
                        <View className="btn">
                            {
                                parseFloat(item.money)>0 ? (
                                    <Text>+{item.money}</Text>
                                ) : (
                                    <Text style={{color:'008000'}}>{item.money}</Text>
                                )
                            }
                        </View>
                    </View>
                ))
            }
            {
                data.record.length===0 ? (
                    <View className="norecord">暂无记录~</View>
                ) : null
            }
        </View>
        {
            data.record ? (
                <View>
                    <View className="loading" hidden={!paging.searchLoading}>点击加载更多</View>
                </View>
            ) : null
        }


    </>
  );
};
