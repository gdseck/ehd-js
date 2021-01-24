import { EHDIntradayHistoricalData } from '../model'
import { EHDCodeConfig, EHDFormatConfig } from './shared'

export type EHDInterval = '1m' | '5m'

export interface EHDIntervalConfig {
  /**
   *  use ‘5m’ for 5-minutes intervals and ‘1m’ for 1-minute intervals.
   */
  interval?: EHDInterval
}

export interface EHDUnixDateRangeConfig {
  /**
   *  use this parameters to filter data by datetime.
   *  Parameters should be passed in UNIX time with UTC timezone, for example,
   *  this values are correct: “from=1564752900” and correspond to
   *  ‘ 2019-08-02 13:35:00 ‘. The maximum period between ‘from’ and ‘to’ is 100 days.
   *
   *  Next to a numerical value, the from and to parameters also accept a normal
   *  date string or the shorthand 'D|W|M|Q|Y' format. These will be transformed to
   *  a UNIX timestamp before sending the request.
   *
   */
  from?: number | string
  /**
   *  use this parameters to filter data by datetime.
   *  Parameters should be passed in UNIX time with UTC timezone, for example,
   *  this values are correct: “to=1564753200” and correspond to
   *  ‘ 2019-08-02 13:40:00 ‘. The maximum period between ‘from’ and ‘to’ is 100 days.
   *
   *  Next to a numerical value, the from and to parameters also accept a normal
   *  date string or the shorthand 'D|W|M|Q|Y' format. These will be transformed to
   *  a UNIX timestamp before sending the request.
   *
   */
  to?: number | string
}

export interface EHDIntraDayConfig
  extends EHDCodeConfig,
    EHDFormatConfig,
    EHDIntervalConfig,
    EHDUnixDateRangeConfig {}

export interface EHDIntradayModule {
  /**
   *
   *  The Intraday Data API is available under ‘All World Extended’ and ‘All-In-One’ data packages. We support intraday historical data for major exchanges all around the world.
   *
   *  For US (NYSE and NASDAQ) tickers. 1-minute intervals, including pre-market (premarket) and after-hours (afterhours) trading data from July 1, 2019. And 5-minute intervals from October 2020.
   *  For other tickers. 5-minute intervals and only from October 2020.
   *
   *  The data is updated 2-3 hours after market closing. For the US market, only NYSE and NASDAQ tickers are supported.
   *
   *  @param config
   *
   */
  intraday: (config: EHDIntraDayConfig) => Promise<EHDIntradayHistoricalData[]>
}
