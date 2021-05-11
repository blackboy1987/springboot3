
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Input, message, Select } from 'antd';
import {base, baseUpdate} from '@/pages/app/service';

type BaseConfigProps = {
  id: number;
}

const BaseConfig: React.FC<BaseConfigProps> = ({id}) => {

  const [form] = Form.useForm();

  const [loading,setLoading] = useState<boolean>(false);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 18 },
  };

  const init = async ()=> {
    setLoading(true);
    try {
      const result = await base({id});
      form.setFieldsValue(result.data);
      console.log("result.data",result.data);
      setLoading(false);
    } catch (error) {
      message.error('网络错误！');
      setLoading(false);
    }
  }

  useEffect(()=>{
    init();
  },[]);

  const onFinish = async (formValues: any) => {
    setLoading(true);
    const result = await baseUpdate({id,...formValues});
    if(result.code===0){
      message.success(result.msg);
    }else{
      message.error(result.msg||'修改失败');
    }
    setLoading(false);
  };
  return (
    <Card bordered={false} size='small'>
      <Alert message='appId和appSecret 修改之后，将会同步更新appCode和appToken,请注意修改小程序里的appCode和appToken' type='warning' showIcon style={{marginBottom: 24}}/>
      <Form
        form={form}
        {...layout}
        onFinish={onFinish}
      >
        <Form.Item label="公众号名称" name='appName' rules={[
          {
            required:true,
            message:'必填'
          }
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="公众号appId" name='appId' rules={[
          {
            required:true,
            message:'必填'
          }
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="公众号appSecret" name='appSecret' rules={[
          {
            required:true,
            message:'必填'
          }
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="公众号logo" name='logo' rules={[
          {
            required:true,
            message:'必填'
          }
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="审核状态" name='status' rules={[
          {
            required:true,
            message:'必填'
          }
        ]}>
          <Select>
            <Select.Option value={1}>小程序审核中</Select.Option>
            <Select.Option value={2}>小程序审核通过</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button loading={loading} type="primary" block htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BaseConfig;
