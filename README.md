# EOD Historical Data JavaScript API wrapper

A JavaScript wrapper around the [EOD Historical Data](https://eodhistoricaldata.com/) API. This library comes with TypeScript support.

Can be used with NodeJS or with client-side frameworks.

## Getting started

### Installation

Install with [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/get-npm)

```bash
npm install ehd-js
```

or

```bash
yarn add ehd-js
```

Once installed, you can import the module.

```js
import ehd from 'ehd-js'
```

or

```js
const ehd = require('ehd-js')
```

### Prerequisites

To use this package you will need an API token for EOD Historical Data. You can check out available API's and pricing on their [website](https://eodhistoricaldata.com/).

Once you have an API token, you can set it up for usage two ways:

1. Add an `.env` file

```
EHD_API_KEY=YOUR_TOKEN
```

_notes_

- Be mindful not to publicise your token. So when adding a project to github for instance, make sure to add `.env` files to `.gitignore` or consider using a `.env.local` file.
- To make the library pick up the variable described in your `.env` file you might need to use [dotenv](https://github.com/motdotla/dotenv) library.

2. Use the built-in `setToken` method before calling any of the `ehd` methods

```js
import ehd from 'ehd-js'

ehd.setToken(YOUR_TOKEN)

ehd.endOfDayPrice({
  // ...
})
```

## Usage

Here we will go over all the methods provided by the `ehd` module. All functionality models the EOD Historical Data API closely. So for more information or references, be sure to go through the [official API documentation](https://eodhistoricaldata.com/financial-apis/).

This library also has full TypeScript support. To inspect the types, take a look at `src/types/model.d.ts` and `src/types/literals.d.ts`.

Every `ehd` method returns a Promise.

### Overview

| Method              | Sub Methods               |
| ------------------- | ------------------------- |
| [`bondPrice`](#bondPrice)         |                           |
| `bondFundamentals`  |                           |
| `bulkEodData`       |                           |
| `calendar`          |                           |
| `dividends`         |                           |
| `endOfDayPrice`     | `ecbExchangeRates`        |
|                     | `euribor`                 |
|                     | `euriborFutures`          |
|                     | `governmentBond`          |
|                     | `libor`                   |
|                     | `norgesBankExchangeRates` |
| `fundamentals`      | `etf`                     |
|                     | `mutualFund`              |
|                     | `stock`                   |
| `indexConstituents` |                           |
| `intraday`          |                           |
| `livePrices`        |                           |
| `macroEconomics`    |                           |
| `options`           |                           |
| `search`            |                           |
| `screener`          |                           |
| `shortInterest`     |                           |
| `splits`            |                           |
| `technicals`        |                           |
| `user`              |                           |

### Shared configs

Some fields are used by different API's, like `format` and `from` and `to` date fields. This section will discuss those fields first. When using the library inside a TypeScript project you can rely on Intellisense to see which modules support which fields. For JavaScript only projects the official documentation can be consulted.

#### format

Most API's allow you to select the format (`csv` or `json`) in which the data is returned. Since this is a JavaScript project, all data will be returned in `json` format by default.

```js
import ehd from 'ehd-js`

ehd.endOfDayPrice({
  code: 'AAPL.US',
  fmt: 'csv'
})

ehd.endOfDayPrice({
  code: 'AAPL.US',
  fmt: 'json' // default, can be omitted
})
```

#### Date range (`from` and `to`)

All time-series API's allow you to define a date range using the `from` and `to` parameters.
Those params accept dates in the `YYYY-MM-DD` format.

`ehd-js` allows for that standard but builds a helper on top of that.
When using `to` or `from` you can also use values like `d-4`, `y+1`, `m`, `m-2`, `w-6`, `q`, `q-1` etc...

The 5 allowed time periods are `d` (Day), `w` (Week), `m` (Month), `y` (Year) or `q` (quarter).

\* All below examples will treat 2021-01-05 as the current date  
\*\* These helpers are subject to improvement over the near future

_D_

`from: 'D'` will transform to today's date.  
`from: 'D-1'` will transform to yesterday's date.  
`from: 'D-5'` will equal 5 days ago  
...etc

the same works in the other direction:
'D+1' is tomorrow's date, 'D+5' is a week from now, ...

| Base period | Example |     Result |
| :---------- | :-----: | ---------: |
| D           |    D    | 2021-01-05 |
|             |   D-1   | 2021-01-04 |
|             |   D-7   | 2020-12-29 |
|             |   D+1   | 2021-01-06 |

_W_

'W' will revert to today's date, 'W-1' will be today's date minus 7 days, etc

| Base period | Example |     Result |
| :---------- | :-----: | ---------: |
| W           |    W    | 2021-01-05 |
|             |   W-1   | 2020-12-29 |
|             |   W+1   | 2021-01-12 |

_M_

'M' will revert to start of the current month when used as the `from` param, to the end of the current month when used as the `to` param.  
'M-1' will be today's date a month ago, etc

| Base period | Example  |     Result |
| :---------- | :------: | ---------: |
| M           | M (from) | 2021-01-01 |
|             |  M (to)  | 2021-01-31 |
|             |   M-1    | 2020-12-05 |
|             |   M-14   | 2019-11-05 |
|             |   M+1    | 2021-02-05 |

_Y_

When using `Y` without modifier as the `from` date, it will transform to the start of the current month. As the `to` date it will turn into the end of the current month.
With modifier, it will behave the in the same way as `D`, `W`

| Base period | Example  |     Result |
| :---------- | :------: | ---------: |
| Y           | Y (from) | 2021-01-01 |
|             |  Y (to)  | 2021-12-31 |
|             |   Y+1    | 2022-01-05 |

_Q_

This works slightly different than the others:

'Q': takes the end of the current quarter  
'Q-1': the end of last quarter. For example, if today is 2020-12-01, 'Q-1' will turn into
2020-09-30

Quarter end dates are as follows:
03-31, 06-30, 09-30, 12-31

| Base period | Example |     Result |
| :---------- | :-----: | ---------: |
| Q           |    Q    | 2021-03-31 |
|             |   Q-1   | 2020-12-31 |
|             |   Q+1   | 2021-06-30 |

```js
import ehd from 'ehd-js'

// Fetch end of day prices for the VWCE ETF from 3 months ago to a week ago.

let prices = await ehd.endOfDayPrice({
  code: 'VWCE.XETRA',
  from: 'm-3',
  to: 'w-1'
})

// Fetch end of day prices for the last three days

prices = await ehd.endOfDayPrice({
  code: 'VWCE.XETRA',
  from: 'd-3'
})

// Fetch end of day prices for the last quarter

prices = await ehd.endOfDayPrice({
  code: 'VWCE.XETRA',
  from: 'q-2',
  to: 'q-1'
})
```

#### order

Timeseries data can be requested in `d` (descending) or `a` (ascending) order. By default, data is returned in ascending order.

```js
import ehd from 'ehd-js'

let prices = await ehd.endOfDayPrice({
  code: 'MSFT.US',
  order: 'd'
})
```

### <a name="bondPrice"></a>bondPrice

[official docs](https://eodhistoricaldata.com/financial-apis/bonds-fundamentals-and-historical-api/)

_cost_: 1 API call / symbol

Bond prices can be fetched using the bond's ISIN ID. When using TypeScript, prices will have the correct `EHDBondPrice[]` type.

| option | required | type                                               | default  |
| ------ | -------- | -------------------------------------------------- | -------- |
| isin   | _yes_    | string                                             |          |
| period | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly) | `"d"`    |
| order  | _no_     | `"a"` (ascending) \| `"d"` (descending)            | `"a"`    |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |
| fmt    | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd'

const prices = await ehd.bondPrice({
  isin: 'US910047AG49'
})
```

It is also possible to fetch historical bond prices using the `endOfDayPrice` method, but in that case you will need to add the `.BOND` affix and the result will not have the correct type.

### bondFundamentals

[official docs](https://eodhistoricaldata.com/financial-apis/bonds-fundamentals-and-historical-api/)  
cost: 1 API call / symbol

Bond fundamentals can be fetched with the bond's ISIN or CUSIP. Unlike most methods this one does not accept a config object as param but only a single string.

```js
import ehd from 'ehd'

const fundamentals = await ehd.bondFundamentals('US910047AG49')
```

### bulkEodData

[official docs](https://eodhistoricaldata.com/financial-apis/bulk-api-eod-splits-dividends/)  
cost: 1 API call / symbol OR 100 API calls / exchange

Bulk EOD, splits and dividends data can be fetched for a single exchange or multiple symbols.

| option   | required | type                                   | default      |
| -------- | -------- | -------------------------------------- | ------------ |
| code     | _no_     | string \| EHDExchangeCode              | `"US"`       |
| type     | _no_     | `"eod"` \| `"splits"` \| `"dividends"` | `"eod"`      |
| date     | _no_     | `YYYY-MM-DD`                           | today's date |
| symbols  | _no_     | string \| string[]                     |
| extended | _no_     | boolean                                | `false`      |
| fmt      | _no_     | `"csv"` \| `"json"`                    | `"json"`     |

```js
import ehd from 'ehd-js'

// Fetching EOD data for all symbols part of EuroNext Brussels

let data = await ehd.bulkEodData({
  code: 'BR',
  type: 'eod' // default
})

// When not passing a code, the 'US' exchange will be the default

data = await ehd.bulkEodData()

// Fetch today's splits for the XETRA exchange

data = await ehd.bulkEodData({
  type: 'splits',
  code: 'XETRA'
})

// Fetch today's dividends for the NASDAQ

data = await ehd.bulkEodData({
  type: 'dividends',
  code: 'NASDAQ'
})

// Fetch bulk EOD data for a specific date

data = await ehd.bulkEodData({
  date: '2020-12-05'
})

// Fetch extended EOD data

data = await ehd.bulkEodData({
  extended: true
})

// Fetch bulk data for specific symbols

data = await ehd.bulkEodData({
  symbols: ['EURN.BR', 'VWCE.XETRA', 'MSFT.US', 'AAPL.US']
})
```

### earningsTrends

[official docs](https://eodhistoricaldata.com/financial-apis/calendar-upcoming-earnings-ipos-and-splits/#Earnings_Trends_API)

_cost_: 1 API call / symbol  
_requires_: Calendar Data Feed

Fetch earnings trends using one or more symbols

| option  | required | type                | default  |
| ------- | -------- | ------------------- | -------- |
| symbols | _yes_    | string \| string[]  |
| fmt     | _no_     | `"csv"` \| `"json"` | `"json"` |

```js
import ehd from 'ehd-js'

let data = await ehd.earningsTrends({
  symbols: 'AAPL.US'
})

data = await ehd.earningsTrends({
  symbols: ['AAPL.US', 'MSFT.US']
})
```

### upcomingEarnings

[official docs](https://eodhistoricaldata.com/financial-apis/calendar-upcoming-earnings-ipos-and-splits/#Upcoming_Earnings_API)

_cost_: 1 API call / symbol  
_requires_: Calendar Data Feed

Use this method to fetch upcoming earnings.

| option  | required | type                                               | default  |
| ------- | -------- | -------------------------------------------------- | -------- |
| symbols | _no_     | string \| string[]                                 |
| from    | _no_     | `YYYY-MM-DD` or shorthand (see date range section) | `"d"`    |
| to      | _no_     | `YYYY-MM-DD` or shorthand (see date range section) | `"d+7"`  |
| fmt     | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

// Fetch all upcoming earnings across multiple exchanges

let data = await ehd.upcomingEarnings()

// Fetch upcoming earnings for one or more symbols

data = await ehd.upcomingEarnings({
  symbols: 'AAPL.US',
  to: '2021-12-31'
})

data = await ehd.upcomingEarnings({
  symbols: ['AAPL.US', 'MSFT.US']
})
```

### upcomingIpos

[official docs](https://eodhistoricaldata.com/financial-apis/calendar-upcoming-earnings-ipos-and-splits/#Upcoming_IPOs_API)

_cost_: 1 API call  
_requires_: Calendar Data Feed

Fetch data for upcoming IPOs. This API only allows for a date range.

| option | required | type                                               | default  |
| ------ | -------- | -------------------------------------------------- | -------- |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) | `"d"`    |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) | `"d+7"`  |
| fmt    | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

// Fetch all upcoming IPOs for the next 7 days

let data = await ehd.upcomingIpos()

// Fetch all upcoming IPOs for the next 3 weeks

data = await ehd.upcomingIpos({
  to: 'w+3'
})
```

### upcomingSplits

[official docs](https://eodhistoricaldata.com/financial-apis/calendar-upcoming-earnings-ipos-and-splits/#Upcoming_Splits_API)

_cost_: 1 API call  
_requires_: Calendar Data Feed

Fetch data for upcoming IPO's. This API only allows for a date range.

| option | required | type                                               | default  |
| ------ | -------- | -------------------------------------------------- | -------- |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) | `"d"`    |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) | `"d+7"`  |
| fmt    | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

// Fetch all upcoming splits across all exchanges

let data = await ehd.upcomingSplits()

// Fetch upcoming splits for the next three weeks

data = await ehd.upcomingSplits({
  to: 'w+3'
})
```

### dividends

[official docs](https://eodhistoricaldata.com/financial-apis/api-splits-dividends/#Historical_Dividends_API)  
[example json response](https://eodhistoricaldata.com/api/div/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&from=2000-01-01&fmt=json)

_cost_: 1 API call / symbol

Fetch dividend data for a specific symbol. Adding `fmt: 'csv'` will only return date and dividend. Use `json` to receive extended data.

| option | required | type                                               | default  |
| ------ | -------- | -------------------------------------------------- | -------- |
| code   | _yes_    | string                                             |          |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| fmt    | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

// Fetch dividend data for Microsoft for the past two years

const data = await ehd.dividends({
  code: 'MSFT.US',
  from: 'y-2'
})
```

### endOfDayPrice

[official docs](https://eodhistoricaldata.com/financial-apis/api-for-historical-data-and-volumes/#Quick_Start)  
[example json response](https://eodhistoricaldata.com/api/eod/MCD.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&period=d&fmt=json)

_cost_: 1 API call / symbol

Historical end of day data can be fetched for any available code. Besides the shared date-range, format and order params, this API also accepts a period param: `d` (daily), `w` (weekly), `m` (monthly).

| option | required | type                                               | default  |
| ------ | -------- | -------------------------------------------------- | -------- |
| code   | _yes_    | string                                             |          |
| period | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly) | `"d"`    |
| order  | _no_     | `"a"` (ascending) \| `"d"` (descending)            | `"a"`    |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| fmt    | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

// Fetch historical weekly prices for the past year for the VWCE ETF

const data = await ehd.endOfDayPrice({
  code: 'VWCE.XETRA',
  from: 'y-1',
  period: 'w',
  order: 'd'
})
```

### Economic data

The `endOfDayPrice` method can also be used to fetch government bond data, exchange and interbank rates. To help with the construction of the codes, additional helper methods have been implemented.

#### governmentBond

[official docs](https://eodhistoricaldata.com/financial-apis/economic-data-api/#Government_Bonds)

_cost_: 1 API call  
_requires_ Fundamentals Data Feed

| option | required | type                                                | default  |
| ------ | -------- | --------------------------------------------------- | -------- |
| bond   | _yes_    | string \| `{ countryCode: string, period: string }` |          |
| period | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly)  | `"d"`    |
| order  | _no_     | `"a"` (ascending) \| `"d"` (descending)             | `"a"`    |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section)  |          |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section)  |          |
| fmt    | _no_     | `"csv"` \| `"json"`                                 | `"json"` |

```js
import ehd from 'ehd-js'

let data = await ehd.governmentBondPrice({
  bond: {
    countryCode: 'US',
    period: '10Y'
  },
  from: 'm-1'
})

data = await ehd.governmentBondPrice({
  bond: 'US10Y'
})
```

#### euribor

[official docs](https://eodhistoricaldata.com/financial-apis/economic-data-api/#LIBOR_EURIBOR_and_STIBOR)

_cost_: 1 API call  
_requires_ Fundamentals Data Feed

| option     | required | type                                               | default  |
| ---------- | -------- | -------------------------------------------------- | -------- |
| ratePeriod | _yes_    | `"1W"` \| `"1M"` \| `"3M"` \| `"6M"` \| `"12M"`    |          |
| period     | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly) | `"d"`    |
| order      | _no_     | `"a"` (ascending) \| `"d"` (descending)            | `"a"`    |
| from       | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| to         | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| fmt        | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.euribor({
  ratePeriod: '1W'
})
```

#### euriborFutures

[official docs](https://eodhistoricaldata.com/financial-apis/economic-data-api/#LIBOR_EURIBOR_and_STIBOR)

_cost_: 1 API call  
_requires_ Fundamentals Data Feed

| option | required | type                                               | default  |
| ------ | -------- | -------------------------------------------------- | -------- |
| period | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly) | `"d"`    |
| order  | _no_     | `"a"` (ascending) \| `"d"` (descending)            | `"a"`    |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| fmt    | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.euriborFutures({
  from: 'q-1'
})
```

#### libor

[official docs](https://eodhistoricaldata.com/financial-apis/economic-data-api/#LIBOR_EURIBOR_and_STIBOR)

_cost_: 1 API call  
_requires_ Fundamentals Data Feed

| option     | required | type                                                     | default  |
| ---------- | -------- | -------------------------------------------------------- | -------- |
| ratePeriod | _yes_    | `"1W"` \| `"1M"` \| `"2M"` \|`"3M"` \| `"6M"` \| `"12M"` |          |
| nomination | _yes_    | `"USD"` \| `"EUR"` \| `"GBP"` \|`"JPY"`                  |          |
| period     | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly)       | `"d"`    |
| order      | _no_     | `"a"` (ascending) \| `"d"` (descending)                  | `"a"`    |
| from       | _no_     | `YYYY-MM-DD` or shorthand (see date range section)       |          |
| to         | _no_     | `YYYY-MM-DD` or shorthand (see date range section)       |          |
| fmt        | _no_     | `"csv"` \| `"json"`                                      | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.libor({
  ratePeriod: '2M',
  nomination: 'EUR',
  fmt: 'csv'
})
```

#### stibor

[official docs](https://eodhistoricaldata.com/financial-apis/economic-data-api/#LIBOR_EURIBOR_and_STIBOR)

_cost_: 1 API call
_requires_ Fundamentals Data Feed

| option     | required | type                                               | default  |
| ---------- | -------- | -------------------------------------------------- | -------- |
| ratePeriod | _yes_    | `"1W"` \| `"1M"` \| `"2M"` \| `"3M"` \| `"6M"`     |          |
| period     | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly) | `"d"`    |
| order      | _no_     | `"a"` (ascending) \| `"d"` (descending)            | `"a"`    |
| from       | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| to         | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| fmt        | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.stibor({
  ratePeriod: '1M',
  from: 'y-3',
  period: 'w'
})
```

#### ecbExchangeRates

[official docs](https://eodhistoricaldata.com/financial-apis/economic-data-api/#ECB_Exchange_Rates)

_cost_: 1 API call  
_requires_ Fundamentals Data Feed

| option   | required | type                                                | default  |
| -------- | -------- | --------------------------------------------------- | -------- |
| currency | _yes_    | `"GBP"` \| `"JPY"` \| `"USD"` \| `"NOK"` \| `"SEK"` |          |
| period   | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly)  | `"d"`    |
| order    | _no_     | `"a"` (ascending) \| `"d"` (descending)             | `"a"`    |
| from     | _no_     | `YYYY-MM-DD` or shorthand (see date range section)  |          |
| to       | _no_     | `YYYY-MM-DD` or shorthand (see date range section)  |          |
| fmt      | _no_     | `"csv"` \| `"json"`                                 | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.ecbExchangeRates({
  currency: 'GBP',
  from: 'm-1',
  period: 'w'
})
```

#### norgesBankExchangeRates

[official docs](https://eodhistoricaldata.com/financial-apis/economic-data-api/#Norge_Bank_Exchange_Rates_NOK)

_cost_: 1 API call  
_requires_ Fundamentals Data Feed

| option   | required | type                                                | default  |
| -------- | -------- | --------------------------------------------------- | -------- |
| currency | _yes_    | `"GBP"` \| `"JPY"` \| `"USD"` \| `"EUR"` \| `"SEK"` |          |
| period   | _no_     | `"d"` (daily) \| `"w"` (weekly) \| `"m"` (monthly)  | `"d"`    |
| order    | _no_     | `"a"` (ascending) \| `"d"` (descending)             | `"a"`    |
| from     | _no_     | `YYYY-MM-DD` or shorthand (see date range section)  |          |
| to       | _no_     | `YYYY-MM-DD` or shorthand (see date range section)  |          |
| fmt      | _no_     | `"csv"` \| `"json"`                                 | `"json"` |

```js
// NorgesBank exchange rates

data = await ehd.norgesBankExchangeRates({
  currency: 'EUR'
})
```

### exchangeDetails

[official docs](https://eodhistoricaldata.com/financial-apis/exchanges-api-trading-hours-and-holidays/)

_cost_: 1 API call
_requires_: All World Extended Package or higher

Use this API to get detailed info for different exchanges.

| option | required | type                                               | default |
| ------ | -------- | -------------------------------------------------- | ------- |
| code   | _yes_    | `EHDExchangeCode`                                  |         |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |         |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |         |

```js
import ehd from 'ehd-js'

// Fetch exchange info for Euronext Brussels with market holidays data for the past three months

const data = await ehd.exchangeDetails({
  code: 'BR',
  from: 'm-3'
})
```

### exchangesList

[official docs](https://eodhistoricaldata.com/financial-apis/exchanges-api-list-of-tickers-and-trading-hours/)

_cost_: 1 API call

Use this method to get a full list of supported exchanges.

| option | required | type                | default  |
| ------ | -------- | ------------------- | -------- |
| fmt    | _no_     | `"csv"` \| `"json"` | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.exchangesList()
```

### exchangeSymbolList

[official docs](https://eodhistoricaldata.com/financial-apis/exchanges-api-list-of-tickers-and-trading-hours/)

_cost_: 1 API call

To get a full list of symbols for an exchange, use the `exchangeSymbolList` method.

| option | required | type                | default  |
| ------ | -------- | ------------------- | -------- |
| code   | _yes_    | `EHDExchangeCode`   |          |
| fmt    | _no_     | `"csv"` \| `"json"` | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.exchangeSymbolList({
  code: 'US'
})
```

### fundamentals

[official docs](https://eodhistoricaldata.com/financial-apis/stock-etfs-fundamental-data-feeds/)  
[example stock response](https://eodhistoricaldata.com/api/fundamentals/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX)  
[example etf response](https://eodhistoricaldata.com/api/fundamentals/VTI.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX)

_cost_: 1 API call  
_requires_: Fundamentals Data Feed

Get fundamentals data on stocks, ETFs and mutual funds.

You can either use the base `fundamentals` method. The caveat here is that the return type will be `any` since the data models differ between stocks, ETFs and mutual funds. To get the correct data type you'll need to cast it yourself.

| option | required | type   | default |
| ------ | -------- | ------ | ------- |
| code   | _yes_    | string |         |
| filter | _no_     | string |         |

```ts
import ehd from 'ehd-js'
import { EDHETFGeneralInfo, EHDStockFundamentals } from 'ehd-js/src/types/model'

let data = await ehd.fundamentals<EHDETFGeneralInfo>({
  code: 'VWCE.XETRA',
  filter: 'General'
})

data = await ehd.fundamentals<EHDStockFundamentals>({
  code: 'MSFT.US'
})
```

`fundamentals` also contains three submethods for each of the three fundamentals symbol types. Here the correct returned data types are built in but you can no longer use the `filter` option.

```ts
import ehd from 'ehd-js'

const stock = await ehd.fundamentals.stock('MSFT.US')
const eft = await ehd.fundamentals.etf('VWCE.XETRA')
const mutualFund = await ehd.fundamentals.mutualFund('SWPPX.US')
```

### indexConstituents

[official docs](https://eodhistoricaldata.com/financial-apis/stock-etfs-fundamental-data-feeds/#Index_Constituents_or_Index_Components_API)

Get info about an index, including a list of it's components

```js
import ehd from 'ehd-js'

// Fetch a list of supported indices using the virtual 'INDX' exchange

const supportedIndices = await ehd.exchangeSymbolList({
  code: 'INDX'
})

// Use an index code to fetch its related data

const indexInfo = await ehd.indexConsituents('GSCP')
```

### intraday

[official docs](https://eodhistoricaldata.com/financial-apis/intraday-historical-data-api/)  
[example response](https://eodhistoricaldata.com/api/intraday/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&interval=5m&fmt=json)

_cost_: 1 API call / symbol

Get historical intraday price data using this API.

This method accepts `from` and `to` parameters but instead of dates, the values should be UNIX times with UTC timezones (e.g. `1611340097` for `Mon Jan 19 1970 16:35:40 GMT+0100`). For ease of use you can still use the date shorthands (e.g. `d-5`, `w-1`).

You can choose between intervals of `1m` or `5m`

| option   | required | type                                                          | default  |
| -------- | -------- | ------------------------------------------------------------- | -------- |
| code     | _yes_    | string                                                        |          |
| from     | _no_     | UNIX timestamp (number) or shorthand (see date range section) |          |
| to       | _no_     | UNIX timestamp (number) or shorthand (see date range section) |          |
| interval | _no_     | `"1m"` \| `"5m"`                                              | `"1m"`   |
| fmt      | _no_     | `"csv"` \| `"json"`                                           | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.intraday({
  code: 'MSFT.US',
  interval: '5m',
  from: 1611340097,
  to: 'd'
})
```

### livePrices

[official docs](https://eodhistoricaldata.com/financial-apis/live-realtime-stocks-api/)

_cost_: 1 API call / symbol

Fetch live (delayed) stock price data using this API. You can fetch data for multiple tickers but it is recommended to limit the total amount to 20.

| option | required | type                | default  |
| ------ | -------- | ------------------- | -------- |
| code   | _yes_    | string              |          |
| s      | _no_     | string \| string[]  |          |
| fmt    | _no_     | `"csv"` \| `"json"` | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.livePrices({
  code: 'VWCE.XETRA',
  s: ['AAPL.US', 'MSFT.US']
})
```

### macroEconomics

[official docs](https://eodhistoricaldata.com/financial-apis/macroeconomics-data-and-macro-indicators-api/)

Get data for over 30 macroeconomic indicators.

| option    | required | type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | default             |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| country   | _yes_    | `EHDAlpha3IsoCountryCode`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                     |
| indicator | _no_     | `"population_total"` <br /> `"population_growth_annual"` <br /> `"inflation_consumer_prices_annual"` <br /> `"gdp_current_usd"` <br /> `"gdp_per_capita_usd"` <br /> `"gdp_growth_annual"` <br /> `"inflation_gdp_deflator_annual"` <br /> `"agriculture_value_added_percent_gdp"` <br /> `"industry_value_added_percent_gdp"` <br /> `"services_value_added_percent_gdp"` <br /> `"exports_of_goods_services_percent_gdp"` <br /> `"imports_of_goods_services_percent_gdp"` <br /> `"gross_capital_formation_percent_gdp"` <br /> `"net_migration"` <br /> `"gni_usd"` <br /> `"gni_per_capita_usd"` <br /> `"gni_ppp_usd"` <br /> `"gni_per_capita_ppp_usd"` <br /> `"income_share_lowest_twenty"` <br /> `"life_expectancy"` <br /> `"fertility_rate"` <br /> `"prevalence_hiv_total"` <br /> `"co2_emissions_tons_per_capita"` <br /> `"surface_area_km"` <br /> `"poverty_poverty_lines_percent_population"` <br /> `"revenue_excluding_grants_percent_gdp"` <br /> `"cash_surplus_deficit_percent_gdp"` <br /> `"startup_procedures_register"` <br /> `"market_cap_domestic_companies_percent_gdp"` <br /> `"mobile_subscriptions_per_hundred"` <br /> `"internet_users_per_hundred"` <br /> `"high_technology_exports_percent_total"` <br /> `"merchandise_trade_percent_gdp"` <br /> `"total_debt_service_percent_gni"` <br /> | `"gdp_current_usd"` |
| fmt       | _no_     | `"csv"` \| `"json"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `"json"`            |

```js
import ehd from 'ehd-js'

const data = await ehd.macroEconomics({
  country: 'DEU',
  indicator: 'gdp_growth_annual'
})
```

### options

[official docs](https://eodhistoricaldata.com/financial-apis/stock-options-data/)  
[example response](https://eodhistoricaldata.com/api/options/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX)

_cost_: 10 API calls / symbol
_requires_: Options Data Feed

Get options data for a symbol or a specific contract.

| option        | required                       | type                                               | default |
| ------------- | ------------------------------ | -------------------------------------------------- | ------- |
| code          | _yes_ (without `contractName`) | string                                             |         |
| contractName  | _yes_ (without `code`)         | string                                             |         |
| from          | _no_                           | `YYYY-MM-DD` or shorthand (see date range section) |         |
| to            | _no_                           | `YYYY-MM-DD` or shorthand (see date range section) |         |
| tradeDateFrom | _no_                           | `YYYY-MM-DD` or shorthand (see date range section) |         |
| tradeDateTo   | _no_                           | `YYYY-MM-DD` or shorthand (see date range section) |         |

```js
import ehd from 'ehd-js'

let data = await ehd.options({
  code: 'AAPL.US',
  from: 'm-1',
  tradeDateFrom: '2020-12-01',
  tradeDateTo: '2021-02-12'
})

data = await ehd.options({
  contract_name: 'AAPL201218C00022500'
})
```

### search

[official docs](https://eodhistoricaldata.com/financial-apis/search-api-for-stocks-etfs-mutual-funds-and-indices/)

_cost_: 1 API call

Use this to perform a query based search. You can choose to limit the amount of results returned as well as confine the search results to bonds only.

| option    | required | type                                                        | default |
| --------- | -------- | ----------------------------------------------------------- | ------- |
| query     | _yes_    | string                                                      |         |
| limit     | _no_     | number                                                      | 50      |
| bondsOnly | _no_     | boolean                                                     | false   |
| type      | _no_     | `"all"` \| `"stock"` \| `"funds"` \| `"bonds"` \| `"index"` | `"all"` |

```js
import ehd from 'ehd-js'

let data = await ehd.search({
  query: 'apple',
  limit: 5
})

data = await ehd.search({
  query: 'airline',
  limit: 5,
  bondsOnly: true
})
```

### screener

[official docs](https://eodhistoricaldata.com/financial-apis/search-api-for-stocks-etfs-mutual-funds-and-indices/)

_cost_: 5 API calls

Use the screener API to filter out tickers based on certain parameters

```ts
type EHDScreenerFilter =
  | 'code'
  | 'name'
  | 'exchange'
  | 'sector'
  | 'industry'
  | 'market_capitalization'
  | 'earnings_share'
  | 'dividend_yield'
  | 'refund_1d_p'
}

type EHDScreenerOperation =
  | '='
  | 'in'
  | 'not in'
  | 'match'
  | '>'
  | '<'
  | '>='
  | '<='
  | '!='

export type EHDScreenerSignal =
  | '50d_new_lo'
  | '50d_new_hi'
  | '200d_new_lo'
  | '200d_new_hi'
  | 'bookvalue_neg'
  | 'bookvalue_pos'
  | 'wallstreet_lo'
  | 'wallstreet_hi'
```

| option  | required | type                                                                  | default |
| ------- | -------- | --------------------------------------------------------------------- | ------- |
| filters | _no_     | [key in EHDScreenerFilter]?: [EHDScreenerOperation, string \| number] |         |
| signal  | _no_     | `EHDScreenerSignal[] `                                                |         |
| sort    | _no_     | [key in EHDScreenerSortKey]?: 'asc' \| 'desc'                         |         |
| limit   | _no_     | number                                                                | 50      |
| offset  | _no_     | number                                                                | 0       |

```js
import ehd from 'ehd-js'

const data = await ehd.screener({
  filters: {
    market_capitalization: ['>', 1000],
    exchange: ['=', 'us']
  },
  signals: ['200d_new_hi'],
  sort: {
    market_capitalization: 'asc'
  },
  limit: 10,
  offset: 5
})
```

### shortInterest

[official docs](https://eodhistoricaldata.com/financial-apis/api-splits-dividends/#Historical_Short_Interest_API)  
[example response](https://eodhistoricaldata.com/api/shorts/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&from=2000-01-01&fmt=json)

_cost_: 1 API call / symbol

Get data on short interest for a specific symbol

| option | required | type                                               | default  |
| ------ | -------- | -------------------------------------------------- | -------- |
| code   | _yes_    | string                                             |          |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| fmt    | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.shortInterest({
  code: 'GME.US'
})
```

### splits

[official docs](https://eodhistoricaldata.com/financial-apis/api-splits-dividends/#Historical_Splits_API)  
[example response](https://eodhistoricaldata.com/api/splits/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&from=2000-01-01&fmt=json)

_cost_: 1 API call / symbol

Get historical splits data for a specific symbol

| option | required | type                                               | default  |
| ------ | -------- | -------------------------------------------------- | -------- |
| code   | _yes_    | string                                             |          |
| from   | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| to     | _no_     | `YYYY-MM-DD` or shorthand (see date range section) |          |
| fmt    | _no_     | `"csv"` \| `"json"`                                | `"json"` |

```js
import ehd from 'ehd-js'

const data = await ehd.splits({
  code: 'AAPL.US'
})
```

### technicals

[official docs](https://eodhistoricaldata.com/financial-apis/technical-indicators-api/)

_cost_: 5 API calls

Get historical data for 10+ technical indicators

| option            | required | type                                                                                                                                                                                                                                   | default  |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| code              | _yes_    | string                                                                                                                                                                                                                                 |          |
| function          | _yes_    | `"adx"` <br /> `"avgvol"` <br /> `"avgvolccy"` <br /> `"dmi"` <br /> `"ema"` <br /> `"macd"` <br /> `"rsi"` <br /> `"slope"` <br /> `"sma"` <br /> `"splitadjusted"` <br /> `"stochastic"` <br /> `"volatility"` <br /> `"wma"` <br /> |          |
| from              | _no_     | `YYYY-MM-DD` or shorthand (see date range section)                                                                                                                                                                                     |          |
| to                | _no_     | `YYYY-MM-DD` or shorthand (see date range section)                                                                                                                                                                                     |          |
| period            | _no_     | 2 - 100000                                                                                                                                                                                                                             | 50       |
| order             | _no_     | `"a"` (ascending) \| `"d"` (descending)                                                                                                                                                                                                | `"a"`    |
| splitadjustedOnly | _no_     | boolean                                                                                                                                                                                                                                | false    |
| fmt               | _no_     | `"csv"` \| `"json"`                                                                                                                                                                                                                    | `"json"` |

The following additional options are valid for the `macd` function

| option       | required | type       | default |
| ------------ | -------- | ---------- | ------- |
| fastPeriod   | _no_     | 2 - 100000 | 12      |
| slowPeriod   | _no_     | 2 - 100000 | 26      |
| signalPeriod | _no_     | 2 - 100000 | 9       |

The following additional options are valid for the `stochastic` function

| option      | required | type       | default |
| ----------- | -------- | ---------- | ------- |
| fastKperiod | _no_     | 2 - 100000 | 14      |
| slowKperiod | _no_     | 2 - 100000 | 3       |
| slowDperiod | _no_     | 2 - 100000 | 3       |

```js
import ehd from 'ehd-js'

let data = await ehd.technicals({
  code: 'MSFT.US',
  function: 'macd',
  from: 'Y-1',
  period: '75', // amount of data points used to calculate each average
  splitadjustedOnly: true,
  fastPeriod: 20,
  slowPeriod: 50,
  signalPeriod: 10
})

data = await ehd.technicals({
  code: 'MSFT.US',
  function: 'stochastic',
  from: 'Y-1',
  fastKperiod: 20
})
```

### user

[official docs](https://eodhistoricaldata.com/financial-apis/user-api/)

Get data on the user connected with the used token

```js
import ehd from 'ehd-js'

const user = await ehd.user()
```

## Roadmap

I created this library in my free time and will continue to make improvements over time.
Feel free to create issues if you have suggestions or encounter problems and I will try to address them whenever I find a moment.

Below you can find a list of improvement that are currently being planned:

- Add an improved date range shorthand option that should be able to handle the following cases:

  results are based on a today date of `2021-01-05`

  | input            | result                                     |
  | ---------------- | ------------------------------------------ |
  | `y`              | `{ from: '2021-01-01', to: '2021-12-31' }` |
  | `y+1`            | `{ from: '2022-01-01', to: '2022-12-31' }` |
  | `y-1:y`          | `{ from: '2020-01-01', to: '2021-12-31' }` |
  | `y2014`          | `{ from: '2014-01-01', to: '2014-12-31' }` |
  | `m`              | `{ from: '2021-01-01', to: '2021-01-31' }` |
  | `m-3`            | `{ from: '2020-10-01', to: '2020-10-31' }` |
  | `y-1.m3`         | `{ from: '2020-03-01', to: '2020-03-31' }` |
  | `y-1.m+1`        | `{ from: '2020-02-01', to: '2020-02-29' }` |
  | `y-2.m2:y-1.m+2` | `{ from: '2019-01-01', to: '2020-03-31' }` |
  | `w-1`            | `{ from: '2020-12-28', to: '2020-01-03' }` |
  | `w`              | `{ from: '2021-01-04', to: '2021-01-10' }` |
  | `w+3`            | `{ from: '2021-01-24', to: '2021-01-31' }` |
  | `d`              | `{ from: '2021-01-05', to: '2021-01-05' }` |
  | `d-10`           | `{ from: '2020-12-26', to: '2021-01-05' }` |

- Improve `livePrices` method so you don't have to pass both `code` and `s` when fetching live prices for multiple symbols
- Add more tests
