import React, {useEffect} from 'react';
import { Form, Button, Divider, Input } from 'antd';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

export type Step1Props = {
  next:(step:number)=>void;
}

const Step1: React.FC<Step1Props> = ({next}) => {

  const [form] = Form.useForm();
  const { validateFields } = form;

  const confirmDirty = false;

  useEffect(()=>{
    localStorage.setItem('app','{}');
  },[]);

  const onValidateForm = async () => {
    const values = await validateFields();
    const app = localStorage.getItem('app');
    const appInfo = JSON.parse(app||'{}');
    localStorage.setItem("app",JSON.stringify({
      ...appInfo,
      ...values,
    }));
    next(1);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (!value) {
      return promise.reject('请输入确认密码');
    }
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不一致');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    if (!value) {
      return promise.reject('请输入安全密码');
    }
    if (value.length < 6) {
      return promise.reject('密码长度不能少于6位');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']).then();
    }
    return promise.resolve();
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
      >
        <Form.Item label='安全密码' name='password' rules={[{validator: checkPassword}]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label='确认密码' name='confirm' rules={[{validator: checkConfirm}]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm} block>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>安全密码用来对系统的相关操作进行验证，请牢记您设置的密码！！！</h4>
      </div>
    </>
  );
};

export default Step1;
