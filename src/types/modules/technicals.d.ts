import {
  EHDEndOfDayPrice,
  EHDTechnicalADX,
  EHDTechnicalAverageVolume,
  EHDTechnicalAverageVolumeByPrice,
  EHDTechnicalDMI,
  EHDTechnicalEMA,
  EHDTechnicalMACD,
  EHDTechnicalRSI,
  EHDTechnicalSlope,
  EHDTechnicalSMA,
  EHDTechnicalStochastic,
  EHDTechnicalVolatility,
  EHDTechnicalWMA
} from '../model'
import {
  EHDCodeConfig,
  EHDDateRangeConfig,
  EHDFormatConfig,
  EHDOrderConfig
} from './shared'

type EHDTechnicalIndicatorFunction =
  | 'adx'
  | 'avgvol'
  | 'avgvolccy'
  | 'dmi'
  | 'ema'
  | 'macd'
  | 'rsi'
  | 'slope'
  | 'sma'
  | 'splitadjusted'
  | 'stochastic'
  | 'volatility'
  | 'wma'
  

interface EHDTechnicalsConfig<T>
  extends EHDCodeConfig,
    EHDDateRangeConfig,
    EHDOrderConfig,
    EHDFormatConfig {
  /**
   * The function that will be applied to data series to get technical indicator data.
   *
   * Possible values:
   *  - 'adx' (Average Directional Movement Index)
   *
   *    This function returns the Average Directional Movement Index.
   *    The average directional index (ADX) is a technical analysis indicator used by some
   *    traders to determine the strength of a trend. (source: Investopedia)
   *
   *  - 'avgvol' (Average Volume):
   *
   *    This function returns the Average Trading Volume.
   *    The average volume of a security over a longer period of time is the total amount traded in that period,
   *    divided by the length of the period.
   *
   *  - 'avgvolccy' (Average Volume By Price):
   *
   *    This function returns the Average Trading Volume in currency.
   *    The average volume in the currency of a security over a longer period of time
   *    is the total amount traded in that period multiplied by the price of the security,
   *    and divided by the length of the period. (source: Investopedia)
   *
   *  - 'dmi' (Directional Movement Index)
   *
   *    This function returns the Directional Movement Index.
   *    he Directional Movement Index, or DMI, is an indicator that identifies in
   *    which direction the price of an asset is moving. The indicator does this by
   *    comparing prior highs and lows and drawing two lines: a positive directional
   *    movement line (+DI) and a negative directional movement line (-DI).
   *    An optional third line, called directional movement (DX) shows the
   *    difference between the lines. When +DI is above -DI, there is more upward
   *    pressure than downward pressure in the price. If -DI is above +DI, then
   *    there is more downward pressure in the price. (source: Investopedia)
   *
   *  - 'ema' (Exponential Moving Average)
   *
   *    This function returns the Exponential Moving Average indicator.
   *    An exponential moving average (EMA) is a type of moving average (MA) that places
   *    a greater weight and significance on the most recent data points.
   *    The exponential moving average is also referred to as the exponentially
   *    weighted moving average. An exponentially weighted moving average reacts more
   *    significantly to recent price changes than a simple moving average (SMA),
   *    which applies an equal weight to all observations in the period. (source: Investopedia)
   *
   *  - 'macd' (Moving Average Convergence/Divergence
   *
   *    This function returns Moving Average Convergence/Divergence values.
   *    Moving average convergence divergence (MACD) is a trend-following momentum
   *    indicator that shows the relationship between two moving averages of a
   *    security’s price. The MACD is calculated by subtracting the 26-period
   *    exponential moving average (EMA) from the 12-period EMA. (source: Investopedia)
   *
   *  - 'rsi' (Relative Strength Index)
   *
   *    This function returns the Relative Strength Index (RSI) technical indicator.
   *    The relative strength index (RSI) is a momentum indicator used in technical
   *    analysis that measures the magnitude of recent price changes to evaluate overbought
   *    or oversold conditions in the price of a stock or other asset.
   *    The RSI is displayed as an oscillator (a line graph that moves between two extremes)
   *    and can have a reading from 0 to 100. (source: Investopedia)
   *
   *  - 'slope' (Linear Regression Slope)
   *
   *    This function returns the Linear Regression Slope.
   *
   *  - 'sma' (Simple Moving Average)
   *
   *    This function returns the Simple Moving Average indicator.
   *    A simple moving average (SMA) calculates the average of a selected range
   *    of prices, usually closing prices, by the number of periods in that range. (source: Investopedia)
   *
   *  - 'splitadjusted' (Split Adjusted Data)
   *
   *    Split adjusted refers to how historical stock prices are portrayed in the event that
   *    a company has issued a stock split for its shares in the past. When reviewing price data,
   *    whether in tables or on charts, split adjusted data will reflect the increase in price
   *    as if there had been no split in the shares. (source: Investopedia)
   *
   *  - 'stochastic' (Stochastic Technical Indicator)
   *
   *    This function returns Stochastic values.
   *    an indicator that measures the relationship between an issue's closing price and
   *    its price range over a predetermined period of time. (source: Investopedia)
   *
   *  - 'volatility' (Volatility)
   *
   *     This function returns the Volatility, a statistical measure of the dispersion
   *     of returns for a given security or market index.
   *
   *  - 'wma' (Weighted Moving Average)
   *
   *    This function returns the Weighted Moving Average technical indicator.
   *    A Weighted Moving Average puts more weight on recent data and less on past data.
   *    This is done by multiplying each bar’s price by a weighting factor.
   *    Because of its unique calculation, WMA will follow prices more closely than a
   *    corresponding Simple Moving Average. (source: Fidelity)
   *
   */
  function: T
  /**
   *  The number of data points used to calculate each moving average value. Valid range from 2 to 100000 with the default value – 50.
   */
  period?: number
}

