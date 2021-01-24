import { EHDBondFundamentals } from '../model'

export interface EHDBondFundamentalsModule {
  bondFundamentals: (isinOrCusip: string) => Promise<EHDBondFundamentals>
}
