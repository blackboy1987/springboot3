import React from 'react';
import {Form, Button, Divider, Radio, Card} from 'antd';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};
export type Step2Props={
  next:(step:number)=>void;
  prev:(step:number)=>void;
}

const Step3: React.FC<Step2Props> = ({next,prev}) => {
  const [form] = Form.useForm();

  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    const app = localStorage.getItem('app');
    const appInfo = JSON.parse(app||'{}');
    localStorage.setItem("app",JSON.stringify({
      ...appInfo,
      ...values,
    }));
    next(3);
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
      >
        <Form.Item
          label="小程序模板"
          name="type"
          rules={[{ required: true, message: '请选择小程序模板' }]}
        >
          <Radio.Group>
            <Radio value={1} style={{display:'flex',alignItems:'center'}}>
              <Card
                size='small'
                hoverable
                style={{ width: 120 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Card.Meta title="电影小程序"/>
              </Card>
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <div>
            <Button onClick={()=>prev(1)}>上一步</Button>
            <Button type="primary" onClick={onValidateForm} style={{marginLeft:24}}>提交</Button>
          </div>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>请按照实际情况进行设置，设置完成之后，后续无法修改</h4>
        <h4>注意：有些类型的小程序需要小程序主体是企业资质！！！</h4>
      </div>
    </>
  );
};

export default Step3;
