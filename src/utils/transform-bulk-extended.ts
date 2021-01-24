export default function transformBulkExtended({
  extended,
  ...options
}: AnyObject & { extended?: boolean }) {
  if (extended) {
    return {
      filter: 'extended',
      ...options,
    };
  }
  return options;
}
