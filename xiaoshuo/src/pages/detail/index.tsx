import * as React from 'react';
import {Image, request, Text, View} from 'remax/wechat';
import styles from './index.css';
import classNames from "classnames";
import {useEffect, useState} from "react";

type Data = {

}

export default () => {

    const [data,setData] = useState<Data>({});

    useEffect(()=>{
        request({
            url:'http://localhost:9000/api/xiaoshuo/detail',
            data:{
                url: 'book/11728100'
            }
        }).then(result=>setData(result.data.data));
    },[]);
    return (
        <View className={styles.page}>
           <View className={styles.cover}>
               <View className={styles.bookview}>
                   <View className={styles.side}>
                       <Image mode='widthFix' src='https://bookbk.img.zhangyue01.com/idc_1/m_1,w_300,h_400/dd39f842/group61/M00/03/C0/CmQUOFvlTQKECXJlAAAAAAgBdsI193035302.jpg?v=tpdsG2G2&t=CmQUOF6IvoI.' />
                        <text className={styles.icon_tag}>已完结</text>
                   </View>
                   <View className={styles.main}>
                       <View>
                           <View className={styles.z_ellipsis2}>与你处处都是小美好</View>
                           <View className={classNames(styles.bk_author, styles.z_ellipsis)}>
                               <Text className={styles.author}>苏画弦</Text>
                               <Text className={styles.author}>文学艺术</Text>
                           </View>
                           <View>
                               <View className={classNames(styles.stars, styles.white)}>
                                   <Text className={classNames(styles.cur, styles.r9)} />
                               </View>
                               <Text className={styles.gray}>92.分</Text>
                           </View>
                       </View>
                       <View className={styles.other}>
                           <View className={styles.font_num}>7.2万字</View>
                           <View className={styles.right}>阅读人数
                               <View className={styles.count}>108.6万</View>
                           </View>
                       </View>
                   </View>
               </View>
           </View>
        </View>
    );
};
