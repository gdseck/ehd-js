import request from '@/core/request';

import transformDateRange from '@/utils/transform-date';
import transformSymbols from '@/utils/transform-symbols';

import {
  CALENDAR_ENDPOINT,
  EARNINGS_ENDPOINT,
  IPOS_ENDPOINT,
  SPLITS_ENDPOINT,
  TRENDS_ENDPOINT,
} from '@/utils/constants';

import { EHDCalendarModule } from '@/types/modules/calendar';

const calendar: EHDCalendarModule = {
  earningsTrends: (config) => {
    return request(`${CALENDAR_ENDPOINT}/${TRENDS_ENDPOINT}`, config, [
      transformDateRange,
      transformSymbols,
    ]);
  },
  upcomingEarnings: (config) => {
    return request(`${CALENDAR_ENDPOINT}/${EARNINGS_ENDPOINT}`, config, [
      transformDateRange,
      transformSymbols,
    ]);
  },
  upcomingIpos: (config) => {
    return request(`${CALENDAR_ENDPOINT}/${IPOS_ENDPOINT}`, config);
  },
  upcomingSplits: (config) => {
    return request(`${CALENDAR_ENDPOINT}/${SPLITS_ENDPOINT}`, config);
  },
};

export default calendar;
