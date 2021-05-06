// @ts-ignore
/* eslint-disable */
import request  from '@/utils/request';
import {Constants} from "@/utils/constants";

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    mobile?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>(Constants.baseUrl+'login/captcha', {
    method: 'POST',
    requestType:'form',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
