import parseDateString from '@/utils/parse-date-string';

export default function transformLastTradeDateRange(options: AnyObject) {
  const _options = { ...options };

  if (options.trade_date_from) {
    _options.trade_date_from = parseDateString(options.trade_date_from);
  }

  if (options.trade_date_to) {
    _options.trade_date_to = parseDateString(options.trade_date_to);
  }

  return _options;
}
