import {
  CountryAlpha3ISOCode,
  CountryISOCode,
  EHDCalendarDataTypeName,
  EHDCouponPaymentFrequency,
  EHDCurrencyCode,
  EHDCurrencyName,
  EHDCurrencySymbol,
  EHDETFCategory,
  EHDExchangeCode,
  EHDFiscalYearEndMonth,
  EHDHolidayType,
  EHDHomeCategory,
  EHDIndustry,
  EHDIPODealType,
  EHDMarketCapCategory,
  EHDOptionContractSize,
  EHDOptionType,
  EHDPaymentMethod,
  EHDPeriod,
  EHDSector,
  EHDSubscriptionType,
  EHDSymbolType
} from './literals'

export interface EHDUser {
  name: string
  email: string
  subscriptionType: EHDSubscriptionType
  paymentMethod: EHDPaymentMethod
  apiRequests: number
  apiRequestsDate: string
  dailyRateLimit: number
  inviteToken: string
  inviteTokenClicked: number
}

export interface EHDExchange {
  Name: string
  Code: EHDExchangeCode
  OperatingMIC: string
  Country: string
  Currency: string
}

export interface EHDExchangeHoliday {
  Holiday: string
  Date: string
  Type: EHDHolidayType
}

export interface EHDExchangeTradingHours {
  Open: string
  Close: string
  OpenUTC: string
  CloseUTC: string
  WorkingDays: string
}

export interface EHDExchangeDetails extends EHDExchange {
  Timezone: string
  ExchangeHolidays: EHDExchangeHoliday[]
  isOpen: boolean
  TradingHours: EHDExchangeTradingHours
  ActiveTickers: number
  PreviousDayUpdatedTickers: number
  UpdatedTickers: number
}

export interface EHDSymbol {
  Code: string
  Name: string
  Country: string
  Currency: EHDCurrencyCode
  Type: EHDSymbolType
  Exchange: EHDExchangeCode
}

export interface EHDGovernmentBondSymbol extends EHDSymbol {
  Exchange: 'GBOND'
  Type: 'BOND'
}

export interface EHDCurrencySymbolType extends EHDSymbol {
  Country: 'Unknown'
  Exchange: 'MONEY'
  Type: 'MONEY'
}

export interface EHDIndexSymbol extends EHDSymbol {
  Exchange: 'INDX'
  Type: 'INDEX'
}

export interface EHDEUFundSymbol extends EHDSymbol {
  Country: 'Unknown'
  Exchange: 'EUFUND'
  Type: 'FUND'
}

export interface EHDMacroEconomicIndicatorData {
  CountryCode: CountryAlpha3ISOCode
  CountryName: string
  Indicator: string
  Date: string
  Period: EHDPeriod
  Value: string
}

export interface EHDEarnings {
  code: string
  report_date: string
  date: string
  actual: number | null
  estimate: number | null
  difference: number | null
  percent: number | null
}

export type EHDCalendarData<EHDCalendarDataType> = EHDCalendarDataType & {
  type: EHDCalendarDataTypeName
  description: string
  from?: string
  to?: string
  symbols?: string
}

export interface EHDEarningsTrend {
  code: string
  date: string
  period: string
  growth: string
  earningsEstimateAvg: string
  earningsEstimateLow: string
  earningsEstimateHigh: string
  earningsEstimateYearAgoEps: string
  earningsEstimateNumberOfAnalysts: string
  earningsEstimateGrowth: string
  revenueEstimateAvg: string
  revenueEstimateLow: string
  revenueEstimateHigh: string
  revenueEstimateYearAgoEps: null | string
  revenueEstimateNumberOfAnalysts: string
  revenueEstimateGrowth: string
  epsTrendCurrent: string
  epsTrend7daysAgo: string
  epsTrend30daysAgo: string
  epsTrend60daysAgo: string
  epsTrend90daysAgo: string
  epsRevisionsUpLast7days: string
  epsRevisionsUpLast30days: string
  epsRevisionsDownLast30days: string
}

