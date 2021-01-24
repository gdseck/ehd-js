import { EHDExchangeListModule } from '@/types/modules/exchanges-list';
import request from '@/core/request';
import { EXCHANGES_LIST_ENDPOINT } from '@/utils/constants';

const exchangesList: EHDExchangeListModule = {
  exchangesList: (config) => {
    return request(`${EXCHANGES_LIST_ENDPOINT}`, config, []);
  },
};

export default exchangesList;
