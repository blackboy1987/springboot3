
import request  from '@/utils/request';
import { Constants } from '@/utils/constants';

export async function list(options?: Record<string, any>) {
  return request<API.OrderList>(`${Constants.baseUrl}order/list`, {
    method: 'POST',
    requestType:'form',
    ...(options || {}),
  }).then((response)=>{
    return {
      data:response.data.content || [],
      total: response.data.total,
      current: response.data.pageNumber,
      pageSize: response.data.pageSize,
    };
  });
}

export async function save(params: API.OrderListItem,options?: Record<string, any>) {
  return request<API.ResponseData>(`${Constants.baseUrl}order/save`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  });
}
