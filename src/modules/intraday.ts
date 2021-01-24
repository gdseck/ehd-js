import codeEndpointApiRequest from '@/utils/code-endpoint-api-request';
import transformUnixDate from '@/utils/transform-unix-date';
import { INTRADAY_ENDPOINT } from '@/utils/constants';

import { EHDIntradayModule } from '@/types/modules/intraday';

const intraday: EHDIntradayModule = {
  intraday: codeEndpointApiRequest(INTRADAY_ENDPOINT, [transformUnixDate]),
};

export default intraday;
