import { STOCK_PRICE_INFO_URL } from "@configs/constants";
import { api } from "@core/api";

import { StockPriceInfo, stockPriceInfoGetParams } from "@core/entities";

export const stockPriceInfoRepository = {
  getFetch(params?: stockPriceInfoGetParams) {
    return api.get<StockPriceInfo>(
      `${STOCK_PRICE_INFO_URL}?serviceKey=${process.env.NEXT_PUBLIC_STOCK_INFO_KEY}`,
      {
        params: {
          ...params,
          resultType: "json",
        },
      }
    );
  },
};
