import { EHDLivePricesModule } from '@/types/modules/live'
import codeEndpointApiRequest from '@/utils/code-endpoint-api-request'
import {
  CALENDAR_ENDPOINT,
  REAL_TIME_ENDPOINT,
  TRENDS_ENDPOINT
} from '@/utils/constants'
import request from '@/core/request'
import transformDateRange from '@/utils/transform-date'
import transformSymbols from '@/utils/transform-symbols'

const livePrices: EHDLivePricesModule = {
  livePrices: (config) => {
    return request(`${REAL_TIME_ENDPOINT}/${config.code}`, config, [
      transformSymbols
    ])
  }
}

export default livePrices
