import codeEndpointApiRequest from '@/utils/code-endpoint-api-request';
import { DIVIDENDS_ENDPOINT } from '@/utils/constants';
import { EHDDividendsModule } from '@/types/modules/dividends';

const dividends: EHDDividendsModule = {
  dividends: codeEndpointApiRequest(DIVIDENDS_ENDPOINT),
};

export default dividends;
