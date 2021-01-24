import { EHDGovernmentBondIdentifier } from '@/types/modules/end-of-day-price'

export default (code: string | EHDGovernmentBondIdentifier) => {
  let result = ''
  if (typeof code === 'string') {
    result = code
  } else {
    result = `${code.countryCode}${code.period}`
  }
  return result.endsWith('GBOND') ? result : `${result}.GBOND`
}
