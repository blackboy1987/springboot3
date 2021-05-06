import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Form, Input, message} from "antd";
import {useEffect, useState} from "react";
import {adsUpdate, share} from "./service";
import MyUpload from "@/components/MyUpload";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Share=()=>{

  const [loading,setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    share().then(res=>{
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
      <Card title='打卡配置' bordered={false} size='small'>
        <Form
          form={form}
          {...layout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name='clockNum' label='每日打卡次数'>
            <Input />
          </Form.Item>
          <Form.Item name='signPoint' label='每次打卡积分'>
            <Input />
          </Form.Item>
          <Form.Item name='clickRule' label='打卡规则' extra='9-12-5;13-24-3:9点到12点累计打卡5次，13点到24点累计打开3次'>
            <Input />
          </Form.Item>
          <Form.Item name='homeBgImage' label='首页背景图'>
            <Input />
          </Form.Item>
          <Form.Item name='defaultAvatar' label='默认头像'>
            <Input />
          </Form.Item>
          <Form.Item name='defaultNickName' label='默认昵称'>
            <Input />
          </Form.Item>
          <Form.Item name='waveTop' label='水波纹图1'>
            <Input />
          </Form.Item>
          <Form.Item name='waveMid' label='水波纹图2'>
            <Input />
          </Form.Item>
          <Form.Item name='waveBot' label='水波纹图3'>
            <Input />
          </Form.Item>
          <Form.Item name='loginImage' label='登陆背景'>
            <Input />
          </Form.Item>
          <Form.Item name='currencyName' label='货币名称'>
            <Input />
          </Form.Item>
          <Form.Item name='currencyIcon' label='货币图片'>
            <Input />
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Button block type="primary" htmlType="submit" loading={loading}>保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
}

export default Share;
