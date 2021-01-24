import { EHDShortInterest } from '../model'
import { EHDCodeConfig, EHDDateRangeConfig } from './shared'

export interface EHDShortInterestConfig
  extends EHDCodeConfig,
    EHDDateRangeConfig {}

export interface EHDShortInterestModule {
  shortInterest: (config: EHDShortInterestConfig) => Promise<EHDShortInterest[]>
}
