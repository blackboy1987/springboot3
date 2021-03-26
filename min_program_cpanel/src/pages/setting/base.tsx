import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Form, Input, message, Select} from "antd";
import {useEffect, useState} from "react";
import {base,baseUpdate} from "@/pages/setting/service";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const Base=()=>{
  const [loading,setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    base().then(res=>{
      console.log(res);
      form.setFieldsValue(res)
    });
  })

  const onFinish = (values: { [key: string]: any }) => {
    setLoading(true);
    baseUpdate(values).then(res=>{
      if(res.code !==0){
        message.error(res.msg).then();
      }else{
        message.success(res.msg).then();
      }
      setLoading(false);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setLoading(false);
    console.log('Failed:', errorInfo);
  };
  return (
    <PageContainer title={false}>
      <Card size='small' bordered={false}>
        <Form
          form={form}
          {...layout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="名称"
            name="appName"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.appId !== currentValues.appId}
          >
            {({ getFieldValue }) =>
              getFieldValue('appId') ? (
                <Form.Item
                  label="appId"
                  name="appId"
                  help='一旦填写不允许修改'
                  rules={[{ required: true, message: '必填' }]}
                >
                  <Input readOnly />
                </Form.Item>
              ) : (
                <Form.Item
                  label="appId"
                  name="appId"
                  help='一旦填写不允许修改'
                  rules={[{ required: true, message: '必填' }]}
                >
                  <Input />
                </Form.Item>
              )
            }
          </Form.Item>
          <Form.Item
            label="appSecret"
            name="appSecret"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="logo"
            name="logo"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select>
              <Select.Option value={0}>待审核</Select.Option>
              <Select.Option value={1}>审核中</Select.Option>
              <Select.Option value={2}>已审核</Select.Option>
              <Select.Option value={3}>已拒绝</Select.Option>
              <Select.Option value={4}>已关闭</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" loading={loading} htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
}

export default Base;
