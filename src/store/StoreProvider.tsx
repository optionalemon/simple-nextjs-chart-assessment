import { create } from 'zustand'

const useStore = create((set) => ({
    currentData: [0],
    addData: (data: number) => set((state: { currentData: number[] }) => ({ currentData: [...state.currentData, data] })),
    removeData: (data: number) => set((state: { currentData: number[] }) => ({ currentData: state.currentData.filter((d) => d !== data) })),
    data: null,
    // static data, set once
    setData: (data: Array<Array<{ [key: string]: number }>>) => set({ data }),
}))

export { useStore };