import * as React from 'react';
import {View, Button,RichText,Image,Ad,navigateTo} from 'remax/wechat';
import './index.css';
import {useState} from "react";
import MyModal from "@/components/MyModal";

const user ={
  money:0.04,
}
const sysinfo = {
  sys_is_cashout:1,
  sys_ad_videob_id:'1234',
  sys_cashout_rule:"<p>1、达到提现金额并满足条件即可提现</p><p>2、请上传自己微信收款二维码，或者支付宝收款二维码</p><p>3、申请提现后会在24小时内发放</p><p>4、使用过程中如有疑问，可联系客服</p>",
}
const data = {
  "result":"success",
  "list":[
    {
      "id":"1",
      "money":"0.30",
      "sign_num":"签到2天 ",
      "friend_num":"",
      "true_num":"答对10题 ",
      "try_num":null,
      "type":"新人专享",
      "sortrank":"1",
      "ishidden":"1",
      "create_time":"1609482248",
      "uniacid":"8"
    },
    {
      "id":"2",
      "money":"1.00",
      "sign_num":"签到4天 ",
      "friend_num":"邀请1人 ",
      "true_num":"答对30题 ",
      "try_num":null,
      "type":"新人专享",
      "sortrank":"2",
      "ishidden":"1",
      "create_time":"1609816358",
      "uniacid":"8"
    },
    {
      "id":"3",
      "money":"5.00",
      "sign_num":"签到8天 ",
      "friend_num":"邀请6人 ",
      "true_num":"答对90题 ",
      "try_num":null,
      "type":"新人专享",
      "sortrank":"3",
      "ishidden":"1",
      "create_time":"1609816338",
      "uniacid":"8"
    },
    {
      "id":"4",
      "money":"20.00",
      "sign_num":"签到10天 ",
      "friend_num":"邀请8人 ",
      "true_num":"答对300题 ",
      "try_num":null,
      "type":"不限次数",
      "sortrank":"4",
      "ishidden":"1",
      "create_time":"1609926286",
      "uniacid":"8"
    },
    {
      "id":"5",
      "money":"100.00",
      "sign_num":"签到30天 ",
      "friend_num":"邀请15人 ",
      "true_num":"答对1000题 ",
      "try_num":null,
      "type":"不限次数",
      "sortrank":"5",
      "ishidden":"1",
      "create_time":"1609926315",
      "uniacid":"8"
    }
  ]
};
const showModal = true;

export default () => {
  const [modal,setModal] = useState({
    show: false,
    image:'https://i0.hdslb.com/bfs/face/b80557b2b879371bc5f1806fa6720b422f34a4a5.jpg@140w_140h_1c.webp',
  });
  const [showModal,setShowModal] = useState<boolean>(false);
  return (
    <>
      <View style={{height:20}} />
      <View className="cashout_maina">
        <View className="h2">{user.money}</View>
        <View className="h3">{sysinfo.sys_is_cashout == 1 ? '可提现金额（元）' : '可用金币'}</View>
        <View className="cont clearfix">
          <View className="btn" onClick={()=>{
            navigateTo({
              url:'/pages/record/index'
            }).then();
          }}>记录</View>
          <View className="btn" onClick={()=>setShowModal(true)}>规则</View>
          <Button className="btn" openType="contact">客服</Button>
        </View>
      </View>
      <View className="cashout_mainb">
        {
          data.list.map(item=>(
              <View className="box clearfix" key={item.id}>
                <View className="img">
                  <Image src="/images/cashout_redbag.png" />
                </View>
                <View className="text">
                  <View className="h3">{item.money}{sysinfo.sys_is_cashout == 1 ? '元' : '个'} - {item.type}</View>
                  <View className="p">{item.sign_num}{item.friend_num}{item.true_num}</View>
                </View>
                <View className="btn" >{sysinfo.sys_is_cashout == 1 ? '提现' : '兑换'}</View>
              </View>
          ))
        }
      </View>
      {
        sysinfo.sys_ad_videob_id?(
            <View style={{width:710,margin:'0 auto'}} >
              <Ad adTheme="white" adType="video" unitId={sysinfo.sys_ad_videob_id} />
            </View>
        ): null
      }
      <MyModal height='' show={showModal} confirm={()=>setShowModal(false)}>
        <View className="cashrule_box">
          <View className="h3">提现规则</View>
          <View className="p">
            <RichText nodes={sysinfo.sys_cashout_rule} />
          </View>
        </View>
      </MyModal>
      {
        modal.show ? (
            <View className="modal_mask">
              <View className="modal-content">
                <View className="main-content">
                  <View className="img">
                    <Image mode="heightFix" src={modal.image} />
                  </View>
                  <Button className="upload_btn" size="mini" type="default">上传收款码</Button>
                </View>
                <View className="modal-btn-wrapper">
                  <View className="cancel-btn" onClick={()=>{
                    setModal({
                      ...modal,
                      show: false,
                    })
                  }}>取消</View>
                  <View className="confirm-btn">确定</View>
                </View>
              </View>
            </View>
        ) : null
      }

    </>
  );
};
