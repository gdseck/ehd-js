import request from '@/core/request'
import { BONDS_ONLY, SEARCH_ENDPOINT } from '@/utils/constants'
import { EHDSearchModule } from '@/types/modules/search'
import transformToSnakeCase from '@/utils/transform-to-snake-case'
import transformBooleanValue from '@/utils/transform_boolean_value'

const search: EHDSearchModule = {
  search: ({ query, ...options }) => {
    return request(`${SEARCH_ENDPOINT}/${query}`, options, [
      transformToSnakeCase(['bondsOnly']),
      transformBooleanValue(BONDS_ONLY)
    ])
  }
}

export default search
