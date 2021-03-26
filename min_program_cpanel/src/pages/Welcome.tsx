import React, {useEffect, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import {Card, Alert, Typography, Button, Modal, Form, Input, message} from 'antd';
import {download, appCode, appToken} from "@/services/ant-design-pro/api";

export default (): React.ReactNode => {
  const [app,setApp] = useState<{appCode?: string,appToken?: string}>({});
  const [loading,setLoading] = useState<boolean>(false);
  const [password,setPassword] = useState<string>('');


  useEffect(()=>{
    appCode().then(data=>setApp({
      ...app,
      appCode:data.data.appCode,
    }));
  },[]);

  const handleDownload = async () =>{
    setLoading(true);
    const result = await download();
    const {code,downloadUrl,msg} = result.data;
    if(code===0){
      Modal.info({
        content: (
          <div>
            <p><a href={downloadUrl} target='_blank'>点我去下载</a></p>
            <p>下载地址有效期为10分钟，请尽快进行下载！！！</p>
          </div>
        ),
        onOk() {
          setLoading(false)
        },
      });
    }else{
      Modal.error({
        content: (
          <div>
            <p>{msg}</p>
          </div>
        ),
        onOk() {},
      });
    }
  }

  const viewAppToken = () =>{
    Modal.confirm({
      title:'提醒',
      content:(
        <div>
          <p>1.系统不会保存appToken数据</p>
          <p>2.每次获取的appToken都不一致，请妥善保管该数据</p>
          <p>3.重新获取之后，之前的使用的appToken将会失效，请及时修改之前的应用</p>
        </div>
      ),
      okText:'获取appToken',
      cancelText:'暂时不需要',
      onOk:()=>{
        Modal.confirm({
          title:'密码校验',
          content:(
            <div>
              <Input onChange={(e)=>setPassword(e.currentTarget.value)} />
            </div>
          ),
          okText:'获取appToken',
          cancelText:'暂时不需要',
          onOk:()=>{
            appToken({password}).then(res=>{
              const {code,msg,data} = res;
              console.log(app,data,res);
              if(code===0){
                setApp({
                  ...app,
                  appToken:data.appToken,
                });
                message.success('操作成功').then();
              }else{
                message.error(msg).then();
              }
            })
          },
        })
      },
    })
  }

  return (
    <PageContainer title={false} breadcrumb={{}}>
      <Card>
        <Alert
          message='欢迎体验小程序'
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          {
            app.appCode ? (
              <>
                您选择得是电影小程序
                <Button loading={loading} type='primary' style={{marginLeft:24}} onClick={handleDownload}>获取源码下载地址</Button>
              </>
            ) : (
              <Button type='primary' onClick={()=>history.push('/apply')}>您还未拥有小程序，赶紧申请一个吧！！！</Button>
            )
          }

        </Typography.Text>
      </Card>
      {
        app.appCode ? (
          <Card style={{marginTop:24}}>
            <Form.Item label='appCode'>
              <Input value={app.appCode} readOnly />
            </Form.Item>
            <Form.Item label='appToken'>
              <Input value={app.appToken} addonAfter={<span onClick={viewAppToken} style={{cursor:'pointer'}}>查看</span>}/>
            </Form.Item>
          </Card>
        ) : null
      }
    </PageContainer>
  );
};
