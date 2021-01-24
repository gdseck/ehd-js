import codeEndpointApiRequest from '@/utils/code-endpoint-api-request'
import { SPLITADJUSTED_ONLY, TECHNICALS_ENDPOINT } from '@/utils/constants'
import { EHDTechnicalsModule } from '@/types/modules/technicals'
import transformDateRange from '@/utils/transform-date'
import transformToSnakeCase from '@/utils/transform-to-snake-case'
import transformBooleanValue from '@/utils/transform_boolean_value'

const technicals: EHDTechnicalsModule = {
  technicals: codeEndpointApiRequest(TECHNICALS_ENDPOINT, [
    transformDateRange,
    transformToSnakeCase([
      'splitadjustedOnly',
      'fastKperiod',
      'slowKperiod',
      'slowDperiod',
      'fastPeriod',
      'slowPeriod',
      'signalPeriod'
    ]),
    transformBooleanValue(SPLITADJUSTED_ONLY)
  ])
}

export default technicals
