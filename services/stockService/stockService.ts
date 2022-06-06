import axios from "axios";

import { StockUrlType } from "configs";
import { HeadText } from "core";
import { convertToTableTexts } from "./stockService.convert";

function sortByTradeCount(
  bodyTexts: Record<HeadText, string>[],
  type: "M" | "K"
) {
  const results = bodyTexts.filter((text) => text.거래량.includes(type));

  const sortResults = results.sort((a, b) => {
    const cur = a.거래량.replace(type, "");
    const next = b.거래량.replace(type, "");
    return Number(next) - Number(cur);
  });

  return sortResults;
}

export const stockService = (url: StockUrlType, filter: boolean = true) => {
  const results = axios.get(url).then((res) => {
    const { headText, bodyTexts } = convertToTableTexts(res.data);

    return {
      headText,
      bodyTexts: filter ? sortByTradeCount(bodyTexts, "M") : bodyTexts,
    };
  });

  return results;
};
