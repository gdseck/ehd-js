export default class PeriodError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PeriodError';
  }
}
