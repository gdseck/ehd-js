import { EHDUser } from '../model'

export interface EHDUserModule {
  user: () => Promise<EHDUser>
}
