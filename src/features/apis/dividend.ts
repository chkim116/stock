import { DividendSearchParams } from "./entities";
import { DividendScraperService } from "./services/DividendScraperService";

async function fetchDividend(params: DividendSearchParams) {
  const scrapperService = new DividendScraperService();

  let result = await scrapperService.scrape();

  const { increase, increaseOrSame, keyword, limitPayoutRatio } = params;

  if (keyword) {
    result = result.filter((item) => {
      return item.name.includes(keyword);
    });
  }

  if (increaseOrSame) {
    result = result.filter((item) => {
      return item.year3 <= item.year2 && item.year2 <= item.year1;
    });
  }

  if (increase) {
    result = result.filter((item) => {
      return item.year3 < item.year2 && item.year2 < item.year1;
    });
  }

  if (limitPayoutRatio) {
    result = result.filter((item) => {
      return Number(item.payoutRatio) <= limitPayoutRatio;
    });
  }

  return result;
}

export const dividendApis = {
  fetchDividend,
};
