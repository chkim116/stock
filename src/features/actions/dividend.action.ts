"use server";
import "server-only";

import { safeAction } from "@core/lib/safeAction";
import { DividendSearchParamsModel } from "@features/models/dividend.model";
import repo from "@features/repositories";
import { z } from "zod";
import { DividendSearchParamsSortEnum } from "@features/apis/entities";

const dividendSchema = z.object({
  keyword: z.string().optional(),
  increase: z.boolean().optional(),
  increaseOrSame: z.boolean().optional(),
  payoutRatioGte: z.number().optional(),
  payoutRatioLte: z.number().optional(),
  sort: z
    .enum([
      DividendSearchParamsSortEnum.DIVIDEND,
      DividendSearchParamsSortEnum.PAYOUT_RATIO,
      DividendSearchParamsSortEnum.PER,
      DividendSearchParamsSortEnum.ROE,
    ])
    .optional(),
  dividendAttendance: z.boolean().optional(),
});

export const actDividendFetch = safeAction(
  dividendSchema,
  (params: DividendSearchParamsModel) => {
    const result = repo.dividend.fetchDividend(params);

    return result;
  }
);
