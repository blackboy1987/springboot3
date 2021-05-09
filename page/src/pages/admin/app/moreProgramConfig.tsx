
import React, {useRef, useState} from "react";
import {moreProgram, moreProgramSave} from "./service";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {Avatar, Button, Modal, Form, Input, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import MyUpload from "@/components/MyUpload";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

type MoreProgramConfigProps = {
  id: number;
}

const MoreProgramConfig: React.FC<MoreProgramConfigProps>=({id})=>{

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const columns: ProColumns<API.MoreProgram>[] = [
    {
      title: 'appId',
      dataIndex: 'appId',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '图片',
      dataIndex: 'icon',
      renderText:text=><Avatar src={text} />,
    },
    {
      title: '跳转路径',
      dataIndex: 'path',
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      valueType:'dateTime',
      width:150,
    },
  ];

  return (
    <>
      <ProTable<API.MoreProgram, API.PageParams>
        headerTitle='会员列表'
        actionRef={actionRef}
        rowKey="id"
        bordered
        size='small'
        search={false}
        params={{id}}
        request={moreProgram}
        columns={columns}
        options={{
          density:false,
          setting: false,
          fullScreen: false,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />
      {
        createModalVisible ? (
          <Modal title='添加更多小程序' visible={createModalVisible} footer={null} onCancel={()=>handleModalVisible(false)}>
            <Form
              {...layout}
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={(formValues)=>{
                moreProgramSave({
                  id1:id,
                  ...formValues
                }).then(response=>{
                  if(response.code===0){
                    message.success(response.msg);
                    handleModalVisible(false);
                    actionRef.current?.reload();
                  }else{
                    message.error(response.msg);
                  }
                });
              }}
            >
              <Form.Item
                label="小程序名称"
                name="name"
                rules={[{ required: true, message: '必填!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="小程序appId"
                name="appId"
                rules={[{ required: true, message: '必填!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="小程序简介"
                name="memo"
                rules={[{ required: true, message: '必填!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="小程序图片"
                name="icon"
                rules={[{ required: true, message: '必填!' }]}
              >
                <Input addonAfter={<MyUpload success={(url: string)=>form.setFieldsValue({icon:url})} accept='image/png, image/jpeg' name={`${new Date().getTime()}`} />} />
              </Form.Item>
              <Form.Item
                label="跳转路径"
                name="path"
                rules={[{ required: true, message: '必填!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button block type="primary" htmlType="submit">保存</Button>
              </Form.Item>
            </Form>
          </Modal>
        ) : null
      }
    </>
  );
}

export default MoreProgramConfig;
