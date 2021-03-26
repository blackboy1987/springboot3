import {request} from "@@/plugin-request/request";
import {Constants} from "@/utils/constants";

export async function checkUserName(body: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.ResponseData>(Constants.baseUrl+'register/checkUsername', {
    method: 'POST',
    data: body,
    requestType:'form',
    ...(options || {}),
  }).then((res:any)=>{
    return res.data;
  });
}

export async function checkAppName1(body: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.ResponseData>(Constants.baseUrl+'register/checkAppName', {
    method: 'POST',
    data: body,
    requestType:'form',
    ...(options || {}),
  }).then((res:any)=>{
    return res.data;
  });
}

export async function checkAppId1(body: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.ResponseData>(Constants.baseUrl+'register/checkAppId', {
    method: 'POST',
    data: body,
    requestType:'form',
    ...(options || {}),
  }).then((res:any)=>{
    return res.data;
  });
}

export async function checkAppSecret1(body: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.ResponseData>(Constants.baseUrl+'register/checkAppSecret', {
    method: 'POST',
    data: body,
    requestType:'form',
    ...(options || {}),
  }).then((res:any)=>{
    return res.data;
  });
}
