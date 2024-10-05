import { create } from 'zustand';

const useStore = create((set) => ({
    currentDataIndex: [0],
    addData: (data: number) => set((state: { currentDataIndex: number[] }) => ({ currentDataIndex: [...state.currentDataIndex, data] })),
    removeData: (data: number) => set((state: { currentDataIndex: number[] }) => ({ currentDataIndex: state.currentDataIndex.filter((d) => d !== data) })),
}))

export { useStore };