interface EHDTechnicalsSplitAdjustedOnlyConfigOption {
  /**
   * Default value is ‘0’. By default, we calculate data for some functions by closes adjusted with splits and dividends. If you need to calculate the data by closes adjusted only with splits, set this parameter to ‘1’. Works with the following functions: sma, ema, wma, volatility, rsi, slope, and macd.
   */
  splitadjustedOnly?: boolean
}

type EHDTechnicalsSplitAdjustedOnlyConfig<T> = T extends
  | 'sma'
  | 'ema'
  | 'wma'
  | 'volatility'
  | 'rsi'
  | 'slope'
  | 'macd'
  ? EHDTechnicalsSplitAdjustedOnlyConfigOption
  : {}

type EHDTechnicalsStochasticConfig<T> = T extends 'stochastic'
  ? EHDStochasticTechnicalIndicatorOptions
  : {}

type EHDTechnicalsMacdConfig<T> = T extends 'macd'
  ? EHDMacdTechnicalIndicatorOptions
  : {}

interface EHDStochasticTechnicalIndicatorOptions {
  /**
   *  Fast K-period, the default value is 14. Valid range from 2 to 100000.
   */
  fastKperiod?: number
  /**
   *  Slow K-period, the default value is 3. Valid range from 2 to 100000.
   */
  slowKperiod?: number
  /**
   *  Slow D-period, the default value is 3. Valid range from 2 to 100000.
   */
  slowDperiod?: number
}

interface EHDMacdTechnicalIndicatorOptions {
  /**
   *  the default value is 12. Valid range from 2 to 100000.
   */
  fastPeriod?: number
  /**
   *  the default value is 26. Valid range from 2 to 100000.
   */
  slowPeriod?: number
  /**
   *  the default value is 9. Valid range from 2 to 100000.
   */
  signalPeriod?: number
}

type TechnicalsReturnType<
  T extends EHDTechnicalIndicatorFunction
> = T extends 'adx'
  ? EHDTechnicalADX[]
  : T extends 'splitadjusted'
  ? Omit<EHDEndOfDayPrice, 'adjusted_close'>[]
  : T extends 'sma'
  ? EHDTechnicalSMA[]
  : T extends 'avgvol'
  ? EHDTechnicalAverageVolume[]
  : T extends 'avgvolccy'
  ? EHDTechnicalAverageVolumeByPrice[]
  : T extends 'ema'
  ? EHDTechnicalEMA[]
  : T extends 'wma'
  ? EHDTechnicalWMA[]
  : T extends 'volatility'
  ? EHDTechnicalVolatility[]
  : T extends 'rsi'
  ? EHDTechnicalRSI[]
  : T extends 'slope'
  ? EHDTechnicalSlope[]
  : T extends 'dmi'
  ? EHDTechnicalDMI[]
  : T extends 'macd'
  ? EHDTechnicalMACD[]
  : T extends 'stochastic'
  ? EHDTechnicalStochastic[]
  : AnyObject

export interface EHDTechnicalsModule {
  /**
   *
   * The Technical Indicator API is available under ‘All World Extended’ and ‘All-In-One’ data packages.
   * Each Technical API request consumes 5 API calls.
   *
   * @param config
   *
   */
  technicals: <T extends EHDTechnicalIndicatorFunction>(
    config: EHDTechnicalsConfig<T> &
      EHDTechnicalsSplitAdjustedOnlyConfig<T> &
      EHDTechnicalsMacdConfig<T> &
      EHDTechnicalsStochasticConfig<T>
  ) => Promise<TechnicalsReturnType<T>>
}
