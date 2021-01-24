import { EHDDividend } from '../model'
import {
  EHDCodeConfig,
  EHDDateRangeConfig,
  EHDFormatConfig
} from '../modules/shared'

export interface EHDDividendsConfig
  extends EHDCodeConfig,
    EHDDateRangeConfig,
    EHDFormatConfig {}

export interface EHDDividendsModule {
  dividends: (config: EHDDividendsConfig) => Promise<EHDDividend[]>
}
