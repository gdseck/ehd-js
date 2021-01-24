import { EHDSearchResult } from '../model'

interface EHDSearchQueryConfig {
  /**
   *  Could be any string with ticker code or company name. Examples: ‘AAPL’,
   *  ‘Apple Inc’, ‘Apple’. You can also use ISINs for the search: US0378331005.
   *  There are no limitations to a minimum number of symbols in the query string.
   */
  query: string
}

interface EHDSearchLimitConfig {
  /**
   *  The number of results should be returned with the query. Default value: 15.
   *  If the limit is higher than 50, it will be automatically reset to 50.
   */
  limit?: number
}

interface EHDSearchBondsOnlyConfig {
  /**
   *  The default value is false and search returns only tickers, ETFs, and funds.
   */
  bondsOnly?: boolean
}

interface EHDSearchTypeConfig {
  /**
   *  The Search API supports the following types: all, stock, etf, fund, bonds, and index.
   *  The default value is ‘all’ and please note: with the value ‘all’ bonds will not be displayed,
   *  you should explicitly request bonds.
   */
  type?: 'all' | 'stock' | 'fund' | 'bonds' | 'index'
}

interface EHDSearchConfig
  extends EHDSearchBondsOnlyConfig,
    EHDSearchLimitConfig,
    EHDSearchTypeConfig,
    EHDSearchQueryConfig {}

export interface EHDSearchModule {
  /**
   *  The Search API for Stocks, ETFs, Mutual Funds and Indices is one of the best ways
   *  to quickly search assets either by code or by company or asset name. The search
   *  engine automatically understands if there asset name or code or even ISIN and
   *  prioritize the search fields accordingly. The search engine has several parameters
   *  for result ordering. We take into account not only search query but also market
   *  capitalization and the average trading volume for the past period.
   *
   *  @param config
   */
  search: (config: EHDSearchConfig) => Promise<EHDSearchResult>
}
