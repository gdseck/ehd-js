import { EHDMacroEconomicIndicatorModule } from '@/types/modules/macro-economics';
import request from '@/core/request';
import { MACRO_ECONOMIC_ENDPOINT } from '@/utils/constants';

const macroEconomics: EHDMacroEconomicIndicatorModule = {
  macroEconomic: ({ country, ...options }) => {
    return request(`${MACRO_ECONOMIC_ENDPOINT}/${country}`, options, []);
  },
};

export default macroEconomics;
