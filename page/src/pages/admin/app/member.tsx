
import React, {useRef} from "react";
import {members} from "./service";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {Avatar} from "antd";

type MemberConfigProps = {
  id: number;
}

const MemberConfig: React.FC<MemberConfigProps>=({id})=>{

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Member>[] = [
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      width:80,
      renderText: text=><Avatar src={text} />
    },
    {
      title: '推荐人',
      dataIndex: 'parentName',
      width:80,
    },
    {
      title: '一级会员',
      dataIndex: 'level1Count',
      width:80,
    },
    {
      title: '二级会员',
      dataIndex: 'level2Count',
      width:80,
    },
    {
      title: '累计打卡',
      dataIndex: 'allCount',
      width:80,
    },
    {
      title: '今日打卡',
      dataIndex: 'todayCount',
      width:80,
    },
    {
      title: '积分',
      dataIndex: 'point',
      width:80,
    },
    {
      title: '余额',
      dataIndex: 'balance',
      width:80,
      valueType:'money',
    },
    {
      title: '地区',
      dataIndex: 'country',
      renderText: (_,record)=><>{record.country}{record.province}{record.city}</>
    },
    {
      title: '认证',
      dataIndex: 'isAuth',
      width:80,
      valueEnum :{
        true: {
          text: '已认证'
        },
        false: {
          text: '未认证'
        }
      }
    },
    {
      title: '最近签到',
      dataIndex: 'updateDate',
      valueType:'dateTime',
      width:150,
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      valueType:'dateTime',
      width:150,
    },
  ];

  return (
    <ProTable<API.Member, API.PageParams>
      headerTitle='会员列表'
      actionRef={actionRef}
      rowKey="id"
      bordered
      size='small'
      search={false}
      params={{id}}
      request={members}
      columns={columns}
      options={{
        density:false,
        setting: false,
        fullScreen: false,
      }}
    />
  );
}

export default MemberConfig;
