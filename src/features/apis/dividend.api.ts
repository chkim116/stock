import { orderBy } from "lodash-es";
import { toBoolean } from "safers";
import { DividendSearchParams } from "./entities";
import { getDividendScraperService } from "./services/getDividendScraperService";

const scrapperService = getDividendScraperService();

async function fetchDividend(params: DividendSearchParams) {
  let result = await scrapperService.scrape();

  const {
    increase,
    increaseOrSame,
    keyword,
    payoutRatioGte,
    payoutRatioLte,
    sort,
    dividendAttendance,
  } = params;

  if (keyword) {
    result = result.filter((item) => {
      return item.name.includes(keyword);
    });
  }

  if (dividendAttendance) {
    result = result.filter((item) => {
      return toBoolean(item.year1 && item.year2 && item.year3 && item.dividend);
    });
  }

  if (increaseOrSame) {
    result = result.filter((item) => {
      return (
        item.year3 <= item.year2 &&
        item.year2 <= item.year1 &&
        item.year1 <= item.dividend
      );
    });
  }

  if (increase) {
    result = result.filter((item) => {
      return (
        item.year3 < item.year2 &&
        item.year2 < item.year1 &&
        item.year1 < item.dividend
      );
    });
  }

  if (sort) {
    result = orderBy(result, sort, "desc");
  }

  result = result.filter((item) => {
    return (
      item.payoutRatio <= payoutRatioLte && item.payoutRatio >= payoutRatioGte
    );
  });

  return {
    data: result,
    time: scrapperService.getScrapedTime(),
  };
}

export const dividendApis = {
  fetchDividend,
};
