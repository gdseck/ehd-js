import { EHDExchangeSymbolListModule } from '@/types/modules/exchange-symbol-list';
import codeEndpointApiRequest from '@/utils/code-endpoint-api-request';
import { EXCHANGE_SYMBOL_LIST_ENDPOINT } from '@/utils/constants';

const exchangeSymbolList: EHDExchangeSymbolListModule = {
  exchangeSymbolList: codeEndpointApiRequest(EXCHANGE_SYMBOL_LIST_ENDPOINT),
};

export default exchangeSymbolList;
