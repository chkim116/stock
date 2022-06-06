import { Global } from "@emotion/react";
import { ReactNode } from "react";
import { GlobalStyles } from "styles/GlobalStyles";

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
