// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import {Constants} from "@/utils/constants";

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(Constants.baseUrl+'login/submit', {
    method: 'POST',
    data: body,
    requestType:'form',
    ...(options || {}),
  }).then((res:any)=>{
    return res.data;
  });
}

export async function wechatLogin() {
  return request(Constants.baseUrl+'wechat/login', {
    method: 'GET',
  });
}

export async function loginRefresh(body:{[key:string]: any}, options?: { [key: string]: any }) {
  return request(Constants.baseUrl+'wechat/login/refresh', {
    method: 'POST',
    data: body,
    requestType:'form',
    ...(options || {}),
  });
}