export interface EHDIPO {
  code: string
  name: string
  exchange: string
  currency: string
  start_date: string
  filing_date: string
  amended_date: string
  price_from: number
  price_to: number
  offer_price: number
  shares: number
  deal_type: EHDIPODealType
}

export interface EHDSplit {
  code: string
  split_date: string
  optionable: string
  old_shares: number
  new_shares: number
}

export interface EHDCompanyAddress {
  Street: string
  City: string
  Country: string
  ZIP: string
}

export interface EHDListing {
  Code: string
  Exchange: EHDExchangeCode
  Name: string
}

export interface EHDOfficer {
  Name: string
  Title: string
  YearBorn: string
}

export interface EHDStockGeneralInformation {
  Code: string
  Type: EHDSymbolType
  Name: string
  Exchange: EHDExchangeCode
  CurrencyCode: EHDCurrencyCode
  CurrencyName: EHDCurrencyName
  CurrencySymbol: EHDCurrencySymbol
  CountryName: string
  CountryISO: CountryISOCode
  ISIN: string
  CIK: string | null
  EmployerIdNumber: string | null
  FiscalYearEnd: EHDFiscalYearEndMonth
  IPODate: string | null
  InternationalDomestic: string | null
  Sector: EHDSector
  Industry: EHDIndustry
  GicSector: string | null
  GicGroup: string | null
  GicIndustry: string | null
  GicSubIndustry: string | null
  HomeCategory?: EHDHomeCategory
  isDelisted?: boolean
  Description: string
  Address: string
  AddressData: EHDCompanyAddress
  Listings: { [key: number]: EHDListing }
  Officers: { [key: number]: EHDOfficer }
  Phone: string
  WebURL: string
  LogoURL: string
  FullTimeEmployees: number
  UpdatedAt: string
}

export interface EHDStockHighlights {
  MarketCapitalization: number
  MarketCapitalizationMln: number
  EBITDA: number
  PERatio: number
  PEGRatio: number
  WallStreetTargetPrice: number
  BookValue: number
  DividendShare: number
  DividendYield: number
  EarningsShare: number
  EPSEstimateCurrentYear: number
  EPSEstimateNextYear: number
  EPSEstimateNextQuarter: number
  EPSEstimateCurrentQuarter: number
  MostRecentQuarter: string
  ProfitMargin: number
  OperatingMarginTTM: number
  ReturnOnAssetsTTM: number
  ReturnOnEquityTTM: number
  RevenueTTM: number
  RevenuePerShareTTM: number
  QuarterlyRevenueGrowthYOY: number
  GrossProfitTTM: number
  DilutedEpsTTM: number
  QuarterlyEarningsGrowthYOY: number
}

export interface EHDStockValuation {
  TrailingPE: number
  ForwardPE: number
  PriceSalesTTM: number
  PriceBookMRQ: number
  EnterpriseValueRevenue: number
  EnterpriseValueEbitda: number
}

export interface EHDStockSharesStats {
  SharesOutstanding: number
  SharesFloat: number
  PercentInsiders: number
  PercentInstitutions: number
  SharesShort: number
  SharesShortPriorMonth: number
  ShortRatio: number
  ShortPercentOutstanding: number
  ShortPercentFloat: number
}

export interface EHDStockTechnicals {
  Beta: number
  '52WeekHigh': number
  '52WeekLow': number
  '50DayMA': number
  '200DayMA': number
  SharesShort: number
  SharesShortPriorMonth: number
  ShortRatio: number
  ShortPercent: number
}

export interface EHDNumberDividendsForYear {
  Year: number
  count: number
}

export interface EHDSplitsDividends {
  ForwardAnnualDividendRate: number
  ForwardAnnualDividendYield: number
  PayoutRatio: number
  DividendDate: string
  ExDividendDate: string
  LastSplitFactor: string
  LastSplitDate: string
  NumberDividendsByYear: { [key: number]: EHDNumberDividendsForYear }
}

