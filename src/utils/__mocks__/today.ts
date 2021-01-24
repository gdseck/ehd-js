import { testDate } from '@/utils/test-utils';

export default function today() {
  return new Date(testDate.get());
}
