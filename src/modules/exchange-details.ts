import codeEndpointApiRequest from '@/utils/code-endpoint-api-request';
import { EHDExchangeDetailsModule } from '@/types/modules/exchange-details';
import { EXCHANGE_DETAILS_ENDPOINT } from '@/utils/constants';

const exchangeDetails: EHDExchangeDetailsModule = {
  exchangeDetails: codeEndpointApiRequest(EXCHANGE_DETAILS_ENDPOINT),
};

export default exchangeDetails;
