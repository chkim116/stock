import { DividendSearchParamsSortEnum } from "@features/apis/entities";

export const DIVIDEND_SEARCH_SORT_OPTIONS = [
  {
    value: DividendSearchParamsSortEnum.DIVIDEND,
    label: "배당금",
  },
  {
    value: DividendSearchParamsSortEnum.PER,
    label: "PER",
  },
  {
    value: DividendSearchParamsSortEnum.ROE,
    label: "ROE",
  },
  {
    value: DividendSearchParamsSortEnum.PAYOUT_RATIO,
    label: "배당성향",
  },
];
