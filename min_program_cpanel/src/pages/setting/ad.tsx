import {FooterToolbar, PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {useEffect, useState} from "react";
import {adsUpdate, ads} from "@/pages/setting/service";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const Ad=()=>{

  const [loading,setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    ads().then(res=>{
      form.setFieldsValue(res)
    });
  })

  const onFinish = (values: { [key: string]: any }) => {
    setLoading(true);
    adsUpdate(values).then(res=>{
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
      <Form
        form={form}
        {...layout}
        onFinish={onFinish}
        initialValues={ads}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Card size='small' bordered={false} title='首页广告' style={{marginBottom:24}}>
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
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='提现页广告' style={{marginBottom:24}}>
              <Form.Item name={['tiXian', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['tiXian', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['tiXian', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['tiXian', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['tiXian', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['tiXian', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['tiXian', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='记录页广告' style={{marginBottom:24}}>
              <Form.Item name={['jiLu', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['jiLu', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['jiLu', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['jiLu', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['jiLu', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['jiLu', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['jiLu', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='答题卡页广告' style={{marginBottom:24}}>
              <Form.Item name={['daTiKa', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['daTiKa', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['daTiKa', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['daTiKa', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['daTiKa', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['daTiKa', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['daTiKa', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='签到页广告' style={{marginBottom:24}}>
              <Form.Item name={['qianDao', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['qianDao', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['qianDao', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['qianDao', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['qianDao', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['qianDao', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['qianDao', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='好友页广告' style={{marginBottom:24}}>
              <Form.Item name={['haoYou', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['haoYou', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['haoYou', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['haoYou', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['haoYou', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['haoYou', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['haoYou', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='其他页广告' style={{marginBottom:24}}>
              <Form.Item name={['other', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['other', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['other', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['other', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['other', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['other', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['other', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
        </Row>
        <FooterToolbar>
          <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
        </FooterToolbar>
      </Form>


    </PageContainer>
  );
}

export default Ad;
