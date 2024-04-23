import { DividendSearchParams } from "@features/apis/entities";

export interface DividendSearchParamsModel extends DividendSearchParams {}

export interface DividendSearchModel {
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
   *
   * @example 35.53%
   */
  payoutRatio: string;
  /**
   * 배당금
   */
  dividend: string;
  /**
   * ROE
   *
   * @example 10.53%
   */
  roe: string;
  /**
   * PER
   *
   * @example 10.53
   */
  per: string;
  /**
   * 1년전 배당금
   */
  yearAgoDividend: string;
  /**
   * 2년전 배당금
   */
  twoYearAgoDividend: string;
  /**
   * 3년전 배당금
   */
  threeYearAgoDividend: string;
}
