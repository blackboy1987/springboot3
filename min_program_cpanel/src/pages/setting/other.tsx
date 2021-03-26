import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {useEffect, useState} from "react";
import {config, configUpdate} from "@/pages/setting/service";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const Base=()=>{
  const [loading,setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    config().then(res=>{
      form.setFieldsValue(res)
    });
  })

  const onFinish = (values: { [key: string]: any }) => {
    setLoading(true);
    configUpdate(values).then(res=>{
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="签到奖励（答题卡）"
                name="signPoint"
                rules={[{ required: true, message: '必填' }]}
              >
                <Input addonAfter='张' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="答题扣除积分/每题"
                name="signBalance"
                rules={[{ required: true, message: '必填' }]}
              >
                <Input addonAfter='秒' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="激励视频数/每天"
                name="signBalance"
                rules={[{ required: true, message: '必填' }]}
              >
                <Input addonAfter='秒' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="分享领答题卡/每人"
                name="signBalance"
                rules={[{ required: true, message: '必填' }]}
              >
                <Input addonAfter='秒' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="激励视频奖励/每次"
                name="signBalance"
                rules={[{ required: true, message: '必填' }]}
              >
                <Input addonAfter='秒' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="激励视频间隔"
                name="videoInterval"
                rules={[{ required: true, message: '必填' }]}
                initialValue={120}
              >
                <Input addonAfter='秒' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item noStyle>
                <Form.Item
                  label="关卡配置"
                  name="signBalance"
                  extra='多项规则用分号分割'
                  style={{marginBottom:0}}
                >
                  <Input.TextArea />
                </Form.Item>
                <Col offset={6}>
                  <span>10_2_5:累计答对：10题，最小金额：2元，最大金额：5元</span>
                </Col>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item noStyle>
                <Form.Item
                  label="提现规则"
                  name="signBalance"
                  extra='多项规则用分号分割'
                  style={{marginBottom:0}}
                >
                  <Input.TextArea />
                </Form.Item>
                <Col offset={6}>
                  <span>0.3_2_1_10:提现金额：0.3元，签到2天，邀请1人，答对10题</span>
                </Col>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
}

export default Base;
