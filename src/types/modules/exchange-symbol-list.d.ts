import { EHDSymbol } from '../model'
import { EHDFormatConfig } from './shared'
import { EHDExchangeCode } from '../literals'

interface EHDExchangeSymbolCodeConfig {
  code: EHDExchangeCode
}

interface EHDExchangeSymbolListConfig
  extends EHDExchangeSymbolCodeConfig,
    EHDFormatConfig {}

export interface EHDExchangeSymbolListModule {
  exchangeSymbolList: (
    config: EHDExchangeSymbolListConfig
  ) => Promise<EHDSymbol[]>
}
