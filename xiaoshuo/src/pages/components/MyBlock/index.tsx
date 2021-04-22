import * as React from 'react';
import { View, Text, Image,Swiper,SwiperItem,request } from 'remax/wechat';
import styles from './index.css';
import {useEffect, useState} from "react";
import {Icon} from 'annar';
import {ListItem} from "@/pages/data";
import classNames from "classnames";

type MyBlockProps = {
    value?: ListItem
    myClass: 'todayBookList'|'vList'|'hList';
}

const MyBlock:React.FC<MyBlockProps> = ({value={},myClass}) => {

    return (
        <View key={value.title}>
            <View className={styles.header}>
                <Text className={styles.title}>{value.title}</Text>
                <Icon type='right' size={28} color='green' />
            </View>
            <View className={styles[`${myClass}`]}>
                {
                    (value.books||[]).map((item,index)=>(
                        <View className={styles.listItem} key={item.url}>
                            <View className={styles.bookImg}>
                                <Image mode='widthFix' src={item.img} />
                            </View>
                            {
                                myClass==='todayBookList' ? (
                                    <View className={styles.itemInfo}>
                                        <View className={classNames(styles.bookName,styles.ellipsis)}>{item.name}</View>
                                        <View className={classNames(styles.bookInfo,styles.ellipsis2)}>{item.info}</View>
                                        <View className={styles.infoWrap}>
                                            {
                                                index===0 ? (
                                                    <>
                                                        <View className={styles.bookAuthor}>{item.author}</View>
                                                        <View className={styles.bookAuthor}>{item.category}</View>
                                                        <View className={styles.bookAuthor}>{item.wordCount}</View>
                                                    </>
                                                ) : null
                                            }
                                            {
                                                index!=0 ? (
                                                    <>
                                                        <View className={styles.bookAuthor}>{item.category}</View>
                                                    </>
                                                ) : null
                                            }
                                        </View>
                                    </View>
                                ) : null
                            }
                            {
                                myClass==='hList' ? (
                                    <View className={styles.bookName}>{item.name}</View>
                                ) : null
                            }
                            {
                                myClass==='vList' ? (
                                    <View className={styles.itemInfo}>
                                        <View className={classNames(styles.bookName,styles.ellipsis)}>{item.name}</View>
                                        <View className={classNames(styles.bookInfo,styles.ellipsis2)}>{item.info}</View>
                                        <View className={styles.infoWrap}>
                                            <View className={styles.bookAuthor}>{item.author}</View>
                                            <View className={styles.bookAuthor}>{item.category}</View>
                                            <View className={styles.bookAuthor}>{item.wordCount}</View>
                                        </View>
                                    </View>
                                ) : null
                            }
                        </View>
                    ))
                }
            </View>
        </View>
    );
};

export default MyBlock;
