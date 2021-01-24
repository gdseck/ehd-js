import qs from 'qs'

import apiToken from '@/core/token'
import { EHD_BASE_URL } from '@/utils/constants'

export default function toUrl(
  url: string,
  params: AnyObject,
  transformers: AnyFunction[]
) {
  const token = apiToken.get()

  if (!token) {
    throw new Error('No token provided')
  }

  const defaults = {
    api_token: token,
    fmt: 'json'
  }

  params = transformers.reduce((params, transformer) => {
    return transformer(params)
  }, params as AnyObject)

  const queryString = qs.stringify(Object.assign({}, defaults, params))
  return `${EHD_BASE_URL}${url}?${queryString}`
}
