import {
  EHDETFFundamentals,
  EHDMutualFundFundamentals,
  EHDStockFundamentals
} from '../model'
import { EHDCodeConfig } from './shared'

interface EHDFundamentalsFilterConfig {
  /**
   *  The API supports fields filtering with the parameter ‘filter=’.
   *  EOD Historical Data supports multi-layer filtering. For example, if you want to
   *  get only ‘General’ block, then you can use the following filter: "filter=General"
   *
   *  and if you need only one field, Code, then you can use the following:
   *  "filter=General::Code"
   *
   *  Different layers divided with “::” and it’s possible to have any number of layers,
   *  you want, for example: "filter=Financials::Balance_Sheet::yearly"
   *
   *  It’s also possible to use several, comma-separated, filters, for example:
   *  "filter=General::Code,General,Earnings"
   *
   */
  filter?: string
}

interface EHDFundamentalsRequestConfig
  extends EHDCodeConfig,
    EHDFundamentalsFilterConfig {}

type EHDFundamentalsBaseRequest = <T = any>(
  config: EHDFundamentalsRequestConfig
) => Promise<T>

interface EHDFundamentalsRequest extends EHDFundamentalsBaseRequest {
  etf: (code: string) => Promise<EHDETFFundamentals>
  /**
   *
   *  It’s also possible to get data fro Mutual Fund by ISIN as well as by ticker.
   *  For example, for “Schwab S&P 500 Index” both identifications are correct:
   *  SWPPX.US and US8085098551.
   *
   *  @param config
   *
   */
  mutualFund: (codeOrIsin: string) => Promise<EHDMutualFundFundamentals>
  stock: (code: string) => Promise<EHDStockFundamentals>
}

export interface EHDFundamentalsModule {
  fundamentals: EHDFundamentalsRequest
}
