import * as React from 'react';
import {Image, Text, View, Button, Ad} from 'remax/wechat';
import {usePageEvent} from 'remax/macro';

// @ts-ignore
import classNames from 'classnames';
import './index.css';

export type Status = 'card'|'close'|'empty'|'error'|'right';

const rpStatus = 0;
const time = 3;
const index_total_money = 1888;
const addmoney = 3.5;

export type RedPackageModalProps = {
    visible:boolean;
}

const RedPackageModal:React.FC<RedPackageModalProps> = ({visible}) => {

  return (
      <>
          {
              visible ? (
                  <View className={classNames(
                      'dialog-mask',
                      visible?'mask-show':'mask-hide'
                  )}>
                      <view
                          className={classNames(
                              'redpacket-modal',
                              rpStatus===0?'close':'open',
                              'dialog-p',
                              visible?'dialog-con-show':'dialog-con-hide'
                          )}>
                          {
                              rpStatus===0 ? (
                                  <View className="default-m">
                                      <View className="title">恭喜您获得</View>
                                      <View className="timer">{time}</View>
                                      <Button className="open-btn" />
                                      <View className="desc">瓜分奖池{index_total_money || '20000'}元</View>
                                  </View>
                              ) : (
                                  <View className="open-m">
                                      <View className="title">恭喜您获得现金红包</View>
                                      <View className="account"><text className="number">{addmoney}</text>元</View>
                                      <View className="account-desc">金额已添加到您的余额中</View>
                                      <Button className="share-btn">继续答题赚红包</Button>
                                  </View>
                              )
                          }
                          <Image className="close-btn-img" src="/images/modal_close.png" />
                      </view>
                  </View>
              ) : null
          }
      </>
  );
};

export default RedPackageModal;
