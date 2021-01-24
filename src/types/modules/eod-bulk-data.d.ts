import { EHDBulkDataResult, EHDBulkExtendedDataResult } from '../model'
import { EHDFormatConfig, EHDSymbolsConfig } from './shared'
import { EHDBulkDataType, EHDBulkExchangeCode } from '../literals'

interface EHDBulkDataTypeConfig {
  type?: EHDBulkDataType
}

interface EHDExchangeCodeConfig {
  code?: EHDBulkExchangeCode
}

interface EHDDateConfig {
  /**
   *  By default, the data for last trading day will be downloaded, but if you need
   *  any specific date, add ‘date’ parameter to the URL
   */
  date?: string
}

interface EHDExtendedConfig {
  /**
   *  If you need more data, like company name, you can use ‘&filter=extended’ and
   *  get an extended dataset, which includes company name, EMA 50 and EMA 200 and
   *  average volumes for 14, 50 and 200 days.
   */
  extended: boolean
}

interface EHDEODBulkDataConfig
  extends EHDBulkDataTypeConfig,
    EHDDateConfig,
    EHDExchangeCodeConfig,
    EHDFormatConfig,
    EHDSymbolsConfig {}

type BulkEodDataReturnType<T> = T extends EHDExtendedConfig
  ? EHDBulkExtendedDataResult
  : EHDBulkDataResult

export interface EHDEODBulkDataModule {
  /**
   *
   *  This API allows to easily download the data for the entire exchange for a
   *  particular day. It works for end-of-day historical data feed as well as
   *  for splits and dividends data. For US tickers you can also use NYSE, NASDAQ,
   *  BATS or AMEX as exchange symbols to get data only for NYSE or only for
   *  NASDAQ exchange.
   *
   *  Each symbol request costs 1 API call. For example, multiple tickers request with
   *  ten symbols costs 10 API calls; however entire exchange request costs 100 API calls.
   *
   *  @param config
   *
   */
  bulkEodData: <
    T extends EHDEODBulkDataConfig | (EHDEODBulkDataConfig & EHDExtendedConfig)
  >(
    config?: T
  ) => Promise<BulkEodDataReturnType<T>>
}
