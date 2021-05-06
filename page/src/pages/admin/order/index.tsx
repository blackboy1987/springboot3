import { PlusOutlined } from '@ant-design/icons';
import {Button, message} from 'antd';
import React, {useRef, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {list,save} from "./service";
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.OrderListItem>[] = [
    {
      title: '订单编号',
      dataIndex: 'orderSn',
    },
    {
      title: '订单用户',
      dataIndex: 'orderName',
    },
    {
      title: '小程序',
      dataIndex: 'appName',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.OrderListItem, API.PageParams>
        bordered
        size='small'
        headerTitle='订单列表'
        actionRef={actionRef}
        rowKey="id"
        search={false}
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
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const result  = await save(value as API.OrderListItem);
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
        <ProFormDigit
          placeholder='使用天数'
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          label='使用天数'
          name='days'
          min={0}
          fieldProps={{ precision: 0,step:1 }}
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
        />
        <ProFormText
          placeholder='订单用户'
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          label='订单用户'
          name='days'
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
