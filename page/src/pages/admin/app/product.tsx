
import React, {useRef} from "react";
import {products} from "./service";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";

type ProductConfigProps = {
  id: number;
}

const ProductConfig: React.FC<ProductConfigProps>=({id})=>{

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Product>[] = [
    {
      title: '分类',
      dataIndex: 'productCategoryName',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      valueType:'dateTime',
      width:150,
    },
  ];

  return (
    <ProTable<API.Product, API.PageParams>
      headerTitle='商品列表'
      actionRef={actionRef}
      rowKey="id"
      bordered
      size='small'
      search={false}
      params={{id}}
      request={products}
      columns={columns}
      options={{
        density:false,
        setting: false,
        fullScreen: false,
      }}
    />
  );
}

export default ProductConfig;
