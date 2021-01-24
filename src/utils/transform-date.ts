import parseDateString from '@/utils/parse-date-string';

export default function transformDateRange(options: AnyObject) {
  const _options = { ...options };

  if (options.from) {
    _options.from = parseDateString(options.from);
  }

  if (options.to) {
    _options.to = parseDateString(options.to);
  }

  return _options;
}