export interface EHDAnalystRatings {
  Rating: number
  TargetPrice: number
  StrongBuy: number
  Buy: number
  Hold: number
  Sell: number
  StrongSell: number
}

export interface EHDShareHolder {
  name: string
  date: string
  totalShares: number
  totalAssets: number
  currentShares: number
  change: number
  change_p: number
}

export interface EHDHolders {
  Institutions: { [key: string]: EHDShareHolder }
  Funds: { [key: string]: EHDShareHolder }
}

export interface EHDOutstandingShares {
  date: string
  dateFormatted: string
  sharesMln: string
  shares: number
}

export interface EHDOutstandingSharesHistorical {
  annual: Record<string, EHDOutstandingShares>
  quarterly: Record<string, EHDOutstandingShares>
}

export interface EHDEarningsHistorical {
  reportDate: string
  date: string
  epsActual: number
  epsEstimate: null | number
  epsDifference: null | number
  surprisePercent: null | number
}

export interface EHDEarningsAnnual {
  date: string
  epsActual: number
}

export interface EHDFundamentalsEarnings {
  History: Record<string, EHDEarningsHistorical>
  Trend: Record<string, Omit<EHDEarningsTrend, 'code'>>
  Annual: Record<string, EHDEarningsAnnual>
}

export interface EHDBalanceSheet {
  date: string
  filing_date: string | null
  currency_symbol: EHDCurrencySymbol
  totalAssets: string
  intangibleAssets: string | null
  earningAssets: string | null
  otherCurrentAssets: string
  totalLiab: string
  totalStockholderEquity: string
  deferredLongTermLiab: null
  otherCurrentLiab: string
  commonStock: string
  retainedEarnings: string
  otherLiab: string | null
  goodWill: string | null
  otherAssets: string
  cash: string | null
  totalCurrentLiabilities: string
  shortTermDebt: string | null
  shortLongTermDebt: string | null
  shortLongTermDebtTotal: string | null
  otherStockholderEquity: string | null
  propertyPlantEquipment: string
  totalCurrentAssets: string | null
  longTermInvestments: string | null
  netTangibleAssets: string | null
  shortTermInvestments: string | null
  netReceivables: string | null
  longTermDebt: string
  inventory: string
  accountsPayable: string
  totalPermanentEquity: string | null
  noncontrollingInterestInConsolidatedEntity: string | null
  temporaryEquityRedeemableNoncontrollingInterests: string | null
  accumulatedOtherComprehensiveIncome: string | null
  additionalPaidInCapital: string | null
  commonStockTotalEquity: string | null
  preferredStockTotalEquity: string
  retainedEarningsTotalEquity: string | null
  treasuryStock: string | null
  accumulatedAmortization: string | null
  nonCurrrentAssetsOther: string | null
  deferredLongTermAssetCharges: string | null
  nonCurrentAssetsTotal: string | null
  capitalLeaseObligations: string | null
  longTermDebtTotal: string | null
  nonCurrentLiabilitiesOther: string | null
  nonCurrentLiabilitiesTotal: string | null
  negativeGoodwill: string | null
  warrants: string | null
  preferredStockRedeemable: string | null
  capitalSurpluse: string | null
  liabilitiesAndStockholdersEquity: string | null
  cashAndShortTermInvestments: string | null
  propertyPlantAndEquipmentGross: string | null
  accumulatedDepreciation: string | null
  commonStockSharesOutstanding: string | null
}

export interface EHDCashFlow {
  date: string
  filing_date: string | null
  currency_symbol: EHDCurrencySymbol
  investments: string | string
  changeToLiabilities: string
  totalCashflowsFromInvestingActivities: string | null
  netBorrowings: string | null
  totalCashFromFinancingActivities: string
  changeToOperatingActivities: string | null
  netIncome: string | null
  changeInCash: string | null
  totalCashFromOperatingActivities: string
  depreciation: string | null
  otherCashflowsFromInvestingActivities: string | null
  dividendsPaid: string | null
  changeToInventory: string
  changeToAccountReceivables: string | null
  salePurchaseOfStock: string | null
  otherCashflowsFromFinancingActivities: string | null
  changeToNetincome: string | null
  capitalExpenditures: string
  changeReceivables: string | null
  cashFlowsOtherOperating: string | null
  exchangeRateChanges: string | null
  cashAndCashEquivalentsChanges: string | null
}

