"use client";

import styled from "@emotion/styled";
import { ReactNode } from "react";

interface DividendLayoutProps {
  children?: ReactNode;
}

const Wrap = styled.main`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
`;

function DividendLayout({ children }: DividendLayoutProps) {
  return <Wrap>{children}</Wrap>;
}

export default DividendLayout;
