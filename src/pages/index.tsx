import useSWR from "swr";

import { getFetcher } from "@core/api";
import { StockPriceInfo } from "@core/entities";

const Main = () => {
  const { data } = useSWR<StockPriceInfo>(`/api/stocks`, getFetcher);

  console.log(data);

  return <div>Test</div>;
};
export default Main;
