// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import {Constants} from "@/utils/constants";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.ResponseData>(Constants.baseUrl+'currentUser', {
    method: 'POST',
    requestType:'form',
    ...(options || {}),
  }).then(res=>res.data);
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function download() {
  return request<API.ResponseData>(Constants.baseUrl+'download', {
    method: 'POST',
    requestType:'form',
  });
}

export async function appCode() {
  return request<API.ResponseData>(Constants.baseUrl+'appCode', {
    method: 'POST',
    requestType:'form',
  });
}

export async function appToken(params:{password:string}) {
  return request<API.ResponseData>(Constants.baseUrl+'appToken', {
    method: 'POST',
    data: params,
    requestType:'form',
  });
}
