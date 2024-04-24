"use client";

import styled from "@emotion/styled";
import { Spin } from "antd";

const Wrap = styled.div`
  min-height: 100vh;
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function DividendLoading() {
  return (
    <Wrap>
      <Spin size="large" />
      <h3>배당주를 스크랩하는 중입니다.</h3>
    </Wrap>
  );
}

export default DividendLoading;
