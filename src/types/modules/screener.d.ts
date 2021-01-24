import { EHDScreenerResult } from '../model'
import {
  EHDScreenerFilter,
  EHDScreenerOperation,
  EHDScreenerSignal,
  EHDScreenerSortKey
} from '@/types/literals'

interface EHDScreenerFilterConfig {
  /**
   *
   *  You can use fields to filter the data. Fields have two types: Strings and Numbers.
   *  For strings should be used String Operations and for Numbers should be used i
   *  Numeric Operations (see the chapter “List of Operations” in this documentation).
   *  For example, you can filter all companies with Market Capitalization above
   *  1 billion, have only positive EPS within the ‘Personal Products’ industry,
   *  and with name started with the letter ‘B’.
   *
   *  Supported fields:
   *  - code: String. Filters by the ticker code.
   *  - name: String. Filters by the ticker name.
   *  - exchange: String. Filters by the exchange code. The list of all exchange codes is here.
   *  - sector: String. Filters by sector. The list of sectors and industries is here.
   *  - industry: String. Filters by industry. The list of sectors and industries is here.
   *  - market_capitalization: Number. Filters by Market Capitalization, the latest value.
   *  - earnings_share: Number. Filters by Earnings-per-share (EPS), the latest value.
   *  - dividend_yield: Number. Filters by Dividend yield, the latest value.
   *  - refund_1d_p: Number. The last day gain/loss in percent. Useful to get top gainers, losers for the past day.
   *
   */
  filters: {
    [key in EHDScreenerFilter]?: [EHDScreenerOperation, string | number]
  }
}

interface EHDScreenerSignalConfig {
  /**
   *
   *  You can use signals to filter tickers by different calculated fields. All
   *  signals are pre-calculated on our side.
   *
   *  Supported signals:
   *  - 50d_new_lo, 50d_new_hi, 200d_new_lo, 200d_new_hi – filters tickers that have new 50/200 days lows or new 50/200 days highs.
   *  - bookvalue_neg, bookvalue_pos – filters tickers with positive Book Value or with Negative Book Value.
   *  - wallstreet_lo, wallstreet_hi – filters tickers that have a price lower or higher than expected by WallStreet analysts.
   *
   */
  signals: EHDScreenerSignal[]
}

interface EHDScreenerSortConfig {
  /**
   *
   *  Usage: sort=field_name.(asc|desc). Sorts all fields with
   *  type ‘Number’ in ascending/descending order.
   *
   */
  sort?: {
    [key in EHDScreenerSortKey]?: 'asc' | 'desc'
  }
}

interface EHDScreenerPageableConfig {
  /**
   *  The number of results should be returned with the query. Default value: 50,
   *  minimum value: 1, maximum value: 100.
   */
  limit?: number
  /**
   *  The offset of the data. Default value: 0, minimum value: 0, maximum value: 1000.
   *  For example, to get 100 symbols starting from 200 you should use limit=100 and offset=200.
   */
  offset?: number
}

type EHDScreenerConfig = EHDScreenerSortConfig &
  EHDScreenerPageableConfig &
  (
    | (EHDScreenerFilterConfig & EHDScreenerSignalConfig)
    | (EHDScreenerFilterConfig & Partial<EHDScreenerSignalConfig>)
    | (Partial<EHDScreenerFilterConfig> & EHDScreenerSignalConfig)
  )

export interface EHDScreenerModule {
  /**
   *
   *  The Screener API is available under ‘All World Extended’ and ‘All-In-One’ data
   *  packages. Each Screener API request consumes 5 API calls. The Screener API
   *  is a powerful tool that helps you filter out tickers with the given parameters.
   *
   */
  screener: (config: EHDScreenerConfig) => Promise<EHDScreenerResult[]>
}
