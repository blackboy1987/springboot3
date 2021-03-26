import * as React from 'react';
import {Image, View} from 'remax/wechat';
import './index.css';

export type BlankPageProps = {
    title?:string;
    text?: string;
}

export const BlankPage:React.FC<BlankPageProps>= ({title='暂无相关内容',text='暂无相关内容'}) => {
    return (
        <View className="blank_page_wrap">
            <View className="blank_box">
                <Image className="bg" src="/images/blank_main_icon.png" />
                <View className="title">{title}</View>
                <View className="text">{text}</View>
            </View>
        </View>

    );
};
export default BlankPage;