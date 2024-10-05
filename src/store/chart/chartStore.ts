// store/useChartStore.ts
import { createStore } from "zustand";

interface ChartState {
    referenceModalOpen: boolean;
    dateThreshold: string;
    displayStock: boolean;
    displayAD: boolean;
    displayPDiR: boolean;
}

export const defaultChartState: ChartState = {
    referenceModalOpen: false,
    dateThreshold: '2023-01-01',
    displayStock: false,
    displayAD: false,
    displayPDiR: false,
}

interface ChartActions {
    setReferenceModalOpen: (referenceModalOpen: boolean) => void;
    setDateThreshold: (dateThreshold: string) => void;
    setDisplayStock: (displayStock: boolean) => void;
    setDisplayAD: (displayAD: boolean) => void;
    setDisplayPDiR: (displayPDiR: boolean) => void;
}

export type ChartStore = ChartState & ChartActions;

export const createChartStore = (initState: ChartState = defaultChartState) => {
    return createStore<ChartStore>()((set) => ({
      ...initState,
        setReferenceModalOpen: (referenceModalOpen: boolean) => set({ referenceModalOpen }),
        setDateThreshold: (dateThreshold: string) => set({ dateThreshold }),
        setDisplayStock: (displayStock: boolean) => set({ displayStock }),
        setDisplayAD: (displayAD: boolean) => set({ displayAD }),
        setDisplayPDiR: (displayPDiR: boolean) => set({ displayPDiR }),
    }));
  };
  