export type HeadText =
  | "종목"
  | "종가"
  | "고가"
  | "저가"
  | "변동"
  | "변동%"
  | "거래량"
  | "시간";

export type BodyTexts = Record<HeadText, string>;

export interface StockEntity {
  /**
   * thead 정보
   */
  headText: HeadText[];
  /**
   * tbody 정보
   */
  bodyTexts: BodyTexts[];
}
