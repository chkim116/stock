import apis from "@features/apis";
import { DividendSearchParamsModel } from "@features/models/dividend.model";
import { toDividendSearchModel } from "./dividend.mapper";

export const dividendRepository = {
  fetchDividend: async (params: DividendSearchParamsModel) => {
    const result = await apis.dividend.fetchDividend(params);

    return toDividendSearchModel(result);
  },
};