export interface EHDIncomeStatement {
  date: string
  filing_date: string | null
  currency_symbol: EHDCurrencySymbol
  researchDevelopment: string
  effectOfAccountingCharges: string | null
  incomeBeforeTax: string
  minorityInterest: string | null
  netIncome: string
  sellingGeneralAdministrative: string
  grossProfit: string | null
  ebit: string | null
  nonOperatingIncomeNetOther: string | null
  operatingIncome: string
  otherOperatingExpenses: string | null
  interestExpense: string
  taxProvision: string | null
  interestIncome: string | null
  netInterestIncome: string | null
  extraordinaryItems: string | null
  nonRecurring: string | null
  otherItems: string | null
  incomeTaxExpense: string
  totalRevenue: string
  totalOperatingExpenses: string | null
  costOfRevenue: string
  totalOtherIncomeExpenseNet: string | null
  discontinuedOperations: string | null
  netIncomeFromContinuingOps: string | null
  netIncomeApplicableToCommonShares: string
  preferredStockAndOtherAdjustments: string | null
}

export interface EHDFinancials {
  Balance_Sheet: {
    currency_symbol: EHDCurrencySymbol
    quarterly: Record<string, EHDBalanceSheet>
    yearly: Record<string, EHDBalanceSheet>
  }
  Cash_Flow: {
    currency_symbol: EHDCurrencySymbol
    quarterly: Record<string, EHDCashFlow>
    yearly: Record<string, EHDCashFlow>
  }
  Income_Statement: {
    currency_symbol: EHDCurrencySymbol
    quarterly: Record<string, EHDIncomeStatement>
    yearly: Record<string, EHDIncomeStatement>
  }
}

export interface EHDStockFundamentals {
  General: EHDStockGeneralInformation
  Highlights: EHDStockHighlights
  Valuation: EHDStockValuation
  SharesStats: EHDStockSharesStats
  Technicals: EHDStockTechnicals
  SplitsDividends: EHDSplitsDividends
  AnalystRatings?: EHDAnalystRatings
  Holders: EHDHolders | null
  outstandingShares: EHDOutstandingSharesHistorical
  Earnings: EHDFundamentalsEarnings
  Financials: EHDFinancials
}

export interface EHDLivePrice {
  code: string
  timestamp: number
  gmtoffset: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  previousClose: number
  change: number
  change_p: number
}

export interface EHDEndOfDayPrice {
  date: string
  open: number
  high: number
  low: number
  close: number
  adjusted_close: number
  volume: number
}

export interface EHDTechnicalAverageVolume {
  date: string
  avgvol: number
}

export interface EHDTechnicalAverageVolumeByPrice {
  date: string
  avgvolccy: number
}

export interface EHDTechnicalSMA {
  date: string
  sma: number
}

export interface EHDTechnicalEMA {
  date: string
  ema: number
}

export interface EHDTechnicalWMA {
  date: string
  wma: number
}

export interface EHDTechnicalVolatility {
  date: string
  volatility: number
}

export interface EHDTechnicalRSI {
  date: string
  rsi: number
}

export interface EHDTechnicalSlope {
  date: string
  slope: number
}

export interface EHDTechnicalDMI {
  date: string
  dmi: number
}

export interface EHDTechnicalDMI {
  date: string
  dmi: number
}

export interface EHDTechnicalADX {
  date: string
  adx: number
}

export interface EHDTechnicalMACD {
  date: string
  macd: number
  signal: number
  divergence: number
}

export interface EHDTechnicalStochastic {
  date: string
  k_values: number
  d_values: number
}

