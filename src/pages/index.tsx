import { Button, Col, Row, Tabs } from "antd";
import { useState } from "react";
import useSWR from "swr";
import styled from "@emotion/styled";

import { StockTable } from "@components/StockTable";
import { day, getFetcher, StockEntity } from "core";
import { useStockColumns } from "@hooks/useStockColumns";

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em 0.5em;
`;

const Home = () => {
  const [type, setType] = useState("top");
  const { data } = useSWR<StockEntity>(
    `/api/stocks?type=${type}&filter=${type === "most" ? "true" : ""}`,
    getFetcher
  );
  const columns = useStockColumns(data?.headText || []);

  const handleTabClick = (key: string) => {
    setType(key);
  };

  return (
    <Wrap>
      <h1>
        {day().format("YY-MM-DD")}일 ({day().format("dd")}) 주식 현황
      </h1>

      <Row justify="end">
        <Col>
          <Button>
            <a
              target="_blank"
              href="https://dart.fss.or.kr/main.do"
              rel="noreferrer"
            >
              공시 사이트(Dart)
            </a>
          </Button>
        </Col>
      </Row>

      <Tabs defaultActiveKey={type} onTabClick={handleTabClick}>
        <Tabs.TabPane key="top" tab="상한가">
          <StockTable data={data?.bodyTexts || []} columns={columns} />
        </Tabs.TabPane>
        <Tabs.TabPane key="most" tab="거래량">
          <StockTable data={data?.bodyTexts || []} columns={columns} />
        </Tabs.TabPane>
      </Tabs>
    </Wrap>
  );
};

export default Home;
