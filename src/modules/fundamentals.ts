import request from '@/core/request';
import codeEndpointApiRequest from '@/utils/code-endpoint-api-request';
import { FUNDAMENTALS_ENDPOINT } from '@/utils/constants';
import { EHDFundamentalsModule } from '@/types/modules/fundamentals';

const fundamentals: EHDFundamentalsModule = {
  fundamentals: Object.assign(codeEndpointApiRequest(FUNDAMENTALS_ENDPOINT), {
    etf: (code: string) => {
      return request(`${FUNDAMENTALS_ENDPOINT}/${code}`, {}, []);
    },
    mutualFund: (codeOrIsin: string) => {
      return request(`${FUNDAMENTALS_ENDPOINT}/${codeOrIsin}`, {}, []);
    },
    stock: (code: string) => {
      return request(`${FUNDAMENTALS_ENDPOINT}/${code}`, {}, []);
    },
  }),
};

export default fundamentals;
