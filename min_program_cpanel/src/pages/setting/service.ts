import {request} from "@@/plugin-request/request";
import {Constants} from "@/utils/constants";

export async function base() {
  return request<API.LoginResult>(Constants.baseUrl+'admin/app/base', {
    requestType:'form',
    method: 'POST',
  }).then((res:any)=>{
    return res.data;
  });
}

export async function baseUpdate(params:{[key:string]:any}) {
  return request<API.ResponseData>(Constants.baseUrl+'admin/app/baseUpdate', {
    requestType:'form',
    method: 'POST',
    data: params,
  });
}

export async function ads() {
  return request<API.LoginResult>(Constants.baseUrl+'admin/app/ads', {
    requestType:'form',
    method: 'POST',
  }).then((res:any)=>{
    return res.data;
  });
}

export async function adsUpdate(params:{[key:string]:any}) {
  return request<API.ResponseData>(Constants.baseUrl+'admin/app/adsUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function config() {
  return request<API.LoginResult>(Constants.baseUrl+'admin/app/config', {
    requestType:'form',
    method: 'POST',
  }).then((res:any)=>{
    return res.data;
  });
}

export async function configUpdate(params:{[key:string]:any}) {
  return request<API.ResponseData>(Constants.baseUrl+'admin/app/configUpdate', {
    method: 'POST',
    data: params,
  });
}
