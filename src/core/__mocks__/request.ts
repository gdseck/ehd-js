import toUrl from '@/core/to-url';

export default function request(
  url: string,
  params: AnyObject,
  transformers: AnyFunction[]
) {
  return toUrl(url, params, transformers);
}
