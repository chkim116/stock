import { Global } from "@emotion/react";
import { ReactNode } from "react";

import { GlobalStyles } from "@styles/GlobalStyles";
import "antd/dist/antd.css";
import "dayjs/locale/ko";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <Global styles={GlobalStyles} />
      {children}
    </>
  );
};
