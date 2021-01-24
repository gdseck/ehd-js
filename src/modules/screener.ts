import request from '@/core/request';
import { SCREENER_ENDPOINT } from '@/utils/constants';
import { EHDScreenerModule } from '@/types/modules/screener';
import {
  EHDScreenerFilter,
  EHDScreenerOperation,
  EHDScreenerSortKey,
} from '@/types/literals';

const screener: EHDScreenerModule = {
  screener: (config) => {
    const options: AnyObject = { ...config };
    const { filters, signals, sort } = config;

    if (filters) {
      options.filters = JSON.stringify(
        (Object.keys(filters) as EHDScreenerFilter[]).reduce((result, key) => {
          const filter = filters[key] as [
            EHDScreenerOperation,
            number | string
          ];
          result.push([key, ...filter]);
          return result;
        }, [] as [string, string, string | number][])
      );
    }

    if (signals) {
      options.signals = signals.join(',');
    }

    if (sort) {
      options.sort = (Object.keys(sort) as EHDScreenerSortKey[])
        .map((key) => `${key}.${sort[key]}`)
        .join(',');
    }

    return request(`${SCREENER_ENDPOINT}`, options, []);
  },
};

export default screener;
