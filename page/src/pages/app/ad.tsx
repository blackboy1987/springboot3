import {FooterToolbar, PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {useEffect, useState} from "react";
import {adsUpdate, ads} from "@/pages/app/service";

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
            <Card size='small' bordered={false} title='详情页广告' style={{marginBottom:24}}>
              <Form.Item name={['detail', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['detail', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['detail', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['detail', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['detail', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['detail', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['detail', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='分类页广告' style={{marginBottom:24}}>
              <Form.Item name={['feiLei', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['feiLei', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['feiLei', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['feiLei', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['feiLei', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['feiLei', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['feiLei', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='播放页广告' style={{marginBottom:24}}>
              <Form.Item name={['play', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['play', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['play', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['play', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['play', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['play', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['play', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='专题页广告' style={{marginBottom:24}}>
              <Form.Item name={['topic', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['topic', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['topic', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['topic', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['topic', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['topic', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['topic', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card size='small' bordered={false} title='我的页广告' style={{marginBottom:24}}>
              <Form.Item name={['woDe', 'bannerId']} label='Banner广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['woDe', 'rewardedVideoAdId']} label='激励式广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['woDe', 'interstitialAdId']} label='插屏广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['woDe', 'videoAdId']} label='视频广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['woDe', 'videoFrontAdId']} label='视频贴片广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['woDe', 'gridAdId']} label='格子广告' extra='不填不启用'>
                <Input />
              </Form.Item>
              <Form.Item name={['woDe', 'nativeAdId']} label='原生模板广告' extra='不填不启用'>
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
