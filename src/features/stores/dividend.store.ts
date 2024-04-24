import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import {
  DividendSearchModel,
  DividendSearchParamsModel,
} from "@features/models/dividend.model";
import { createDividendSearchParamsModel } from "@features/models/dividend.create";

export interface DividendSearchState {
  params: DividendSearchParamsModel;
  dividendList: DividendSearchModel[];
  time: string;
}

interface DividendSearchAction {
  reset: () => void;
  setTime: (time: string) => void;
  setDividendList: (dividendList: DividendSearchModel[]) => void;
}

export interface DividendSearchStore extends DividendSearchState {
  actions: DividendSearchAction;
}

export const createDividendSearchStoreInitialState = () => {
  const result: DividendSearchState = {
    dividendList: [],
    time: "",
    params: createDividendSearchParamsModel(),
  };

  return result;
};

export const createDividendSearchStore = (
  initState: DividendSearchState = createDividendSearchStoreInitialState()
) =>
  createStore<DividendSearchStore>()(
    persist(
      (set) => ({
        ...initState,
        actions: {
          reset: () => {
            set(createDividendSearchStoreInitialState());
          },
          setDividendList: (dividendList: DividendSearchModel[]) => {
            set((state) => ({
              ...state,
              dividendList,
            }));
          },
          setTime: (time: string) => {
            set((state) => ({
              ...state,
              time,
            }));
          },
        },
      }),
      {
        name: "DividendSearch",
        partialize: ({ actions: _, ...rest }: DividendSearchStore) => rest,
      }
    )
  );
