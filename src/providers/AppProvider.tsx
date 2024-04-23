"use client";
import { Global } from "@emotion/react";
import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { GlobalStyles } from "@providers/styles/GlobalStyles";
import "dayjs/locale/ko";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <Global styles={GlobalStyles} />
      <AntdRegistry>{children}</AntdRegistry>
    </>
  );
};
