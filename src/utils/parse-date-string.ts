import PeriodError from '@/utils/period-error'
import today from '@/utils/today'

const DECEMBER = 12
const SEPTEMBER = 9
const JUNE = 6
const MARCH = 3

type PeriodType = 'D' | 'W' | 'M' | 'Q' | 'Y'

function parseDateString(
  dateString: string,
  trailing: boolean = false
): string {
  const RELATIVE_DATE_REGEX = /([QYMWD])([+\-])?(\d)?/gm
  const DATE_REGEX = /(\d\d\d\d)-(0[0-9]|1[012])-([0-3]\d)/

  const isValidRelativeDate = RELATIVE_DATE_REGEX.test(dateString.toUpperCase())
  const isValidDate = DATE_REGEX.test(dateString)

  if (!isValidRelativeDate && !isValidDate) {
    throw new PeriodError(`Invalid period format passed: ${dateString}`)
  }

  if (isValidRelativeDate) {
    return parsePeriod(dateString.toUpperCase(), trailing)
  }

  return dateString
}

function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0)
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1)
}

function getCurrentYear(): number {
  return new Date().getFullYear()
}

function getCurrentMonth(): number {
  return new Date().getMonth()
}

function parsePeriod(period: string, trailing: boolean = false): string {
  const currentDate = today()
  const modifier = ModifierFnFactory(period)

  const currYear = getCurrentYear()
  const currMonth = getCurrentMonth()

  const parse: Record<PeriodType, AnyFunction> = {
    Y: function () {
      if (!hasModifier(period)) {
        return trailing
          ? getLastDayOfMonth(currYear, 11)
          : getFirstDayOfMonth(currYear, 0)
      }
      currentDate.setFullYear(modifier(currYear))
      return currentDate
    },
    M: function () {
      if (!hasModifier(period)) {
        return trailing
          ? getLastDayOfMonth(currYear, currMonth)
          : getFirstDayOfMonth(currYear, currMonth)
      }
      currentDate.setMonth(modifier(currMonth))
      return currentDate
    },
    W: function () {
      currentDate.setDate(modifier(currentDate.getDate(), 7))
      return currentDate
    },
    D: function () {
      currentDate.setDate(modifier(currentDate.getDate()))
      return currentDate
    },
    Q: function () {
      currentDate.setDate(1)
      setCurrentQuarterEnd(currentDate)
      currentDate.setMonth(modifier(currentDate.getMonth(), 3))

      return getLastDayOfMonth(
        currentDate.getFullYear(),
        currentDate.getMonth()
      )
    }
  }

  const resultDate = parse[period[0] as PeriodType]()
  return toValidDateString(resultDate)
}

function hasModifier(period: string) {
  return period.length > 1
}

function ModifierFnFactory(period: string) {
  const modifierAmount = hasModifier(period) ? Number(period.substring(2)) : 0
  const isPlus = hasModifier(period) && period.charAt(1) === '+'

  return function (nr: number, base: number = 1) {
    if (isPlus) {
      return nr + modifierAmount * base
    }
    return nr - modifierAmount * base
  }
}

function setCurrentQuarterEnd(date: Date) {
  date.setMonth(getCurrentQuarterEndMonth(date.getMonth()) - 1)
  return getLastDayOfMonth(date.getFullYear(), date.getMonth())
}

function setCurrentQuarterStart(date: Date) {
  date.setMonth(getCurrentQuarterStartMonth(date.getMonth()) - 1)
  console.log(date)
  const d = getFirstDayOfMonth(date.getFullYear(), date.getMonth())
  console.log(d)
  return d
}

function getCurrentQuarterEndMonth(currentMonth: number) {
  const adjMonth = currentMonth + 1

  if (adjMonth < MARCH) {
    return MARCH
  }

  if (adjMonth < JUNE) {
    return JUNE
  }

  if (adjMonth < SEPTEMBER) {
    return SEPTEMBER
  }

  return DECEMBER
}

function getCurrentQuarterStartMonth(currentMonth: number) {
  const adjMonth = currentMonth + 1

  if (adjMonth < MARCH) {
    return DECEMBER
  }

  if (adjMonth < JUNE) {
    return MARCH
  }

  if (adjMonth < SEPTEMBER) {
    return JUNE
  }

  return SEPTEMBER
}

function toValidDateString(date: Date): string {
  const to2DigitsDate = (nr: number) => {
    return nr < 10 ? '0' + nr : nr
  }
  return `${date.getFullYear()}-${to2DigitsDate(
    date.getMonth() + 1
  )}-${to2DigitsDate(date.getDate())}`
}

export default parseDateString
