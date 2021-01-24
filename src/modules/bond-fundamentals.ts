import request from '@/core/request';

import { BOND_FUNDAMENTALS_ENDPOINT } from '@/utils/constants';
import { EHDBondFundamentalsModule } from '@/types/modules/bond-fundamentals';

const bondFundamentals: EHDBondFundamentalsModule = {
  bondFundamentals: (isinOrCusip) => {
    return request(`${BOND_FUNDAMENTALS_ENDPOINT}/${isinOrCusip}`, {}, []);
  },
};

export default bondFundamentals;
