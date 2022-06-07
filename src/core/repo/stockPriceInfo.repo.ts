import { STOCK_PRICE_INFO_URL } from "@configs/constants";
import { api } from "@core/api";
import { StockPriceInfo } from "@core/entities";
import { stockPriceInfoGetParams } from "@core/entities/stockPriceInfo/stockPriceInfoGetParams";

export const stockPriceInfoRepository = {
  getFetch(params: stockPriceInfoGetParams) {
    api.get<StockPriceInfo>(STOCK_PRICE_INFO_URL, {
      params: { ...params, serviceKey: process.env.NEXT_PUBLIC_STOCK_INFO_KEY },
    });
  },
};
