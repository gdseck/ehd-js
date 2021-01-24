import { EHDSplit } from '../model'
import { EHDCodeConfig, EHDDateRangeConfig } from './shared'

export interface EHDSplitsConfig extends EHDCodeConfig, EHDDateRangeConfig {}

export interface EHDSplitsModule {
  splits: (config: EHDSplitsConfig) => Promise<EHDSplit[]>
}
