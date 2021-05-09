
import request  from '@/utils/request';
import { Constants } from '@/utils/constants';

export async function base(body: Record<string, any>,options?: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/base`, {
    method: 'POST',
    requestType:'form',
    data: body,
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

export async function ads(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/ads`, {
    requestType:'form',
    method: 'POST',
    data: body,
  });
}

export async function adsUpdate(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/adsUpdate`, {
    requestType:'form',
    method: 'POST',
    data: body,
  });
}
export async function share() {
  return request<Record<string, any>>(`${Constants.baseUrl}app/share`, {
    requestType:'form',
    method: 'POST',
  });
}

export async function shareUpdate(body: Record<string, any>) {
  return request<Record<string, any>>(`${Constants.baseUrl}app/shareUpdate`, {
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
