import codeEndpointApiRequest from '@/utils/code-endpoint-api-request';
import { SHORT_INTEREST_ENDPOINT } from '@/utils/constants';
import { EHDShortInterestModule } from '@/types/modules/short-interest';

const shortInterest: EHDShortInterestModule = {
  shortInterest: codeEndpointApiRequest(SHORT_INTEREST_ENDPOINT),
};

export default shortInterest;
