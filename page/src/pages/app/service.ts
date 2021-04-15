
import request  from '@/utils/request';
import { Constants } from '@/utils/constants';

export async function base(options?: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/base`, {
    method: 'POST',
    requestType:'form',
    ...(options || {}),
  });
}

export async function baseUpdate(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/baseUpdate`, {
    method: 'POST',
    requestType:'form',
    data: body,
  });
}

export async function ads() {
  return request<Record<string, any>>(`${Constants.baseUrl}app/ads`, {
    requestType:'form',
    method: 'POST',
  });
}

export async function adsUpdate(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/adsUpdate`, {
    requestType:'form',
    method: 'POST',
    data: body,
  });
}

export async function updatePassword(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/updatePassword`, {
    requestType:'form',
    method: 'POST',
    data: body,
  });
}
