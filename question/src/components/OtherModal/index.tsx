import * as React from 'react';
import {Image, Text, View, Button, Ad,navigateTo} from 'remax/wechat';
// @ts-ignore
import classNames from 'classnames';
import './index.css';
import {AnswerStatus} from "@/util/data";

const addmoney = 0.12;
const addcardnum = 3;
const user = {
    money:12.3,
    balance:3.8,
};
const check_code = '12345';
const banner = true;

export type OtherModalProps = {
    visible:boolean;
    status:AnswerStatus;
    onClose:(status:AnswerStatus)=>void;
}

const OtherModal:React.FC<OtherModalProps> = ({status,visible,onClose}) => {
  return (
      <>
          {
              visible ? (
                  <View className={classNames(
                      'dialog-mask',
                      visible?'mask-show':'mask-hide'
                  )}>
                      <View className={classNames(
                          'other-modal',
                          'dialog-p',
                          visible?'dialog-con-show':'dialog-con-hide'
                      )}>
                          <View className="content">
                              <View className={classNames(
                                  'header',
                                  status,
                              )}>
                                  <Image mode="widthFix" src={`/images/modal_${status}.png`} />
                              </View>
                              {
                                  status==='empty' ? (
                                      <>
                                          <View className="title">无法答题，答题卡不足</View>
                                          <View className="desc">每次答题需消耗<Text className="hl">1张答题卡</Text></View>
                                          <Button className="free-btn" onClick={()=>navigateTo({url:'/pages/receive/index'})}>免费领取答题卡</Button>
                                      </>
                                  ) : null
                              }
                              {
                                  status==='right' ? (
                                      <>
                                          <View className="title">恭喜获得
                                              <Text className="hl">{addmoney}</Text>元红包
                                          </View>
                                          <View className="desc">金额已添加到您的余额中</View>
                                          <Button className="free-btn" onClick={()=>onClose(status)}>继续答题赚红包</Button>
                                      </>
                                  ) : null
                              }
                              {
                                  status==='card' ? (
                                      <>
                                          <View className="title">恭喜获得
                                              <Text className="hl">{addcardnum}张答题卡</Text>
                                          </View>
                                          <Button className="free-btn">确定</Button>
                                      </>
                                  ) : null
                              }
                              {
                                  status==='error' ? (
                                      <>
                                          <View className="title">很遗憾，回答错误</View>
                                          <Button className="free-btn" onClick={()=>onClose(status)}>继续答题赚红包</Button>
                                      </>
                                  ) : null
                              }
                              {
                                  status==='cashout' ? (
                                      <>
                                          <View className="title">余额满
                                              <Text className="hl">20元</Text>就可提现
                                          </View>
                                          <View className="desc hl">当前余额{user.money}还差{user.balance}元提现</View>
                                          <Button onClick={()=>onClose(status)} className="free-btn">继续答题赚红包</Button>
                                      </>
                                  ) : null
                              }
                              {
                                  status==='cashout_yes' ? (
                                      <>
                                          <View className="title">恭喜你,成功提现20元</View>
                                          <View className="desc hl">请联系客服</View>
                                          <View className="desc hl">提供核销码领取: {check_code}</View>
                                          <Button className="free-btn" onClick={()=>onClose(status)}>确定</Button>
                                      </>
                                  ) : null
                              }
                              {
                                  status==='get' ? (
                                      <>
                                          <View className="title">无法领取答题卡</View>
                                          <View className="desc hl">试玩<Text className="hl">20秒</Text>以上才能获得答题卡</View>
                                          <Button className="free-btn" onClick={()=>onClose(status)}>继续试玩小程序</Button>
                                      </>
                                  ) : null
                              }
                          </View>
                          {
                              banner ? (
                                  <View style={{marginTop: 20}}>
                                      <Ad unitId="{{banner}}" />
                                  </View>
                              ) : null
                          }
                          <Image className="close-btn-img" src="/images/modal_close.png" onClick={()=>onClose(status)} />
                      </View>
                  </View>
              ) : null
          }
      </>
  );
};

export default OtherModal;
