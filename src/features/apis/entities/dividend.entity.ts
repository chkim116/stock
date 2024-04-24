export interface DividendEntity {
  /**
   * 종목코드
   */
  code: string;
  /**
   * 종목명
   */
  name: string;
  /**
   * 현재가
   */
  currentStock: string;
  /**
   * 배당 기준월
   */
  payoutMonth: string;
  /**
   * 배당성향
   */
  payoutRatio: number;
  /**
   * 배당금
   */
  dividend: number;
  /**
   * ROE
   */
  roe: number;
  /**
   * PER
   */
  per: number;
  /**
   * 1년전 배당금
   */
  year1: number;
  /**
   * 2년전 배당금
   */
  year2: number;
  /**
   * 3년전 배당금
   */
  year3: number;
}

export enum DividendSearchParamsSortEnum {
  /**
   * 배당금
   */
  DIVIDEND = "dividend",
  /**
   * 배당성향
   */
  PAYOUT_RATIO = "payoutRatio",
  /**
   * ROE
   */
  ROE = "roe",
  /**
   * PER
   */
  PER = "per",
}

export interface DividendSearchParams {
  /**
   * 검색어
   */
  keyword: string;
  /**
   * 배당금 상향 여부
   */
  increase: boolean;
  /**
   * 배당금 상향 or 동일 여부
   */
  increaseOrSame: boolean;
  /**
   * 배당성향 상한선
   *
   * @default 100
   */
  payoutRatioLte: number;
  /**
   * 배당성향 하한선
   *
   * @default 0
   */
  payoutRatioGte: number;
  /**
   * 정렬
   */
  sort: DividendSearchParamsSortEnum;
  /**
   * 배당금 3년 개근
   */
  dividendAttendance: boolean;
}
