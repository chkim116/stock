"use client";

import { actDividendFetch } from "@features/actions/dividend.action";
import DividendSearchForm from "@features/components/dividend/DividendSearchForm";
import { useDividendSearchStore } from "@features/contexts/DividendSearchStore.context";
import { DividendSearchParamsModel } from "@features/models/dividend.model";
import { useAction } from "next-safe-action/hooks";

function DividendSearchFormContainer() {
  const params = useDividendSearchStore((store) => store.params);
  const actions = useDividendSearchStore((store) => store.actions);

  const { execute } = useAction(actDividendFetch, {
    onSuccess(data) {
      actions.setDividendList(data.dividendList);
      actions.setTime(data.time);
    },
  });

  const handleSubmit = (params: DividendSearchParamsModel) => {
    execute(params);
  };

  return <DividendSearchForm params={params} onSubmit={handleSubmit} />;
}

export default DividendSearchFormContainer;
