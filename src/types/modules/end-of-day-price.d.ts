import { EHDEndOfDayPrice } from '../model'
import {
  EHDCodeConfig,
  EHDDateRangeConfig,
  EHDFormatConfig,
  EHDOrderConfig
} from './shared'
import {
  EHDAvailableGovernmentBondCountryCode,
  EHDBondPeriod,
  EHDECBAvailableCurrency,
  EHDEURIBORPeriod,
  EHDLIBORNomination,
  EHDLIBORPeriod,
  EHDNorgesBankAvailableCurrency,
  EHDSTIBORPeriod
} from '../literals'

interface EHDEODPricePeriodConfig {
  /**
   *   use ‘d’ for daily, ‘w’ for weekly, ‘m’ for monthly prices.
   *   By default, daily prices will be shown.
   */
  period?: 'd' | 'w' | 'm'
}

export interface EHDGovernmentBondIdentifier {
  /**
   *  Supported countries: USA, UK, France, Italy, Russia, China, India, Spain,
   *  Japan, Germany, Brazil, Canada, and others.
   */
  countryCode: EHDAvailableGovernmentBondCountryCode
  /**
   *  Supported periods: 1 month, 3 months, 6 months, 1 year, 3 years, 5 years, 10 years.
   */
  period: EHDBondPeriod
}

export interface EHDEODPriceConfig
  extends EHDCodeConfig,
    EHDDateRangeConfig,
    EHDOrderConfig,
    EHDFormatConfig,
    EHDEODPricePeriodConfig {}

type EHDEODPriceBaseRequest = (
  config: EHDEODPriceConfig
) => Promise<EHDEndOfDayPrice[]>

interface EHDEODFullPriceAPI {
  /**
   *
   *  Euro foreign exchange reference rates from ECB (European Central Bank).
   *  The reference rates are usually updated around 16:00 CET on every working
   *  day by ECB. We update rates at 17:00 CET on every working day.
   *  The foreign exchange rates are based on a regular daily procedure between
   *  central banks across Europe, which normally takes place at 14:15 CET.
   *
   */
  ecbExchangeRates: (
    config: Omit<EHDEODPriceConfig, 'code'> & {
      currency: EHDECBAvailableCurrency
    }
  ) => Promise<EHDEndOfDayPrice[]>
  /**
   *  Euribor, or the Euro Interbank Offer Rate, is a reference rate that is constructed from
   *  the average interest rate at which eurozone banks offer unsecured short-term lending
   *  on the inter-bank market. The maturities on loans used to calculate Euribor often
   *  range from one week to one year.
   *
   *  This is the benchmark rate with which banks lend or borrow excess reserves from one
   *  another over short periods of time, from one week to 12 months. These short-term loans
   *  are often structured as repurchase agreements (repos) and are intended to maintain
   *  bank liquidity and to make sure that excess cash is able to generate an interest
   *  return rather than sit idle. (source: Investopedia)
   *
   *  For EURIBOR, we have 1 week, 1 month, 3 months, 6 months and 12 months rates.
   *
   *  @param config
   */
  euribor: (
    config: Omit<EHDEODPriceConfig, 'code'> & {
      ratePeriod: EHDEURIBORPeriod
    }
  ) => Promise<EHDEndOfDayPrice[]>
  euriborFutures: (
    config: Omit<EHDEODPriceConfig, 'code'>
  ) => Promise<EHDEndOfDayPrice[]>
  /**
   *
   *  EOD Historical Data provides more than 100 Government Bonds for more than 15 countries with different
   *  periods all over the world.
   *
   *  @param config
   *
   */
  governmentBondPrice: (
    config: Omit<EHDEODPriceConfig, 'code'> & {
      bond:
        | string
        | {
            /**
             *  Supported countries: USA, UK, France, Italy, Russia, China, India, Spain,
             *  Japan, Germany, Brazil, Canada, and others.
             */
            countryCode: EHDAvailableGovernmentBondCountryCode
            /**
             *  Supported periods: 1 month, 3 months, 6 months, 1 year, 3 years, 5 years, 10 years.
             */
            period: EHDBondPeriod
          }
    }
  ) => Promise<EHDEndOfDayPrice[]>
  /**
   *
   *  The London Interbank Offered Rate (LIBOR) is a benchmark interest rate at which major global banks lend to one
   *  another in the international interbank market for short-term loans. (source: Investopedia)
   *
   *  For LIBOR we have 1 week, 1 month, 2 months, 3 months, 6 months and 12 months rates
   *  nominated in four different currencies: USD, EUR, GBP and JPY.
   *
   *  @param config
   *
   */
  libor: (
    config: Omit<EHDEODPriceConfig, 'code'> & {
      ratePeriod: EHDLIBORPeriod
      nomination: EHDLIBORNomination
    }
  ) => Promise<EHDEndOfDayPrice[]>
  /**
   *
   *  Norges Bank lists some 40 exchange rates. The publication time of daily exchange
   *  rates is approximately 16:00 CET. If you are looking for exchange rates that are
   *  not listed on our website, we suggest that you consult other Internet sites.
   *
   *  Norges Bank’s exchange rates are middle rates, i.e. the mid-point between
   *  buying and selling rates in the interbank market at a given time. The exchange
   *  rates are only intended to serve as an indication and are not binding on Norges Bank
   *  or other banks.
   *
   *  @param config
   *
   */
  norgesBankExchangeRates: (
    config: Omit<EHDEODPriceConfig, 'code'> & {
      currency: EHDNorgesBankAvailableCurrency
    }
  ) => Promise<EHDEndOfDayPrice[]>
  /**
   *
   *  Stockholm Interbank Offered Rate - STIBOR - is the official interbank offer rate
   *  for short term loans in Sweden. The Stockholm Interbank Offer Rate is determined
   *  by the Riksbank, Sweden's central bank, and is often used for one or three-month terms.
   *  STIBOR is the interest rate banks are charged when borrowing from other banks
   *  for maturities longer than overnight. (source: Investopedia)
   *
   *  @param config
   *
   */
  stibor: (
    config: Omit<EHDEODPriceConfig, 'code'> & { ratePeriod: EHDSTIBORPeriod }
  ) => Promise<EHDEndOfDayPrice[]>
}

type EHDEODPriceSubModuleConfig<T> = Parameters<EHDEODFullPriceAPI[T]>[0]

export interface EHDEODPriceModule extends EHDEODFullPriceAPI {
  endOfDayPrice: EHDEODPriceBaseRequest
}
