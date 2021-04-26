
import request  from '@/utils/request';
import { Constants } from '@/utils/constants';

export async function list(options?: Record<string, any>) {
  return request<API.OrderList>(`${Constants.baseUrl}app/list`, {
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
  return request<API.ResponseData>(`${Constants.baseUrl}app/save`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  });
}

export async function resetPass(params: {id: number},options?: Record<string, any>) {
  return request<API.ResponseData>(`${Constants.baseUrl}app/resetPass`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  });
}

export async function register(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`${Constants.baseUrl}register/submit`, {
    method: 'POST',
    requestType:'form',
    data: body,
    ...(options || {}),
  });
}
