import {Button, Descriptions, Result} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './index.less';

export type Step4Props={

}

const Step4: React.FC<Step4Props> = () => {

  const [app,setApp] = useState<{[key: string]: any}>({});

  useEffect(()=>{
    const app = localStorage.getItem('app');
    const appInfo = JSON.parse(app||'{}');
    setApp(appInfo);
  },[]);

  const getType=(type:number)=>{
    if(type===1){
      return '电影小程序';
    }

    return type;
  }

  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="登录用户名"> {app.username}</Descriptions.Item>
        <Descriptions.Item label="登录密码"> {app.password}</Descriptions.Item>
        <Descriptions.Item label="小程序名称"> {app.appName}</Descriptions.Item>
        <Descriptions.Item label="小程序appId"> {app.appId}</Descriptions.Item>
        <Descriptions.Item label="小程序appSecret"> {app.appSecret}</Descriptions.Item>
        <Descriptions.Item label="小程序模板"> {getType(app.type)}</Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary">
        再转一笔
      </Button>
      <Button>查看账单</Button>
    </>
  );
  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="预计两小时内到账"
      extra={extra}
      className={styles.result}
    >
      {information}
      {JSON.stringify(app)}
    </Result>
  );
};

export default Step4;
