
import request  from '@/utils/request';
import { Constants } from '@/utils/constants';

export async function list(options?: Record<string, any>) {
  return request(`${Constants.baseUrl}app/list`, {
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


export async function detail(params: {[key: string]: any},options?: Record<string, any>) {
  return request<API.ResponseData>(`${Constants.baseUrl}app/get`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  });
}


export async function shareUpdate(params: {[key: string]: any},options?: Record<string, any>) {
  return request<API.ResponseData>(`${Constants.baseUrl}app/shareUpdate`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  });
}

export async function members(params: {[key: string]: any},options?: Record<string, any>) {
  return request(`${Constants.baseUrl}app/members`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  }).then(response=>{
    return {
      success: true,
      data:response.data.content,
      total: response.data.total,
    }
  });
}

export async function productCategories(params: {[key: string]: any},options?: Record<string, any>) {
  return request(`${Constants.baseUrl}app/productCategories`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  }).then(response=>{
    return {
      success: true,
      data:response.data,
      total: (response.data||[]).length,
    }
  });
}

export async function products(params: {[key: string]: any},options?: Record<string, any>) {
  return request(`${Constants.baseUrl}app/products`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  }).then((response)=>{
    return {
      success: true,
      data:response.data.content,
      total: response.data.total,
    }
  });
}

export async function orders(params: {[key: string]: any},options?: Record<string, any>) {
  return request(`${Constants.baseUrl}app/orders`, {
    method: 'POST',
    requestType:'form',
    data: params,
    ...(options || {}),
  }).then(response=>{
    return {
      success: true,
      data:response.data.content,
      total: response.data.total,
    }
  });
}



export async function other(body: Record<string, any>,options?: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/other`, {
    method: 'POST',
    requestType:'form',
    data: body,
    ...(options || {}),
  });
}

export async function otherUpdate(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/otherUpdate`, {
    method: 'POST',
    requestType:'form',
    data: body,
  });
}

export async function moreProgram(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/moreProgram`, {
    method: 'POST',
    requestType:'form',
    data: body,
  });
}

export async function moreProgramSave(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/moreProgramSave`, {
    method: 'POST',
    requestType:'form',
    data: body,
  });
}
