import { EHDExchangeDetails } from '../model'
import { EHDCodeConfig, EHDDateRangeConfig } from './shared'

interface EHDExchangeDetailsConfig extends EHDCodeConfig, EHDDateRangeConfig {}

export interface EHDExchangeDetailsModule {
  exchangeDetails: (
    config: EHDExchangeDetailsConfig
  ) => Promise<EHDExchangeDetails>
}
