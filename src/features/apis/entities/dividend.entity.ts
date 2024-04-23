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
  payoutRatio: string;
  /**
   * 배당금
   */
  dividend: string;
  /**
   * ROE
   */
  roe: string;
  /**
   * PER
   */
  per: string;
  /**
   * 1년전 배당금
   */
  year1: string;
  /**
   * 2년전 배당금
   */
  year2: string;
  /**
   * 3년전 배당금
   */
  year3: string;
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
   */
  limitPayoutRatio: number;
}
