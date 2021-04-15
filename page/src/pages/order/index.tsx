import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { rule } from '@/services/ant-design-pro/api';

const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '订单编号',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
        >
          修改
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle='订单列表'
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={rule}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
