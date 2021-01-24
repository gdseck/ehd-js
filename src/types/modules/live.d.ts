import { EHDLivePrice } from '../model'
import { EHDCodeConfig, EHDFormatConfig } from './shared'

export interface EHDMultipleSymbolsConfig {
  /**
   *  Using this parameter you can fetch data for multiple tickers at once.
   *  You still need to use the code parameter. The 's=" param represents additional tickers.
   *
   *  It is not recommended to use more than 15-20 tickers per request
   *
   */
  s: string[] | string
}

export interface EHDLivePricesConfig extends EHDCodeConfig, EHDFormatConfig {}

export interface EHDLiveMultiplePricesConfig
  extends EHDLivePricesConfig,
    EHDMultipleSymbolsConfig {}

type LivePricesReturnType<T> = T extends EHDLiveMultiplePricesConfig
  ? EHDLivePrice[]
  : EHDLivePrice

export interface EHDLivePricesModule {
  /**
   *
   *  EOD Historical Data provides live (delayed) stock prices API for all subscribers
   *  of ‘All-World’, ‘All World Extended’, and ‘ALL-IN-ONE’ plans. With this API endpoint,
   *  you are able to get delayed (15-20 minutes) information about almost all stocks on the market.
   *
   *  @param config
   */
  livePrices: <T extends EHDLivePricesConfig | EHDLiveMultiplePricesConfig>(
    config: T
  ) => Promise<LivePricesReturnType<T>>
}
