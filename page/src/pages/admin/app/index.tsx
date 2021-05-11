import { PlusOutlined } from '@ant-design/icons';
import {Button, Divider, message, Modal, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {list,register,resetPass} from "./service";
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import Config from "@/pages/admin/app/config";

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [configModalVisible, setConfigModalVisible] = useState<boolean>(false);
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



  const columns: ProColumns<API.App>[] = [
    {
      title: '用户名',
      dataIndex: 'adminName',
      width:100,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width:100,
    },
    {
      title: '小程序',
      dataIndex: 'appName',
      width:120,
      copyable: true,
    },
    {
      title: '认证信息',
      dataIndex: 'appId',
      renderText:(_,record1)=>(
        <>
          <p> <Typography.Text copyable={{text:`${record1.appId}`}}>appId：{record1.appId}</Typography.Text></p>
          <p><Typography.Text copyable={{text:`${record1.appSecret}`}}>appSecret：{record1.appSecret}</Typography.Text></p>
          <p><Typography.Text copyable={{text:`${record1.appCode}`}}>appCode：{record1.appCode}</Typography.Text></p>
          <p><Typography.Text copyable={{text:`${record1.appToken}`}}>appToken：{record1.appToken}</Typography.Text></p>
        </>
      )
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
        if(text===0){
          return "成语";
        }
        if(text===1){
          return "影视";
        }
        if(text===2){
          return "短视频";
        }
        if(text===3){
          return "图转文";
        }
        if(text===4){
          return "答题";
        }
        if(text===5){
          return "打卡";
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
      renderText:(_,record1)=>(
        <>
          <a onClick={()=>{
            setConfigModalVisible(true);
            setRecord(record1);
          }}>设置</a>
        </>
      )
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.App, API.PageParams>
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
              message: '订单编号为必填项',
            },
          ]}
        />
        <ProFormText
          placeholder='请输入订单手机号'
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          label='手机号'
          name='mobile'
          rules={[
            {
              required: true,
              message: '手机号为必填项',
            },
          ]}
        />
      </ModalForm>
      {
        configModalVisible&&Object.keys(record).length>0 ? (
          <Config visible={configModalVisible} onClose={()=>{
            setConfigModalVisible(false);
            setRecord({})
          }} values={record} />
        ) : null
      }
    </PageContainer>
  );
};

export default TableList;
