import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Modal } from 'antd';
import React, {useRef, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {list,register,resetPass} from "./service";
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import Ad from '@/pages/admin/app/ad';
import BaseConfig from '@/pages/admin/app/base';

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [adModalVisible, setAdModalVisible] = useState<boolean>(false);
  const [baseModalVisible, setBaseModalVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<{[key: string]: any}>({});

  const actionRef = useRef<ActionType>();

  const handleResetPass = (appId: number) =>{
    Modal.confirm({
      title:'提醒',
      content:'密码将会被重置为：123456',
      okText:'确定',
      cancelText:'取消',
      onOk: async ()=>{
        const result = await resetPass({
          id: appId,
        });
        if(result.code===0){
          message.success("操作成功");
        }else{
          message.error(result.msg);
        }
      },
    })
  }



  const columns: ProColumns<API.OrderListItem>[] = [
    {
      title: '登录账号',
      dataIndex: 'adminName',
      width:120,
    },
    {
      title: '小程序',
      dataIndex: 'appName',
      width:200,
      copyable: true,
    },
    {
      title: 'appId',
      dataIndex: 'appId',
      width:180,
      copyable: true,
    },
    {
      title: 'appSecret',
      dataIndex: 'appSecret',
      copyable: true,
    },
    {
      title: 'appCode',
      dataIndex: 'appCode',
      ellipsis:true,
      copyable: true,
      width:200,
    },
    {
      title: 'appToken',
      dataIndex: 'appToken',
      ellipsis:true,
      copyable: true,
    },
    {
      title: '过期时间',
      dataIndex: 'expireDate',
      valueType:'dateTime',
      width:150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width:60,
      renderText:text=>{
        if(text===1){
          return "影视";
        }

        return text;
      }
    },
    {
      title: '添加时间',
      dataIndex: 'createdDate',
      valueType:'dateTime',
      width:150,
    },
    {
      title: '操作',
      dataIndex: 'opt',
      width:100,
      fixed:'right',
      renderText:(_,record)=>(
        <>
          <a onClick={()=>{
            setBaseModalVisible(true);
            setRecord(record);
          }}>基础配置</a>
          <Divider type='vertical' />
          <a onClick={()=>{
            setAdModalVisible(true);
            setRecord(record);
          }}>广告配置</a>
          <Divider type='vertical' />
          <a onClick={()=>handleResetPass(record.id)}>重置密码</a>
        </>
      )
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.OrderListItem, API.PageParams>
        bordered
        size='small'
        headerTitle='公众号'
        actionRef={actionRef}
        rowKey="id"
        search={false}
        options={{
          density: false,
          fullScreen: false,
          setting: false,
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
        request={list}
        columns={columns}
        scroll={{x:1200}}
      />


      <ModalForm
        title='添加订单'
        width={600}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const result  = await register(value);
          if (result.code===0) {
            handleModalVisible(false);
            message.success('添加成功');
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }else{
            message.error(result.msg);
          }
        }}
      >
        <ProFormText
          placeholder='请输入订单编号'
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          label='订单编号'
          name='orderSn'
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
        />
      </ModalForm>

      <Modal width={1200} visible={adModalVisible&&Object.keys(record).length>0} destroyOnClose maskClosable={false} onCancel={()=>{
        setAdModalVisible(false);
        setRecord({})
      }} footer={null}>
        <Ad id={record.id} onClose={()=>{
          setAdModalVisible(false);
          setRecord({})
        }} />
      </Modal>

      <Modal width={800} visible={baseModalVisible&&Object.keys(record).length>0} destroyOnClose maskClosable={false} onCancel={()=>{
        setBaseModalVisible(false);
        setRecord({});
      }} footer={null}>
        <BaseConfig id={record.id} onClose={()=>{
          setAdModalVisible(false);
          setRecord({})
        }} />
      </Modal>

    </PageContainer>
  );
};

export default TableList;
