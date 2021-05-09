
import {Button, Form, Input, message} from "antd";
import React, {useEffect, useState} from "react";
import {ads, adsUpdate} from "@/pages/app/service";


type AdConfigProps = {
  id: number;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 18 },
};

const AdConfig: React.FC<AdConfigProps>=({id})=>{

  const [loading,setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    ads({id}).then(res=>{
      form.setFieldsValue(res.data)
    });
  })

  const onFinish = (formValues: { [key: string]: any }) => {
    setLoading(true);
    adsUpdate({id,ads:JSON.stringify(formValues)}).then(res=>{
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
      <Form.Item name={['index', 'bannerId']} label='Banner广告' extra='不填不启用'>
        <Input />
      </Form.Item>
      <Form.Item name={['index', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
        <Input />
      </Form.Item>
      <Form.Item name={['index', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
        <Input />
      </Form.Item>
      <Form.Item name={['index', 'videoAdId']} label='视频广告' extra='不填不启用'>
        <Input />
      </Form.Item>
      <Form.Item name={['index', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
        <Input />
      </Form.Item>
      <Form.Item name={['index', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button loading={loading} type="primary" block htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdConfig;
