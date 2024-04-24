import { actDividendFetch } from "@features/actions/dividend.action";
import DividendSearchFormContainer from "@features/containers/dividend/DividendSearchFormContainer";
import DividendSearchTableContainer from "@features/containers/dividend/DividendSearchTableContainer";
import { DividendSearchStoreProvider } from "@features/contexts/DividendSearchStore.context";
import { createDividendSearchParamsModel } from "@features/models/dividend.create";

export const dynamic = "force-dynamic";

async function DividendSearchPage() {
  const { data } = await actDividendFetch(createDividendSearchParamsModel());

  if (!data) {
    throw new Error("Failed to fetch dividend data");
  }

  return (
    <DividendSearchStoreProvider
      hydrateData={{
        dividendList: data.dividendList,
        time: data.time,
      }}
    >
      <DividendSearchFormContainer />
      <DividendSearchTableContainer />
    </DividendSearchStoreProvider>
  );
}

export default DividendSearchPage;
