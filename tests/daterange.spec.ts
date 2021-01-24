import parseDateString from '../src/utils/parse-date-string'
import { testDate, TODAY_DATE } from '../src/utils/test-utils'

jest.mock('@/utils/today')

// TODAY_DATE === '2021-01-05'

describe('parseDate', () => {
  test('custom date', () => {
    expect(parseDateString('2020-12-24')).toEqual('2020-12-24')
  })

  test('D', () => {
    expect(parseDateString('D')).toEqual(testDate.get())
  })

  test('D-1', () => {
    expect(parseDateString('D-1')).toEqual('2021-01-04')
  })

  test('D-7', () => {
    expect(parseDateString('D-7')).toEqual('2020-12-29')
  })

  test('D+1', () => {
    expect(parseDateString('D+1')).toEqual('2021-01-06')
  })

  test('D+1 end of month', () => {
    testDate.set('2021-01-31')
    expect(parseDateString('D+1')).toEqual('2021-02-01')
    testDate.set(TODAY_DATE)
  })

  test('W', () => {
    expect(parseDateString('W')).toEqual(TODAY_DATE)
  })

  test('W-1', () => {
    expect(parseDateString('W-1')).toEqual('2020-12-29')
  })

  test('W+1', () => {
    expect(parseDateString('W+1')).toEqual('2021-01-12')
  })

  test('M', () => {
    expect(parseDateString('M')).toEqual('2021-01-01')
  })

  test('M (trailing)', () => {
    expect(parseDateString('M', true)).toEqual('2021-01-31')
  })

  test('M-1', () => {
    expect(parseDateString('M-1')).toEqual('2020-12-05')
  })

  test('M-14', () => {
    expect(parseDateString('M-14')).toEqual('2019-11-05')
  })

  test('M+1', () => {
    expect(parseDateString('M+1')).toEqual('2021-02-05')
  })

  test('Y', () => {
    expect(parseDateString('Y')).toEqual('2021-01-01')
  })

  test('Y (trailing)', () => {
    expect(parseDateString('Y', true)).toEqual('2021-12-31')
  })

  test('Y-1', () => {
    expect(parseDateString('Y-1')).toEqual('2020-01-05')
  })

  test('Y+1', () => {
    expect(parseDateString('Y+1')).toEqual('2022-01-05')
  })

  test('Q', () => {
    expect(parseDateString('Q')).toEqual('2021-03-31')
  })

  test('Q-1', () => {
    expect(parseDateString('Q-1')).toEqual('2020-12-31')
  })

  test('Q+1', () => {
    expect(parseDateString('Q+1')).toEqual('2021-06-30')
  })
})
