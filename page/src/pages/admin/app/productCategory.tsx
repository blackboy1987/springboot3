
import React, {useRef} from "react";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {productCategories} from "@/pages/admin/app/service";

type ProductCategoryConfigProps = {
  id: number;
}

const ProductCategoryConfig: React.FC<ProductCategoryConfigProps>=({id})=>{

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.ProductCategory>[] = [
    {
      title: '分类名称',
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
    <ProTable<API.ProductCategory, API.PageParams>
      headerTitle='商品分类'
      actionRef={actionRef}
      rowKey="id"
      bordered
      size='small'
      search={false}
      params={{id}}
      request={productCategories}
      columns={columns}
      pagination={false}
      options={{
        density:false,
        setting: false,
        fullScreen: false,
      }}
    />
  );
}

export default ProductCategoryConfig;
