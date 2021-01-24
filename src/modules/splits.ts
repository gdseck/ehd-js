import codeEndpointApiRequest from '@/utils/code-endpoint-api-request';
import { SPLITS_ENDPOINT } from '@/utils/constants';
import { EHDSplitsModule } from '@/types/modules/splits';

const splits: EHDSplitsModule = {
  splits: codeEndpointApiRequest(SPLITS_ENDPOINT),
};

export default splits;
