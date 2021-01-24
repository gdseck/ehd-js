import request from '@/core/request';
import { EHDIndexConstituentsModule } from '@/types/modules/index-constituents';
import { FUNDAMENTALS_ENDPOINT } from '@/utils/constants';

const indexConstituents: EHDIndexConstituentsModule = {
  indexConstituents: (code: string) => {
    return request(`${FUNDAMENTALS_ENDPOINT}/${code}.INDX`, {}, []);
  },
};

export default indexConstituents;
