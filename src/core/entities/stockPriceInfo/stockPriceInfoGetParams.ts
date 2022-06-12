/**
 * 금융위원회_주식시세 정보 API로 보내는 params
 */
export interface stockPriceInfoGetParams {
  /**
   * 한 페이지 결과수
   * @default 10
   */
  numOfRows?: number;
  /**
   * 페이지 번호
   */
  pageNo?: number;
  /**
   * xml, json 구분
   * @default xml
   */
  resultType?: string;
  /**
   * 검색값과 기준일자가 일치하는 데이터 검색
   * @example YYYYMMDD
   */
  basDt?: string;
  /**
   * 기준일자가 검색값보다 크거나 같은 데이터
   * @example YYYYMMDD
   */
  beginBasDt?: string;
  /**
   * 기준일자가 검색값보다 작은 데이터 검색
   * @example YYYYMMDD
   */
  endBasDt?: string;
  /**
   * 기준일자 값이 검색값을 포함하는 데이터 검색
   */
  likeBasDt?: string;
  /**
   * 단축코드가 검색값을 포함하는 데이터 검색
   */
  likeSrtnCd?: string;
  /**
   * ISIN코드가 일치하는 데이터 검색
   */
  isinCd?: string;
  /**
   * ISIN코드가 포함되는 데이터 검색
   */
  likeIsinCd?: string;
  /**
   * 검색값과 종목명이 일치하는 데이터 검색
   */
  itmsNm?: string;
  /**
   * 종목명이 검색값을 포함하는 데이터 검색
   */
  likeItmsNm?: string;
  /**
   * 시장구분 일치하는 지 데이터 검색
   */
  mrktCls?: string;
  /**
   * 대비가 검색값보다 크거나 같은 데이터 검색
   */
  beginVs?: string;
  /**
   * 대비가 검색값보다 작은 데이터 검색
   */
  endVs?: string;
  /**
   * 등락률이 검색값보다 크거나 같은 데이터 검색
   */
  beginFltRt?: string;
  /**
   * 등락률이 검색값보다 작은 데이터 검색
   */
  endFltRt?: string;
  /**
   * 거래량이 검색값보다 크거나 같은 데이터 검색
   */
  beginTrqu?: string;
  /**
   * 거래량이 검색값보다 작은 데이터 검색
   */
  endTrqu?: string;
  /**
   * 거래대금이 검색값보다 크거나 같은 데이터 검색
   */
  beginTrPrc?: string;
  /**
   * 거래대금이 검색값보다 작은 데이터 검색
   */
  endTrPrc?: string;
  /**
   * 상장주식수가 검색값보다 크거나 같은 데이터 검색
   */
  beginLstgStCnt?: string;
  /**
   * 상장주식수 검색값보다 작은 데이터 검색
   */
  endLstgStCnt?: string;
  /**
   * 시총이 검색값보다 크거나 같은 데이터 검색
   */
  beginMrktTotAmt?: string;
  /**
   * 시총이 검색값보다 작은 데이터 검색
   */
  endMrktTotAmt?: string;
}
