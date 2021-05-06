import {
  LockOutlined,
  UserOutlined,
  WechatOutlined,
  QqOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs, Space, Tooltip, Button, Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import ProForm, {ProFormCaptcha, ProFormText} from '@ant-design/pro-form';
import { useIntl, Link, history, useModel } from 'umi';
import { login,register } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';

import styles from './index.less';
import moment from "moment";

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('mobile');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [visible,setVisible] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(false);
  const [visible1,setVisible1] = useState<boolean>(false);
  const [data,setData] = useState<{username?: string,password?: string,expireDate?: Date}>({});

  const [form] = Form.useForm();

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.status === 'ok') {
        message.success('登录成功！');
        await fetchUserInfo()
        goto();
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };
  const { status, type: loginType,msg } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="https://wx.qlogo.cn/mmhead/Q3auHgzwzM7nIew0GXK8tS0gzOeTsepzkQ7IyqP2cXOuOPLe41tLzQ/0" />
              <span className={styles.title}>影视小程序</span>
            </Link>
          </div>
          <div className={styles.desc} />
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType} style={{display:'none'}}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                })}
              />
              <Tabs.TabPane
                key="mobile"
                tab={intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '手机号登录',
                })}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={msg || intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误（admin/ant.design)',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder='请输入用户名'
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder='请输入密码'
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                />
              </>
            )}
            {status === 'error' && loginType === 'mobile' && !submitting && (
              <LoginMessage content="验证码错误" />
            )}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="mobile"
                  placeholder='手机号'
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder='请输入验证码'
                  countDown={120}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} 获取验证码`;
                    }
                    return '获取验证码';
                  }}
                  name="captcha"
                  phoneName="mobile"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ]}
                  onGetCaptcha={async (mobile) => {
                    const result = await getFakeCaptcha({
                      mobile,
                    });
                    if (result.code !== 0) {
                      message.error(result.data);
                      return;
                    }
                    message.success('获取验证码成功！');
                  }}
                />
              </>
            )}
          </ProForm>
          <div style={{marginTop:24}}>
            <Button block size='large' type='primary' danger onClick={()=>setVisible(true)}>申请</Button>
          </div>
          <Space className={styles.other}>
            负责人联系方式
            <Tooltip title='微信联系方式：QQ1169794338'>
              <WechatOutlined className={styles.icon} style={{color:'#1890ff'}} />
            </Tooltip>
            <Tooltip title='QQ联系方式：1169794338'>
              <QqOutlined className={styles.icon} style={{color:'#1890ff'}} />
            </Tooltip>
          </Space>
        </div>
      </div>
      <Modal title='请输入拼多多订单号' visible={visible} closable={false} okText='确定' cancelText='关闭' onOk={()=>{
        setLoading(true);
        form.validateFields().then(async values=>{
          const result = await register(values);
          if(result.code===0){
            setVisible(false);
            setData(result.data);
            setVisible1(true);
          }else{
            message.error(result.msg);
          }
          setLoading(false);
        }).catch(error=>{
          console.log(error);
          message.error("请输入拼多多订单号");
          setLoading(false);
        });
      }} onCancel={()=>setVisible(false)} confirmLoading={loading} destroyOnClose maskClosable={false}>
        <Form form={form}>
          <Form.Item name='orderSn' rules={[{required:true,message:'请输入拼多多订单号'}]}>
            <Input placeholder='请输入拼多多订单号' />
          </Form.Item>
          <Form.Item name='mobile' rules={[{required:true,message:'请输入拼多多手机号'}]}>
            <Input placeholder='请输入拼多多手机号' />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title='登陆账号' visible={visible1} footer={null} destroyOnClose maskClosable={false} onCancel={()=>setVisible1(false)}>
        <Alert message='请牢记您的登陆用户名和密码' showIcon type='warning' style={{marginBottom:24}} />
        <Form form={form}>
          <Form.Item label='登陆用户名'>
            <span className='ant-form-text'>{data.username}</span>
          </Form.Item>
          <Form.Item label='登 陆 密 码'>
            <span className='ant-form-text'>{data.password}</span>
          </Form.Item>
          <Form.Item label='到期时间'>
            <span className='ant-form-text'>{moment(data.expireDate).format("YYYY-MM-DD HH:mm:ss")}</span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
