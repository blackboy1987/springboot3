
import React, { useEffect, useState } from 'react';
import {Alert, Button, Card, Form, Input, InputNumber, message, Select} from 'antd';
import {other, otherUpdate} from './service';
import MyUpload from "@/components/MyUpload";

type OtherConfigProps = {
  id: number;
}

const OtherConfig: React.FC<OtherConfigProps> = ({id}) => {

  const [form] = Form.useForm();

  const [loading,setLoading] = useState<boolean>(false);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 18 },
  };

  const init = async ()=> {
    setLoading(true);
    try {
      const result = await other({id});
      form.setFieldsValue(result.data);
      setLoading(false);
    } catch (error) {
      message.error('网络错误！');
      setLoading(false);
    }
  }

  useEffect(()=>{
    init();
  },[]);

  const onFinish = async (formValues: any) => {
    setLoading(true);
    const result = await otherUpdate({id,otherConfig: JSON.stringify(formValues)});
    if(result.code===0){
      message.success(result.msg);
    }else{
      message.error(result.msg||'修改失败');
    }
    setLoading(false);
  };

  return (
    <Card bordered={false} size='small'>
      <Form
        form={form}
        {...layout}
        onFinish={onFinish}
      >
        <Form.Item label="每日打卡次数" name='clockNum'>
          <InputNumber style={{width:'100%'}} min={1} step={1} precision={0} />
        </Form.Item>
        <Form.Item label="首页背景图" name='homeBgImage'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({homeBgImage:url})} accept='image/png, image/jpeg' name='homeBgImage' />} />
        </Form.Item>
        <Form.Item label="签到图" name='resize'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({resize:url})} accept='image/png, image/jpeg' name='resize' />} />
        </Form.Item>
        <Form.Item label="首页动图1" name='waveTop'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({waveTop:url})} accept='image/png, image/jpeg' name='waveTop' />} />
        </Form.Item>
        <Form.Item label="首页动图2" name='waveMid'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({waveMid:url})} accept='image/png, image/jpeg' name='waveMid' />} />
        </Form.Item>
        <Form.Item label="首页动图3" name='waveBot'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({waveBot:url})} accept='image/png, image/jpeg' name='waveBot' />} />
        </Form.Item>
        <Form.Item label="签到更多图" name='moreImg'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({moreImg:url})} accept='image/png, image/jpeg' name='moreImg' />} />
        </Form.Item>
        <Form.Item label="登录背景" name='loginImage'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({loginImage:url})} accept='image/png, image/jpeg' name='loginImage' />} />
        </Form.Item>
        <Form.Item label="我的背景" name='myBg'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({myBg:url})} accept='image/png, image/jpeg' name='myBg' />} />
        </Form.Item>
        <Form.Item label="默认昵称" name='defaultNickName'>
          <Input />
        </Form.Item>
        <Form.Item label="默认头像" name='defaultAvatar'>
          <Input />
        </Form.Item>
        <Form.Item label="货币名称" name='currencyName'>
          <Input />
        </Form.Item>
        <Form.Item label="货币图片" name='currencyIcon'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({currencyIcon:url})} accept='image/png, image/jpeg' name='currencyIcon' />} />
        </Form.Item>
        <Form.Item label="签到背景" name='clickBgColor'>
          <Input />
        </Form.Item>
        <Form.Item label="签到默认文字" name='clockText'>
          <Input />
        </Form.Item>
        <Form.Item label="每次签到间隔时间" name='clockInterval'>
          <InputNumber style={{width:'100%'}} min={30} precision={0} step={1} />
        </Form.Item>
        <Form.Item label="palm" name='signPoint'>
          <InputNumber style={{width:'100%'}} min={0} step={1} precision={2} />
        </Form.Item>
        <Form.Item label="签到规则" name='clickRule'>
          <Input />
        </Form.Item>
        <Form.Item label="签到规则描述" name='rules'>
          <Input />
        </Form.Item>
        <Form.Item label="海报背景图" name='posterBg'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({posterBg:url})} accept='image/png, image/jpeg' name='posterBg' />} />
        </Form.Item>
        <Form.Item label="小程序二维码" name='qrCode'>
          <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({qrCode:url})} accept='image/png, image/jpeg' name='qrCode' />} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button loading={loading} type="primary" block htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default OtherConfig;
