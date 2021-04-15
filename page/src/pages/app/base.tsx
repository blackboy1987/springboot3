
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, Card, Form, Input, message, Select } from 'antd';
import { base, baseUpdate } from '@/pages/app/service';

const TableList: React.FC = () => {

  const [form] = Form.useForm();

  const [loading,setLoading] = useState<boolean>(true);

  const init = async ()=> {
    setLoading(true);
    try {
      const result = await base();
      form.setFieldsValue(result.data);
      setLoading(false);
    } catch (error) {
      message.error('网络错误！');
      setLoading(false);
    }
  }

  useEffect(()=>{
    init();
  },[]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 14 },
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const result = await baseUpdate(values);
    if(result.code===0){
      message.success(result.msg);
    }else{
      message.error(result.msg||'修改失败');
    }
    setLoading(false);
  };

  return (
    <PageContainer title={false} breadcrumb={{}}>
      <Alert message='appId和appSecret 修改之后，将会同步更新appCode和appToken,请注意修改小程序里的appCode和appToken' type='warning' showIcon/>
      <Card bordered={false} size='small' style={{marginTop:24}}>
        <Form
          form={form}
          {...layout}
          layout="horizontal"
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
          <Form.Item label="订阅通知模板ID" name='templateId'>
            <Input />
          </Form.Item>
          <Form.Item label="通知模板参数" name='templateParams'>
            <Input disabled title='禁止修改' />
          </Form.Item>
          <Form.Item label="审核状态" name='status' rules={[
            {
              required:true,
              message:'必填'
            }
          ]}>
            <Select>
              <Select.Option value={1}>审核中</Select.Option>
              <Select.Option value={2}>已通过</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button loading={loading} type="primary" block htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default TableList;
