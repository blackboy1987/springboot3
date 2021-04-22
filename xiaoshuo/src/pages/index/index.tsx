import * as React from 'react';
import { View, Text, Image,Swiper,SwiperItem,request } from 'remax/wechat';
import styles from './index.css';
import {useEffect, useState} from "react";
import MyBlock from "@/pages/components/MyBlock";
import {ListItem} from "@/pages/data";
import {Grid} from "anna-remax-ui";

type Data = {
  slider?:{url: string, img: string}[];
  hList?: ListItem[];
  todayBookList?: ListItem;
  vList?:ListItem[];
}


export default () => {

  const [data,setData] = useState<Data>({});

  useEffect(()=>{
    request({
      url:'http://localhost:9000/api/xiaoshuo',
    }).then(result=>setData(result.data.data));
  },[]);


  return (
    <View className={styles.page}>
      <Swiper indicatorDots autoplay circular easingFunction='easeOutCubic' indicatorColor='#FFF'>




        {
          (data.slider||[]).map(item=>(
              <SwiperItem key={item.url}>
                <Image mode='widthFix' style={{width:'100%'}} src={item.img} />
              </SwiperItem>
          ))
        }
      </Swiper>

      <MyBlock value={data.todayBookList} myClass='todayBookList' />
      {
        (data.vList||[]).map((item,index)=>(
            <MyBlock value={item} myClass='vList' key={item.title} />
        ))
      }
      {
        (data.hList||[]).map((item,index)=>(
            <MyBlock value={item} myClass='hList' key={item.title} />
        ))
      }
    </View>
  );
};
