import request from '@/core/request';
import { EOD_PRICE_ENDPOINT } from '@/utils/constants';
import { EHDBondPriceModule } from '@/types/modules/bond-price';

const bondPrice: EHDBondPriceModule = {
  bondPrice: ({ isin, ...options }) => {
    return request(`${EOD_PRICE_ENDPOINT}/${isin}.BOND`, options);
  },
};

export default bondPrice;
