import request from '@/core/request'

import transformDateRange from '@/utils/transform-date'
import transformLastTradeDateRange from '@/utils/transform-last-trade-date'
import { OPTIONS_ENDPOINT } from '@/utils/constants'

import { EHDOptionsModule } from '@/types/modules/options'
import { EHDCodeConfig } from '@/types/modules/shared'
import transformToSnakeCase from '@/utils/transform-to-snake-case'

const options: EHDOptionsModule = {
  options: (config: Record<string | number | symbol, any>) => {
    const hasCode = 'code' in config
    const code = hasCode ? `/${(config as EHDCodeConfig).code}` : ''

    let options = config as AnyObject
    if (hasCode) {
      const { code, ...rest } = config as AnyObject & EHDCodeConfig
      options = rest
    }

    return request(`${OPTIONS_ENDPOINT}${code}`, options, [
      transformDateRange,
      transformToSnakeCase(['tradeDateFrom', 'tradeDateTo', 'contractName']),
      transformLastTradeDateRange
    ])
  }
}

export default options
