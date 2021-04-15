
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, Card, Form, Input, message } from 'antd';
import { updatePassword } from '@/pages/app/service';

const TableList: React.FC = () => {

  const [form] = Form.useForm();

  const [loading,setLoading] = useState<boolean>(true);


  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 14 },
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const result = await updatePassword(values);
    if(result.code===0){
      message.success(result.msg);
    }else{
      message.error(result.msg||'修改失败');
    }
    setLoading(false);
  };

  return (
    <PageContainer title={false} breadcrumb={{}}>
      <Alert message='如果忘记原始密码请联系管理员！！！' type='warning' showIcon/>
      <Card bordered={false} size='small' style={{marginTop:24}}>
        <Form
          form={form}
          {...layout}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item label="原始密码" name='oldPassword' rules={[
            {
              required:true,
              message:'必填'
            }
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label="新密码" name='password' rules={[
            {
              required:true,
              message:'必填'
            }
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label="重复新密码" name='rePassword' rules={[
            {
              required:true,
              message:'必填'
            }
          ]}>
            <Input />
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
