import {FooterToolbar, PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {useEffect, useState} from "react";
import {adsUpdate, ads} from "./service";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
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
      <Card title='小程序广告配置' bordered={false} size='small'>
        <Form
          form={form}
          {...layout}
          onFinish={onFinish}
          initialValues={ads}
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
          <Form.Item name={['index', 'gridAdId']} label='格子广告' extra='不填不启用'>
            <Input />
          </Form.Item>
          <Form.Item name={['index', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
            <Input />
          </Form.Item>
          <FooterToolbar>
            <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
          </FooterToolbar>
        </Form>
      </Card>
    </PageContainer>
  );
}

export default Ad;
