import request from '@/core/request'

import { EOD_PRICE_ENDPOINT } from '@/utils/constants'

import codeEndpointApiRequest from '@/utils/code-endpoint-api-request'
import governmentBondCodeToString from '@/utils/government-bond-code-to-string'

import {
  EHDEODPriceModule,
  EHDEODPriceSubModuleConfig
} from '@/types/modules/end-of-day-price'

const endOfDayPrice: EHDEODPriceModule = {
  endOfDayPrice: codeEndpointApiRequest(EOD_PRICE_ENDPOINT),
  ecbExchangeRates: ({
    currency,
    ...options
  }: EHDEODPriceSubModuleConfig<'ecbExchangeRates'>) => {
    return request(`${EOD_PRICE_ENDPOINT}/ECBEUR${currency}.MONEY`, options)
  },
  euribor: ({
    ratePeriod,
    ...options
  }: EHDEODPriceSubModuleConfig<'euribor'>) => {
    return request(`${EOD_PRICE_ENDPOINT}/EURIBOR${ratePeriod}.MONEY`, options)
  },
  euriborFutures: ({
    ...options
  }: EHDEODPriceSubModuleConfig<'euriborFutures'>) => {
    return request(`${EOD_PRICE_ENDPOINT}/FEI.MONEY`, options)
  },
  governmentBondPrice: ({
    bond,
    ...options
  }: EHDEODPriceSubModuleConfig<'governmentBondPrice'>) => {
    const code = governmentBondCodeToString(bond)
    return request(`${EOD_PRICE_ENDPOINT}/${code}`, options)
  },
  libor: ({
    ratePeriod,
    nomination,
    ...options
  }: EHDEODPriceSubModuleConfig<'libor'>) => {
    return request(
      `${EOD_PRICE_ENDPOINT}/LIBOR${nomination}${ratePeriod}.MONEY`,
      options
    )
  },
  norgesBankExchangeRates: ({
    currency,
    ...options
  }: EHDEODPriceSubModuleConfig<'norgesBankExchangeRates'>) => {
    return request(`${EOD_PRICE_ENDPOINT}/NORGE${currency}NOK.money`, options)
  },
  stibor: ({
    ratePeriod,
    ...options
  }: EHDEODPriceSubModuleConfig<'stibor'>) => {
    return request(`${EOD_PRICE_ENDPOINT}/STIBOR${ratePeriod}.MONEY`, options)
  }
}

export default endOfDayPrice
