import {
  EHDCalendarData,
  EHDEarnings,
  EHDEarningsTrend,
  EHDIPO,
  EHDSplit
} from '../model'
import {
  EHDDateRangeConfig,
  EHDFormatConfig,
  EHDSymbolsConfig
} from '../modules/shared'

interface EHDUpcomingEarningsConfig
  extends EHDDateRangeConfig,
    EHDFormatConfig,
    EHDSymbolsConfig {}

interface EHDEarningsTrendConfig extends EHDSymbolsConfig, EHDFormatConfig {}

interface EHDUpcomingIposConfig extends EHDDateRangeConfig, EHDFormatConfig {}

interface EHDUpcomingSplitsConfig extends EHDDateRangeConfig, EHDFormatConfig {}

export interface EHDCalendarModule {
  earningsTrends: (
    config: EHDEarningsTrendConfig &
      Required<Pick<EHDEarningsTrendConfig, 'symbols'>>
  ) => Promise<
    EHDCalendarData<{ trends: EHDEarningsTrend[] }> & { type: 'Trends' }
  >
  upcomingEarnings: (
    config?: EHDUpcomingEarningsConfig
  ) => Promise<
    EHDCalendarData<{ earnings: EHDEarnings[] }> & { type: 'Earnings' }
  >
  upcomingIpos: (
    config?: EHDUpcomingIposConfig
  ) => Promise<EHDCalendarData<{ splits: EHDIPO[] }> & { type: 'IPOs' }>
  upcomingSplits: (
    config?: EHDUpcomingSplitsConfig
  ) => Promise<EHDCalendarData<{ splits: EHDSplit[] }> & { type: 'Splits' }>
}
