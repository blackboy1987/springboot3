import React from 'react';
import {Form, Button, Input, Divider} from 'antd';
import styles from './index.less';
import {checkAppId1, checkAppName1, checkAppSecret1} from "@/pages/User/register/service";

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};
export type Step2Props={
  next:(step:number)=>void;
  prev:(step:number)=>void;
}

const Step2: React.FC<Step2Props> = ({next,prev}) => {
  const [form] = Form.useForm();

  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    const app = localStorage.getItem('app');
    const appInfo = JSON.parse(app||'{}');
    localStorage.setItem("app",JSON.stringify({
      ...appInfo,
      ...values,
    }));
    next(2);
  };

  const checkAppName = async (_: any, value: string)=>{
    const promise = Promise;
    if (!value) {
      return promise.reject('');
    }

    const result = await checkAppName1({
      appName:value,
    });
    if (result) {
      return promise.reject('用户名已存在');
    }
    return promise.resolve();
  }

  const checkAppId = async (_: any, value: string)=>{
    const promise = Promise;
    if (!value) {
      return promise.reject('');
    }

    const result = await checkAppId1({
      appId:value,
    });
    if (result) {
      return promise.reject('用户名已存在');
    }
    return promise.resolve();
  }

  const checkAppSecret = async (_: any, value: string)=>{
    const promise = Promise;
    if (!value) {
      return promise.reject('');
    }

    const result = await checkAppSecret1({
      appSecret:value,
    });
    if (result) {
      return promise.reject('用户名已存在');
    }
    return promise.resolve();
  }

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
      >
        <Form.Item
          label="小程序名称"
          name="appName"
          rules={[{ required: true, message: '请输入小程序名称' },{validator: checkAppName}]}
        >
          <Input autoComplete="off"  />
        </Form.Item>
        <Form.Item
          label="小程序appId"
          name="appId"
          rules={[{ required: true, message: '请输入小程序appId' },{validator: checkAppId}]}
        >
          <Input autoComplete="off"  />
        </Form.Item>
        <Form.Item
          label="小程序appSecret"
          name="appSecret"
          rules={[{ required: true, message: '请输入小程序appSecret' },{validator: checkAppSecret}]}
        >
          <Input autoComplete="off"  />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8}}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
         <div style={{display:'flex',justifyContent:'space-between'}}>
           <Button onClick={()=>prev(0)}>上一步</Button>
           <Button type="primary" onClick={onValidateForm}>下一步</Button>
         </div>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>小程序appId设置成功之后不允许修改</h4>
        <h4>登录密码用来登录本系统，请牢记您的登录密码！！！</h4>
      </div>
    </>
  );
};

export default Step2;
