import fetch from 'node-fetch'

import transformDateRange from '@/utils/transform-date'
import toUrl from '@/core/to-url'

export default function request(
  url: string,
  params: AnyObject = {},
  transformers: AnyFunction[] = [transformDateRange]
): Promise<any> {
  const fetchUrl = toUrl(url, params, transformers)

  if (process.env.NODE_ENV !== 'production') {
    console.log(fetchUrl)
  }

  return fetch(fetchUrl).then(async (res) => {
    if (!res.ok) {
      const msg = await res.text()
      throw new Error(
        `HTTP Error Response: ${res.status} ${res.statusText} \n ${msg}`
      )
    }

    if (params.fmt && params.fmt === 'csv') {
      return res.text()
    }
    return res.json()
  })
}
