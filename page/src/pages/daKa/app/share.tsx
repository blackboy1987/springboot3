import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Form, Input, message, Upload} from "antd";
import {useEffect, useState} from "react";
import {adsUpdate, ads} from "./service";
import MyUpload from "@/components/MyUpload";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Ad=()=>{

  const [loading,setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    ads().then(res=>{
      form.setFieldsValue(res.data)
    });
  })

  const onFinish = (values: { [key: string]: any }) => {
    setLoading(true);
    adsUpdate({ads:JSON.stringify(values)}).then(res=>{
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
    <PageContainer title={false} breadcrumb={{}}>
      <Card title='分享配置' bordered={false} size='small'>
        <Form
          form={form}
          {...layout}
          onFinish={onFinish}
          initialValues={ads}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name='shareText' label='分享标题' extra='默认为小程序名称'>
            <Input />
          </Form.Item>
          <Form.Item name='shareImage' label='分享图片' extra='默认为小程序logo'>
            <Input readOnly addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({shareImage:url})} accept='image/png, image/jpeg' name='shareImage' />} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button block type="primary" htmlType="submit" loading={loading}>保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
}

export default Ad;
