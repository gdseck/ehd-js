import { EHDExchange } from '../model'
import { EHDFormatConfig } from './shared'

interface EHDExchangeListConfig extends EHDFormatConfig {}

export interface EHDExchangeListModule {
  exchangesList: (config?: EHDExchangeListConfig) => Promise<EHDExchange[]>
}
