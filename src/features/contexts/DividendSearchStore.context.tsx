"use client";

import {
  DividendSearchState,
  DividendSearchStore,
  createDividendSearchStore,
} from "@features/stores/dividend.store";
import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useLayoutEffect,
} from "react";
import { type StoreApi, useStore } from "zustand";

interface DividendSearchStoreProviderProps {
  hydrateData?: Partial<DividendSearchState>;
  children: ReactNode;
}

export const DividendSearchStoreCtx =
  createContext<StoreApi<DividendSearchStore> | null>(null);

export const DividendSearchStoreProvider = ({
  hydrateData,
  children,
}: DividendSearchStoreProviderProps) => {
  const refStore = useRef<StoreApi<DividendSearchStore>>();
  const refHydrateData = useRef(hydrateData);
  refHydrateData.current = hydrateData;

  if (!refStore.current) {
    refStore.current = createDividendSearchStore();
  }

  useLayoutEffect(() => {
    if (!refStore.current) {
      throw new Error("refStore.current이 존재하지 않습니다.");
    }

    const { actions, ...state } = refStore.current.getState();

    refStore.current.setState({
      ...state,
      ...refHydrateData.current,
    });
  }, []);

  return (
    <DividendSearchStoreCtx.Provider value={refStore.current}>
      {children}
    </DividendSearchStoreCtx.Provider>
  );
};

export const useDividendSearchStore = <T,>(
  selector: (store: DividendSearchStore) => T
): T => {
  const ctx = useContext(DividendSearchStoreCtx);

  if (!ctx) {
    throw new Error(
      "useDividendSearchStore는 DividendSearchStoreProvider로 감싸져 있어야 합니다."
    );
  }

  return useStore(ctx, selector);
};