export interface EHDIntradayHistoricalData {
  timestamp: number
  gmtoffset: number
  datetime: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface EHDOptionData {
  code: string
  exchange: EHDExchangeCode
  lastTradeDate: string
  lastTradePrice: number
  data: EHDOptionsDataByExpirationDate[]
}

export interface EHDOptionsDataByExpirationDate {
  expirationDate: string
  impliedVolatility: number
  optionsCount: number
  options: {
    CALL: EHDOption[]
    PUT: EHDOption[]
  }
}

export interface EHDOption {
  contractName: string
  contractSize: EHDOptionContractSize
  currency: EHDCurrencyCode
  type: EHDOptionType
  inTheMoney: 'TRUE' | 'FALSE'
  lastTradeDateTime: string
  expirationDate: string
  strike: number
  lastPrice: number
  bid: number
  ask: number
  change: number
  changePercent: number
  volume: number
  openInterest: number
  impliedVolatility: number
  delta: number
  gamma: number
  theta: number
  vega: number
  rho: number
  theoretical: number
  intrinsicValue: number
  timeValue: number
  updatedAt: number
  daysBeforeExpiration: number
}

export interface EHDDividend {
  date: string
  declarationDate: null | string
  recordDate: null | string
  paymentDate: null | string
  period: null | EHDPeriod
  value: string
  unadjustedValue: number
  currency: EHDCurrencySymbol
}

export interface EHDSplit {
  date: string
  split: string
}

export interface EHDShortInterest {
  date: string
  short: number
  volume: number
}

export interface EHDBondFundamentals {
  ISIN: string
  CUSIP: string
  Name: string
  UpdateDate: string
  WKN: string
  Sedol: null | string
  FIGI: null | string
  Currency: EHDCurrencyCode
  Coupon: string
  Price: string
  LastTradeDate: string
  Maturity_Date: string
  YieldToMaturity: string
  Callable: 'No' | 'Yes'
  NextCallDate: null | string
  MinimumSettlementAmount: string
  ParIntegralMultiple: string
  ClassificationData: {
    BondType: string
    DebtType: string
    IndustryGroup: string
    IndustrySubGroup: string
    SubProductAsset: string
    SubProductAssetType: string
  }
  Rating: {
    MoodyRating: string
    MoodyRatingUpdateDate: string
    SPRating: string
    SPRatingUpdateDate: string
  }
  IssueData: {
    IssueDate: string
    OfferingDate: string
    FirstCouponDate: string
    FirstTradingDay: string
    CouponPaymentFrequency: EHDCouponPaymentFrequency
    Issuer: string
    IssuerDescription: string
    IssuerCountry: string
    IssuerURL: null | string
  }
}

export interface EHDBondPrice {
  date: string
  price: number
  yield: number
  volume: number
}

export interface EHDETFGeneralInfo {
  Code: string
  Type: 'ETF'
  Name: string
  Exchange: EHDExchangeCode
  CurrencyCode: EHDCurrencyCode
  CurrencyName: EHDCurrencyName
  CurrencySymbol: EHDCurrencySymbol
  CountryName: string
  CountryISO: CountryISOCode
  Description: string
  Category: EHDETFCategory
  UpdatedAt: string
}

export interface EHDETFTechnicals {
  Beta: number
  '52WeekHigh': number
  '52WeekLow': number
  '50DayMA': number
  '200DayMA': number
}

export interface EHDETFAssetAllocation {
  'Long_%': string
  'Short_%': string
  'Net_Assets_%': string
}

export interface EHDETFWorldRegionAllocation {
  'Equity_%': string
  Relative_to_Category: string
}

export interface EHDETFSectorWeight {
  'Equity_%': string
  Relative_to_Category: string
}

export interface EHDETFHolding {
  Code: string
  Exchange: EHDExchangeCode
  Name: string
  Sector: EHDSector
  Industry: string
  Country: string
  Region: string
  'Assets_%': number
}

export interface EHDETFData {
  ISIN: string
  Company_Name: string
  Company_URL: string
  ETF_URL: string
  Yield: string
  Dividend_Paying_Frequency: EHDPeriod
  Inception_Date: string
  Max_Annual_Mgmt_Charge: string
  Ongoing_Charge: string
  Date_Ongoing_Charge: string
  NetExpenseRatio: string
  AnnualHoldingsTurnover: string
  TotalAssets: string
  Average_Mkt_Cap_Mil: string
  Market_Capitalisation: {
    Mega: string
    Big: string
    Medium: string
    Small: string
    Micro: string
  }
  Asset_Allocation: {
    Stock: EHDETFAssetAllocation
    Bond: EHDETFAssetAllocation
    Property: EHDETFAssetAllocation
    Cash: EHDETFAssetAllocation
    Other: EHDETFAssetAllocation
  }
  World_Regions: {
    'United States': EHDETFWorldRegionAllocation
    Canada: EHDETFWorldRegionAllocation
    'Latin America': EHDETFWorldRegionAllocation
    'United Kingdom': EHDETFWorldRegionAllocation
    Eurozone: EHDETFWorldRegionAllocation
    'Europe - except Euro': EHDETFWorldRegionAllocation
    'Europe - Emerging': EHDETFWorldRegionAllocation
    Africa: EHDETFWorldRegionAllocation
    'Middle East': EHDETFWorldRegionAllocation
    Japan: EHDETFWorldRegionAllocation
    Australasia: EHDETFWorldRegionAllocation
    'Asia - Developed': EHDETFWorldRegionAllocation
    'Asia - Emerging': EHDETFWorldRegionAllocation
  }
  Sector_Weights: {
    [key: EHDSector]: EHDETFSectorWeight
  }
  Fixed_Income: {}
  Holdings_Count: number
  Top_10_Holdings: {
    [key: string]: EHDETFHolding
  }
  Holdings: {
    [key: string]: EHDETFHolding
  }
  Valuations_Growth: {
    Valuations_Rates_Portfolio: AnyObject
    Valuations_Rates_To_Category: AnyObject
    Growth_Rates_Portfolio: AnyObject
    Growth_Rates_To_Category: AnyObject
  }
  MorningStar: {
    Ratio: string
    Category_Benchmark: string
    Sustainability_Ratio: string
  }
  Performance: {
    '1y_Volatility': null | string
    '3y_Volatility': string
    '3y_ExpReturn': string
    '3y_SharpRatio': string
    Returns_YTD: string
    Returns_1Y: null | string
    Returns_3Y: string
    Returns_5Y: string
    Returns_10Y: string
  }
}

export interface EHDETFFundamentals {
  General: EHDETFGeneralInfo
  Technicals: EHDETFTechnicals
  ETF_Data: EHDETFData
}

export interface EHDMutualFundsGeneralInfo {
  Code: string
  Type: 'FUND'
  Name: string
  Exchange: string
  CurrencyCode: EHDCurrencyCode
  CurrencyName: string
  CurrencySymbol: EHDCurrencySymbol
  CountryName: string
  CountryISO: CountryISOCode
  ISIN: string
  CUSIP: string
  Fund_Summary: string
  Fund_Family: string
  Fund_Category: string
  Fund_Style: string
  Fiscal_Year_End: string
  MarketCapitalization: number
}

export interface EHDMutualFundAssetAllocationData {
  'Net_%': string
  'Long_%': string
  Type: string
  'Short_%': string | null
  Category_Average: string
  Benchmark: string
}

export interface EHDMutualFundValueGrowthIndicator {
  Name: string
  Category_Average: string
  Benchmark: string | null
  Stock_Portfolio: string
}

export interface EHDMutualFundHolding {
  Name: string
  Owned: string
  Change: string
  Weight: string
}

export interface EHDMutualFundMarketCap {
  Size: EHDMarketCapCategory
  Category_Average: string
  Benchmark: string
  'Portfolio_%': string
}

export interface EHDMutualFundAllocationData {
  Type: string
  Category_Average: string
  'Amount_%': string
  Benchmark: string
}

export interface EHDMutualFundData {
  Fund_Category: string
  Fund_Style: string
  Nav: string
  Prev_Close_Price: string
  Update_Date: string
  Portfolio_Net_Assets: string
  Share_Class_Net_Assets: string
  Morning_Star_Rating: null | string
  Morning_Star_Risk_Rating: null | string
  Morning_Star_Category: null | string
  Inception_Date: string
  Currency: EHDCurrencyCode
  Domicile: string
  Yield: string
  Yield_YTD: string
  Yield_1Year_YTD: string
  Yield_3Year_YTD: string
  Yield_5Year_YTD: string
  Expense_Ratio: string
  Expense_Ratio_Date: string
  Asset_Allocation: {
    [key: string]: EHDMutualFundAssetAllocationData
  }
  Value_Growth: {
    [key: string]: EHDMutualFundValueGrowthIndicator
  }
  Top_Holdings: {
    [key: string]: EHDMutualFundHolding
  }
  Market_Capitalization: {
    [key: string]: EHDMutualFundMarketCap
  }
  Sector_Weights: {
    Cyclical: {
      [key: string]: EHDMutualFundAllocationData
    }
    Defensive: {
      [key: string]: EHDMutualFundAllocationData
    }
    Sensitive: {
      [key: string]: EHDMutualFundAllocationData
    }
  }
  World_Regions: {
    Americas: {
      [key: string]: EHDMutualFundAllocationData
    }
    'Greater Asia': {
      [key: string]: EHDMutualFundAllocationData
    }
    'Greater Europe': {
      [key: string]: EHDMutualFundAllocationData
    }
    'Market Classification': {
      [key: string]: EHDMutualFundAllocationData
    }
  }
  Top_Countries: {}
  market_capitalization: null
  world_regions: null
  sector_weights: null
  asset_allocation: null
}

export interface EHDMutualFundFundamentals {
  General: EHDMutualFundsGeneralInfo
  MutualFund_Data: EHDMutualFundData
}

export interface EHDIndexData {
  General: {
    Code: string
    Type: 'INDEX'
    Name: string
    Exchange: 'INDX'
    CurrencyCode: EHDCurrencyCode
    CurrencyName: EHDCurrencyName
    CurrencySymbol: EHDCurrencySymbol
    CountryName: string
    CountryISO: CountryISOCode
  }
  Components: {
    [key: string]: {
      Code: string
      Exchange: EHDExchangeCode
      Name: string
      Sector: string
      Industry: string
    }
  }
  HistoricalTickerComponents: {
    [key: string]: {
      Code: string
      Name: string
      StartDate: string
      EndDate: string
      IsActiveNow: 0 | 1
      IsDelisted: 0 | 1
    }
  }
}

export interface EHDScreenerResult {
  code: string
  name: string
  last_day_data_date: string
  adjusted_close: number
  refund_1d: number
  refund_1d_p: number
  exchange: EHDExchangeCode
  currency_symbol: EHDCurrencySymbol
  market_capitalization: number
  earnings_share: number
  dividend_yield: number
  sector: EHDSector
  industry: EHDIndustry
}

export interface EHDSearchResult {
  Code: string
  Exchange: EHDExchangeCode
  Name: string
  Type: EHDSymbolType
  Country: string
  Currency: EHDCurrencyCode | 'NA'
  ISIN: null | string
  previousClose: number
  previousCloseDate: string
}

export interface EHDBulkDataResult {
  code: string
  exchange_short_name: EHDExchangeCode
  date: string
  open: number
  high: number
  low: number
  close: number
  adjusted_close: number
  volume: number
  prev_close: number
  change: number
  change_p: number
}

export interface EHDBulkExtendedDataResult extends EHDBulkDataResult {
  ema_50d: number
  ema_200d: number
  hi_250d: number
  lo_250d: number
  avgvol_14d: number
  avgvol_50d: number
  avgvol_200d: number
}
