import { EHDBondPrice } from '../model'
import {
  EHDDateRangeConfig,
  EHDFormatConfig,
  EHDOrderConfig
} from '../modules/shared'

interface EHDBondIsinConfig {
  /**
   *  You can fetch bond historical data by using its ISIN code. E.g. US910047AG49.
   *
   *  An International Securities Identification Number (ISIN) is a code that
   *  uniquely identifies a specific securities issue. The organization that
   *  allocates ISINs in any particular country is the country's respective
   *  National Numbering Agency (NNA). (source: Investopedia)
   *
   */
  isin: string
}

interface EHDBondPRiceConfig
  extends EHDDateRangeConfig,
    EHDFormatConfig,
    EHDOrderConfig,
    EHDBondIsinConfig {}

export interface EHDBondPriceModule {
  bondPrice: (config: EHDBondPRiceConfig) => Promise<EHDBondPrice[]>
}
