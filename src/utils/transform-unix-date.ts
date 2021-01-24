import parseDateString from '@/utils/parse-date-string';

export default function transformUnixDate(options: AnyObject) {
  const _options = { ...options };
  const { from, to } = options;

  if (from && typeof from !== 'number') {
    _options.from = new Date(parseDateString(from)).getTime() / 1000;
  }

  if (to && typeof to !== 'number') {
    _options.to = new Date(parseDateString(to)).getTime() / 1000;
  }

  if (_options.from && !options.to) {
    _options.to = new Date().getTime() / 1000;
  }

  return _options;
}
