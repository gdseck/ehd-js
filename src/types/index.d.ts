import { EHDBondFundamentalsModule } from './modules/bond-fundamentals'
import { EHDBondPriceModule } from './modules/bond-price'
import { EHDCalendarModule } from './modules/calendar'
import { EHDDividendsModule } from './modules/dividends'
import { EHDEODBulkDataModule } from './modules/eod-bulk-data'
import { EHDEODPriceModule } from './modules/end-of-day-price'
import { EHDExchangeDetailsModule } from './modules/exchange-details'
import { EHDExchangeListModule } from './modules/exchanges-list'
import { EHDExchangeSymbolListModule } from './modules/exchange-symbol-list'
import { EHDFundamentalsModule } from './modules/fundamentals'
import { EHDIndexConstituentsModule } from './modules/index-constituents'
import { EHDIntradayModule } from './modules/intraday'
import { EHDLivePricesModule } from './modules/live'
import { EHDMacroEconomicIndicatorModule } from './modules/macro-economics'
import { EHDOptionsModule } from './modules/options'
import { EHDScreenerModule } from './modules/screener'
import { EHDSearchModule } from './modules/search'
import { EHDShortInterestModule } from './modules/short-interest'
import { EHDSplitsModule } from './modules/splits'
import { EHDTechnicalsModule } from './modules/technicals'
import { EHDUserModule } from './modules/user'

export interface EHD
  extends EHDBondFundamentalsModule,
    EHDBondPriceModule,
    EHDEODBulkDataModule,
    EHDCalendarModule,
    EHDDividendsModule,
    EHDEODPriceModule,
    EHDExchangeDetailsModule,
    EHDExchangeListModule,
    EHDExchangeSymbolListModule,
    EHDFundamentalsModule,
    EHDIndexConstituentsModule,
    EHDIntradayModule,
    EHDLivePricesModule,
    EHDMacroEconomicIndicatorModule,
    EHDOptionsModule,
    EHDScreenerModule,
    EHDSearchModule,
    EHDShortInterestModule,
    EHDSplitsModule,
    EHDTechnicalsModule,
    EHDUserModule {
  setToken: (token: string) => void
}
