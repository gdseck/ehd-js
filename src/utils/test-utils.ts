export const TODAY_DATE = '2021-01-05';

export const testDate = (function () {
  let date = TODAY_DATE;
  return {
    get: () => {
      return date;
    },
    set: (ds: string) => {
      date = ds;
    },
  };
})();
