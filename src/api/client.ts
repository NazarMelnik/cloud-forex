import { API_PROXY_URL } from '@/constants/api';

export async function apiPost<T>(params: Record<string, string>): Promise<T> {
  const body = new URLSearchParams(params);

  const response = await fetch(API_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
