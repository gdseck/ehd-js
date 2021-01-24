import request from '@/core/request'

export default function codeEndpointApiRequest(
  endpoint: string,
  transformers?: AnyFunction[]
) {
  return function ({ code, ...options }: AnyObject) {
    return request(`${endpoint}/${code}`, options, transformers)
  }
}
