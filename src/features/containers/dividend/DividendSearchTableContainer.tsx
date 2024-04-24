"use client";

import DividendSearchTable from "@features/components/dividend/DividendSearchTable";
import { useDividendSearchStore } from "@features/contexts/DividendSearchStore.context";
import { Flex } from "antd";

function DividendSearchTableContainer() {
  const { dividendList, time } = useDividendSearchStore((store) => store);

  return (
    <Flex vertical>
      <h1>welcome to dividend search table container</h1>
      <p>{time}</p>
      <DividendSearchTable dividendList={dividendList} />
    </Flex>
  );
}

export default DividendSearchTableContainer;
