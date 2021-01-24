import apiToken from '@/core/token'

import bondPriceModule from '@/modules/bond-price'
import bondFundamentalsModule from '@/modules/bond-fundamentals'
import bulkEodDataModule from '@/modules/bulk-eod-data'
import calendarModule from '@/modules/calendar'
import dividendsModule from '@/modules/dividends'
import endOfDayPriceModule from '@/modules/end-of-day-price'
import exchangeDetailsModule from '@/modules/exchange-details'
import exchangesListModule from '@/modules/exchanges-list'
import exchangeSymbolListModule from '@/modules/exchange-symbol-list'
import fundamentalsModule from '@/modules/fundamentals'
import indexConstituentsModule from '@/modules/index-constituents'
import intradayModule from '@/modules/intraday'
import livePricesModule from '@/modules/live-prices'
import macroEconomicsModule from '@/modules/macro-economics'
import optionsModule from '@/modules/options'
import screenerModule from '@/modules/screener'
import searchModule from '@/modules/search'
import shortInterestModule from '@/modules/short-interest'
import splitsModule from '@/modules/splits'
import technicalsModule from '@/modules/technicals'
import userModule from '@/modules/user'

import { EHD } from './types'

const ehd: EHD = {
  ...bondPriceModule,
  ...bondFundamentalsModule,
  ...bulkEodDataModule,
  ...calendarModule,
  ...dividendsModule,
  ...endOfDayPriceModule,
  ...exchangeDetailsModule,
  ...exchangesListModule,
  ...exchangeSymbolListModule,
  ...fundamentalsModule,
  ...indexConstituentsModule,
  ...intradayModule,
  ...livePricesModule,
  ...macroEconomicsModule,
  ...optionsModule,
  ...searchModule,
  ...screenerModule,
  ...shortInterestModule,
  ...splitsModule,
  ...technicalsModule,
  ...userModule,
  setToken: apiToken.set
}

export default ehd
