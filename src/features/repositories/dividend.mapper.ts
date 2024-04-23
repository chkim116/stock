import { DividendEntity } from "@features/apis/entities";
import { DividendSearchModel } from "@features/models/dividend.model";

export function toDividendSearchModel(entities: DividendEntity[]) {
  return entities.map((entity) => {
    const result: DividendSearchModel = {
      code: entity.code,
      name: entity.name,
      currentStock: entity.currentStock,
      payoutMonth: entity.payoutMonth,
      payoutRatio: entity.payoutRatio + "%",
      dividend: entity.dividend,
      roe: entity.roe + "%",
      per: entity.per,
      yearAgoDividend: entity.year1,
      twoYearAgoDividend: entity.year2,
      threeYearAgoDividend: entity.year3,
    };

    return result;
  });
}
