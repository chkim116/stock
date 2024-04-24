import { DividendSearchParamsSortEnum } from "@features/apis/entities";
import { DividendSearchParamsModel } from "./dividend.model";

export function createDividendSearchParamsModel() {
  const result: DividendSearchParamsModel = {
    increase: true,
    increaseOrSame: true,
    dividendAttendance: true,
    keyword: "",
    payoutRatioGte: 0,
    payoutRatioLte: 100,
    sort: DividendSearchParamsSortEnum.DIVIDEND,
  };

  return result;
}
