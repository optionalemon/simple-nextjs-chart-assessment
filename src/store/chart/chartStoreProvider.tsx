'use client';

import { createContext, ReactNode, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

import { createChartStore, ChartStore } from "@/store/chart/chartStore";

export type ChartStoreApi = StoreApi<ChartStore>;
export const ChartStoreContext = createContext<ChartStoreApi | null>(null);

export const ChartStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ChartStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createChartStore();
  }

  return (
    <ChartStoreContext.Provider value={storeRef.current}>
      {children}
    </ChartStoreContext.Provider>
  );
};

export const useChartStore = <T,>(selector: (store: ChartStore) => T): T => {
  const context = useContext(ChartStoreContext);

  if (!context) {
    throw new Error(`useChartStore must be used within ChartStoreProvider`);
  }

  return useStore(context, selector);
};
