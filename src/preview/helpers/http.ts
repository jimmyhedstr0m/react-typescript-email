import { isBrowser } from './utils';

export const http = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  const headers = init && init.headers ? new Headers(init.headers) : new Headers();
  headers.append('Content-Type', 'application/json');

  if (typeof input === 'string' && input.indexOf('http') === -1) {
    input = isBrowser
      ? window.location.origin + input
      : `http://${process.env.HOST}:${process.env.PORT + input}`;
  }
  const _init: RequestInit = {
    ...init,
    headers
  };

  return fetch(input, _init)
    .then((res) => {
      if (res.status >= 400) {
        return Promise.reject(res);
      }

      return Promise.resolve(res);
    });
};