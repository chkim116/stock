import {
  DividendEntity,
  DividendSearchParams,
  DividendSearchParamsSortEnum,
} from "@features/apis/entities";
import {
  DividendSearchModel,
  DividendSearchParamsModel,
} from "@features/models/dividend.model";
import { toBoolean } from "safers";

export function toDividendSearchModel(entities: DividendEntity[]) {
  return entities.map((entity) => {
    const result: DividendSearchModel = {
      code: entity.code,
      name: entity.name,
      currentStock: entity.currentStock,
      payoutMonth: entity.payoutMonth,
      payoutRatio: entity.payoutRatio,
      dividend: entity.dividend.toLocaleString(),
      roe: entity.roe,
      per: entity.per,
      yearAgoDividend: entity.year1.toLocaleString(),
      twoYearAgoDividend: entity.year2.toLocaleString(),
      threeYearAgoDividend: entity.year3.toLocaleString(),
      dividendAttendance: toBoolean(
        entity.year1 && entity.year2 && entity.year3 && entity.dividend
      ),
    };

    return result;
  });
}

export function toDividendSearchParams(params: DividendSearchParamsModel) {
  const result: DividendSearchParams = {
    increase: params.increase || false,
    increaseOrSame: params.increaseOrSame || false,
    keyword: params.keyword || "",
    payoutRatioGte: params.payoutRatioGte || 0,
    payoutRatioLte: params.payoutRatioLte || 100,
    sort: params.sort || DividendSearchParamsSortEnum.DIVIDEND,
    dividendAttendance: params.dividendAttendance || false,
  };

  return result;
}
