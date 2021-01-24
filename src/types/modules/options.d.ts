import { EHDOptionData } from '../model'
import { EHDCodeConfig, EHDDateRangeConfig } from './shared'

export interface EHDOptionLastTradeDateConfig {
  /**
   *  filters OPTIONS by lastTradeDateTime.
   */
  tradeDateFrom?: string
  /**
   *  filters OPTIONS by lastTradeDateTime.
   */
  tradeDateTo?: string
}

export interface EHDOptionContractNameConfig {
  /**
   *  returns only the data for particular contract.
   */
  contractName: string
}

export interface EHDOptionsConfig
  extends EHDDateRangeConfig,
    EHDOptionLastTradeDateConfig {}

export interface EHDOptionsModule {
  options(config: EHDOptionsConfig & EHDCodeConfig): Promise<EHDOptionData>
  options(
    config: EHDOptionsConfig & EHDOptionContractNameConfig
  ): Promise<EHDOptionData>
}
