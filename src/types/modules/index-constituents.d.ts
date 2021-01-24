import { EHDIndexData } from '../model'

export interface EHDIndexConstituentsModule {
  indexConstituents: (code: string) => Promise<EHDIndexData>
}
