import request from '@/core/request'

import transformBulkExtended from '@/utils/transform-bulk-extended'
import transformSymbols from '@/utils/transform-symbols'
import { EOD_BULK_LAST_DAY_ENDPOINT } from '@/utils/constants'

import { EHDEODBulkDataModule } from '@/types/modules/eod-bulk-data'

const bulkEodData: EHDEODBulkDataModule = {
  bulkEodData: (config) => {
    const code = (config ? config.code : 'US') || 'US'
    if (config) {
      config.code = undefined
    }
    return request(`${EOD_BULK_LAST_DAY_ENDPOINT}/${code}`, config || {}, [
      transformBulkExtended,
      transformSymbols
    ])
  }
}

export default bulkEodData
