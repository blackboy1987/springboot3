
import {Button, Form, Input, message} from "antd";
import React, {useEffect, useState} from "react";
import {detail, shareUpdate} from "./service";
import MyUpload from "@/components/MyUpload";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

type ShareConfigProps = {
  id: number;
}

const ShareConfig: React.FC<ShareConfigProps>=({id})=>{

  const [loading,setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    detail({
      id,
      type: 'share',
    }).then(response=>form.setFieldsValue(response.data))
  },[]);

  const onFinish = (formValues: { [key: string]: any }) => {
    setLoading(true);
    shareUpdate({id,...formValues}).then(res=>{
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
    <Form
      form={form}
      {...layout}
      onFinish={onFinish}
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
  );
}

export default ShareConfig;
