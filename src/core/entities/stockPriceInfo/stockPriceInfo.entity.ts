export type MarketType = "KOSPI" | "KOSDAQ" | "KONEX";

/**
 * 금융위원회_주식시세 정보 Header
 */
export interface StockPriceInfoHeader {
  /**
   * API 호출 결과의 상태 코드
   */
  resultCode: string;
  /**
   * API 호출 결과의 상태
   */
  resultMsg: string;
}

/**
 * 금융위원회_주식시세 정보 Body - 데이터 상세 정보
 */
interface StockPriceInfoBodyItem {
  /**
   * 기준 일자
   * YYYYMMDD
   */
  basDt: string;
  /**
   * 종목 코드보다 짧으면서 유일성이 보장되는 코드 6자리
   */
  srtnCd: string;
  /**
   * 현선물 통합상품의 종목 코드 12자리
   */
  isinCd: string;
  /**
   * 종목의 명칭
   */
  itmsNm: string;
  /**
   * 주식의 시장 구분
   * @type KOSPI | KOSDAQ | KONEX
   */
  mrktCtg: MarketType;
  /**
   * 종가
   */
  clpr: number;
  /**
   * 전일 대비 등락
   */
  vs: number;
  /**
   * 전일 대비 등락 비율
   */
  fltRt: number;
  /**
   * 시가 - 최초 가격
   */
  mkp: number;
  /**
   * 고가
   */
  hipr: number;
  /**
   * 저가
   */
  lopr: number;
  /**
   * 체결수량 누적 합계
   */
  trqu: number;
  /**
   * 거래건 별 체결가 + 체결수량 누적합계
   */
  trPrc: number;
  /**
   * 종목 상장주식수
   */
  lstgStCnt: number;
  /**
   * 종가 * 상장주식수
   */
  mrktTotAmt: number;
}

/**
 * 금융위원회_주식시세 정보 Body
 */
export interface StockPriceInfoBody {
  /**
   * 한 페이지의 결과 수
   */
  numOfRows: number;
  /**
   * 현재 조회된 데이터의 페이지 번호
   */
  pageNum: number;
  /**
   * 전체 데이터의 총 수
   */
  totalCount: number;
  /**
   * 조회된 전체 데이터의 상세
   */
  items: StockPriceInfoBodyItem[];
}
/**
 * 금융위원회_주식시세 정보
 */
export interface StockPriceInfo {
  header: StockPriceInfoHeader;
  body: StockPriceInfoBody;
}
