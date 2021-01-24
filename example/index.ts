import './setup-env'
import ehd from '../src'
import { EHDBondPrice, EHDETFGeneralInfo } from '../src/types/model'

async function example(): Promise<void> {
  try {
    // const data = await ehd.endOfDayPrice({
    //   code: 'AAPL.US',
    //   from: 'm-1',
    //   to: 'd',
    //   order: 'a'
    // })

    // const data = await ehd.bondPrice({
    //   isin: 'US910047AG49'
    // })

    /* TECHNICALS */

    // let data = await ehd.technicals({
    //   code: 'MSFT.US',
    //   function: 'sma',
    //   from: 'Y-1',
    //   splitadjustedOnly: true
    // })

    // let data = await ehd.technicals({
    //   code: 'MSFT.US',
    //   function: 'stochastic',
    //   from: 'Y-1',
    //   fastKperiod: 30
    // })

    // let data = await ehd.technicals({
    //   code: 'MSFT.US',
    //   function: 'macd',
    //   splitadjustedOnly: true,
    //   fastPeriod: 20,
    //   slowPeriod: 50,
    //   signalPeriod: 10,
    //   from: 'q-2'
    // })

    /* INTRADAY */

    // const data = await ehd.intraday({
    //   code: 'EURN.BR',
    //   interval: '5m',
    //   from: 'w-1',
    //   to: 'd'
    // })

    /* OPTIONS */

    const data = await ehd.options({
      code: 'AAPL.US',
      from: 'm-1',
      tradeDateFrom: '2020-12-01',
      tradeDateTo: '2021-02-12'
    })

    // const data = await ehd.options({
    //   contract_name: 'AAPL201218C00022500'
    // })

    /* LIVE PRICE */

    // const data = await ehd.livePrices({
    //   code: 'VWCE.XETRA',
    //   s: ['EURN.BR', 'MSFT.US', 'AAPL.US']
    // })

    // const data = await ehd.livePrices({
    //   code: 'ADA-USD.CC',
    // });

    /* DIVIDENDS */

    // const data = await ehd.dividends({
    //   code: 'EURN.BR',
    //   from: 'y-2'
    // })

    /* SPLITS */

    // const data = await ehd.splits({
    //   code: 'AAPL.US',
    // });

    /* SHORT_INTEREST */

    // const data = await ehd.fundamentals.stock('GME.US')

    // const data = await ehd.shortInterest({
    //   code: 'GME.US',
    //   from: 'Y-1'
    // })

    /* EOD Price */

    // const data = await ehd.endOfDayPrice({
    //   code: 'VWCE.XETRA',
    //   from: 'y-1',
    //   period: 'w',
    //   order: 'd'
    // })

    /*
     1. Government Bond
   */

    // const data = await ehd.governmentBondPrice({
    //   bond: {
    //     countryCode: 'BR',
    //     period: '10Y'
    //   },
    //   from: 'm-1'
    // })

    /*
     2. ECB Exchange Rates
   */

    // const data = await ehd.ecbExchangeRates({
    //   currency: 'GBP',
    //   from: 'm-1',
    //   period: 'w'
    // })

    /*
     3. Euribor
   */

    // const data = await ehd.euribor({
    //   ratePeriod: '1W',
    //   from: 'm-1',
    //   period: 'w'
    // })

    /*
     4. Euribor Futures
    */

    // const data = await ehd.euriborFutures({
    //   from: 'm-1'
    // })

    /*
     5. Libor
    */

    // const data = await ehd.libor({
    //   ratePeriod: '2M',
    //   nomination: 'EUR',
    //   from: 'm-1',
    //   period: 'w'
    // })

    /*
     6. NorgesBank exchange Rates
    */

    // const data = await ehd.norgesBankExchangeRates({
    //   currency: 'EUR',
    //   from: 'm-1'
    // })

    /*
     7. Stibor
    */

    // const data = await ehd.stibor({
    //   ratePeriod: '1M',
    //   from: 'y-3',
    //   period: 'w'
    // })

    /* MACRO ECONOMIC INDICATOR */

    // const data = await ehd.macroEconomic({
    //   country: 'DEU',
    //   indicator: 'gdp_growth_annual',
    // });

    /* BOND PRICE */

    // const data = await ehd.bondPrice({
    //   isin: 'US910047AG49',
    //   from: 'm-2',
    // });

    /* BOND FUNDAMENTALS */

    // const data = await ehd.bondFundamentals('US910047AG49')

    /* UPCOMING EARNINGS */

    // const data = await ehd.upcomingEarnings({
    //   symbols: 'AAPL.US'
    // })

    // const data = await ehd.upcomingEarnings({
    //   symbols: ['MSFT.US', 'AAPL.US'],
    //   from: 'm-3',
    // })

    /* EARNINGS TREND */

    // const data = await ehd.earningsTrends({
    //   symbols: 'AAPL.US',
    //
    // });

    /* UPCOMING IPOS */

    // const data = await ehd.upcomingIpos({
    //   to: 'w+3',
    //
    // });

    /* UPCOMING SPLITS */

    // const data = await ehd.upcomingSplits({
    //   to: 'w+3',
    // });

    /* FUNDAMENTALS */

    // const data = await ehd.fundamentals<EHDETFGeneralInfo>({
    //   code: 'VWCE.XETRA',
    //   filter: 'General',
    // });

    /* STOCK FUNDAMENTALS */

    // const data = await ehd.fundamentals.stock('EURN.BR');

    /* ETF FUNDAMENTALS */

    // const data = await ehd.fundamentals.etf('VWCE.XETRA');

    /* MUTUAL FUND */

    // const data = await ehd.fundamentals.mutualFund('SWPPX.US');

    /* INDEX CONSTITUENTS */

    // const data = await ehd.indexConstituents('GSPC');

    /* SCREENER */

    // const data = await ehd.screener({
    //   filters: {
    //     market_capitalization: ['>', 1000],
    //     exchange: ['=', 'us'],
    //   },
    //   signals: ['200d_new_hi'],
    //   sort: {
    //     market_capitalization: 'asc',
    //   },
    //   limit: 10,
    // });

    /* EXCHANGE DETAILS */

    // const data = await ehd.exchangeDetails({
    //   code: 'BR',
    //   from: 'm-3'
    // })

    /* EXCHANGES_LIST */

    // const data = await ehd.exchangesList();

    /* EXCHANGE_SYMBOLS_LIST */

    // const data = await ehd.exchangeSymbolList({ code: 'BR' });

    /* SEARCH */

    // const data = await ehd.search({
    //   query: 'airline',
    //   limit: 5,
    //   bondsOnly: true
    // })

    /* BULK EOD */

    // const data = await ehd.bulkEodData({
    //   date: '2020-12-05'
    // })

    // const data = await ehd.bulkEodData({
    //   code: 'BR',
    //   type: 'eod',
    //   extended: true,
    //   symbols: ['AAPL.US', 'MSFT.US']
    // })

    // const data = await ehd.exchangeSymbolList({
    //   code: 'INDX'
    // })

    // const data = await ehd.indexConstituents('XETRA')

    // const data = await ehd.earningsTrends({
    //   symbols: ['AAPL.US', 'MSFT.US']
    // })
    // const data = await ehd.user()

    console.log(data)
  } catch (err) {
    console.log(err)
  } finally {
    process.exit(0)
  }
}

example()
