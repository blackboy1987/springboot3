
import React, {useEffect, useState} from 'react';
import classNames from "classnames";

import styles from './index.less';
import {loginRefresh, wechatLogin} from "@/services/ant-design-pro/login";
import {message} from "antd";
import { history,useModel } from 'umi';

let timer:NodeJS.Timeout;

const Login: React.FC = () => {
  const [img,setImg] = useState<string>();
  const [loading,setLoading] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const goto = () => {
    if (!history) return;
    setTimeout(() => {
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
    }, 10);
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log("userInfo",userInfo);
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const refreshTicket = () =>{
    clearInterval(timer);
    timer = setInterval(()=>{
      if(localStorage.getItem('ticket')){
        loginRefresh({
          ticket:localStorage.getItem('ticket')
        }).then((res:{code: number,token: string})=>{
          if(res.code===0){
            // 扫码登录成功
            clearInterval(timer);
            localStorage.setItem('token',res.token);
            message.success('登录成功').then(async ()=>{
              await fetchUserInfo();
            goto();
            });
          }
          console.log(res);
        })
      }
    },5e3);
  }

  useEffect(()=>{
    setLoading(true);
    wechatLogin().then((res:{code: number,img: string,ticket: string})=>{
      const {code,img,ticket} = res;
      if(code!==0){
        message.error("二维码获取失败").then();
      }else{
        setImg(img);
        localStorage.setItem("ticket",ticket);
        refreshTicket();
      }
      setLoading(false);
    });
  },[]);

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <div className={styles.qrcode}>
          {img ? (<img className={styles.img} src={`data:image/png;base64,${img}`} />) : <div className={styles.img} />}
          <div>
            <p className={styles.sub_title}>使用手机微信扫码登录</p>
            <p className={styles.sub_desc}>未注册的账号，将会自动注册</p>
          </div>
          <div style={{display:'none'}}>
            <div className={styles.refresh_qrcode_mask}>
              <i className={classNames(styles.icon_refresh,loading?styles.rotateLoading:'')} />
            </div>
            <p className={styles.refresh_tips}>二维码失效，点击刷新</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
