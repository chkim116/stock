/**
 * 금융위원회_주식시세정보 URL
 */
export const STOCK_PRICE_INFO_URL =
  "http://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService";

export type ApiUrlType = typeof STOCK_PRICE_INFO_URL;

/**
 * 최다 거래주
 * @deprecated
 */
export const MOST_ACTIVE_STOCKS_URL =
  "https://kr.investing.com/equities/most-active-stocks";
/**
 * 급등주
 * @deprecated
 */
export const TOP_STOCK_GAINERS_URL =
  "https://kr.investing.com/equities/top-stock-gainers";

export type StockUrlType =
  | typeof MOST_ACTIVE_STOCKS_URL
  | typeof TOP_STOCK_GAINERS_URL;
