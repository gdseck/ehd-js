import toSnakeCase from '../src/utils/to-snake-case'
import {
  BONDS_ONLY,
  CONTRACT_NAME,
  FAST_KPERIOD,
  FAST_PERIOD,
  SIGNAL_PERIOD,
  SLOW_DPERIOD,
  SLOW_KPERIOD,
  SLOW_PERIOD,
  SPLITADJUSTED_ONLY,
  TRADE_DATE_FROM,
  TRADE_DATE_TO
} from '../src/utils/constants'

describe('toSnakeCase', () => {
  test(TRADE_DATE_FROM, () => {
    expect(toSnakeCase('tradeDateFrom')).toEqual(TRADE_DATE_FROM)
  })

  test(TRADE_DATE_TO, () => {
    expect(toSnakeCase('tradeDateTo')).toEqual(TRADE_DATE_TO)
  })

  test(CONTRACT_NAME, () => {
    expect(toSnakeCase('contractName')).toEqual(CONTRACT_NAME)
  })

  test(BONDS_ONLY, () => {
    expect(toSnakeCase('bonds_only')).toEqual(BONDS_ONLY)
  })

  test(SPLITADJUSTED_ONLY, () => {
    expect(toSnakeCase('splitadjusted_only')).toEqual(SPLITADJUSTED_ONLY)
  })

  test(FAST_KPERIOD, () => {
    expect(toSnakeCase('fast_kperiod')).toEqual(FAST_KPERIOD)
  })

  test(SLOW_KPERIOD, () => {
    expect(toSnakeCase('slow_kperiod')).toEqual(SLOW_KPERIOD)
  })

  test(SLOW_DPERIOD, () => {
    expect(toSnakeCase('slow_dperiod')).toEqual(SLOW_DPERIOD)
  })

  test(FAST_PERIOD, () => {
    expect(toSnakeCase('fast_period')).toEqual(FAST_PERIOD)
  })

  test(SLOW_PERIOD, () => {
    expect(toSnakeCase('slow_period')).toEqual(SLOW_PERIOD)
  })

  test(SIGNAL_PERIOD, () => {
    expect(toSnakeCase('signal_period')).toEqual(SIGNAL_PERIOD)
  })
})
