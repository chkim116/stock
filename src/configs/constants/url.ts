/**
 * 최다 거래주
 */
export const MOST_ACTIVE_STOCKS_URL =
  "https://kr.investing.com/equities/most-active-stocks";
/**
 * 급등주
 */
export const TOP_STOCK_GAINERS_URL =
  "https://kr.investing.com/equities/top-stock-gainers";

export type StockUrlType =
  | typeof MOST_ACTIVE_STOCKS_URL
  | typeof TOP_STOCK_GAINERS_URL;
