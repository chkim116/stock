import apis from "@features/apis";
import { DividendSearchParamsModel } from "@features/models/dividend.model";
import {
  toDividendSearchModel,
  toDividendSearchParams,
} from "./dividend.mapper";

export const dividendRepository = {
  fetchDividend: async (params: DividendSearchParamsModel) => {
    const { data, time } = await apis.dividend.fetchDividend(
      toDividendSearchParams(params)
    );

    return {
      dividendList: toDividendSearchModel(data),
      time,
    };
  },
};
