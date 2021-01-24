type EHDOrder = 'a' | 'd';

type EHDFormat = 'json' | 'csv';

type EHDBooleanParam = 0 | 1;

interface EHDCodeConfig {
  /**
   *  consists of two parts: {SYMBOL_NAME}.{EXCHANGE_ID}, then you can use, for example,
   *  AAPL.MX for Mexican Stock Exchange. or AAPL.US for NASDAQ.
   */
  code: string;
}

interface EHDOrderConfig {
  /**
   *  Use ‘a’ for ascending dates (from old to new) and ‘d’ for descending dates (from new to old).
   *  By default, dates are shown in ascending order.
   */
  order?: EHDOrder;
}

interface EHDFormatConfig {
  /**
   *  use this parameter to get the data in a different format.
   *  Possible values are ‘json’ for JSON and ‘csv’ for CSV.
   *  By default, the data is provided in JSON format.
   */
  fmt?: EHDFormat;
}

interface EHDDateRangeConfig {
  /**
   *  You can use this parameters with format ‘YYYY-MM-DD’. For example, if you need to get data only from Jan 5, 2017, you need to use from=2017-01-05
   *
   *  This parameter also accepts shorthand date formats:
   *
   *  - D (Day):
   *
   *  from: 'D' will transform to today's date
   *  from: 'D-1' will transform to yesterday's date
   *  from: 'D-5' will equal 5 days ago
   *  ...etc
   *
   *  the same works in the other direction:
   *  'D+1' is tomorrow's date, 'D+5' is a week from now
   *
   *  - W (Week)
   *
   *  Same principle as with 'D'
   *
   *  note: 'W' will revert to today's date, 'W-1' will be today's date minus 7 days, etc
   *
   *  - M (month)
   *
   *  - Y (Year)
   *
   *  - Q (Quarter)
   *
   *  This works slightly different than the others:
   *
   *  'Q': takes the end of the current quarter
   *  'Q-1': the end of last quarter. For example, if today is 2020-12-01, 'Q-1' will turn into
   *  2020-09-30
   *
   *  Quarter end dates are as follows:
   *  03-31, 06-30, 09-30, 12-31
   */
  from?: string;
  /**
   *  You can use this parameters with format ‘YYYY-MM-DD’. For example, if you need to get data only to Feb 10, 2017, you need to use to=2017-02-10.
   */
  to?: string;
}

export interface EHDSymbolsConfig {
  /**
   *  You can request specific symbols to get historical and upcoming data. If ‘symbols’
   *  used, then ‘from’ and ‘to’ parameters will be ignored. You can use one
   *  symbol: ‘AAPL.US’ or several symbols separated by a comma: ‘AAPL.US, MSFT.US’
   */
  symbols?: string | string[];
}
