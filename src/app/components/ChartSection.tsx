"use client";

import { AreaChart } from "@tremor/react";
import { useStore } from "@/store/StoreProvider";

interface ChartSectionProps {
  pdDataset: Array<Array<object>>;
}

interface StoreState {
  currentDataIndex: number[];
}

const indexToKey: Record<number, string[]> = {
    0: ["Historical PD", "Forward PD"],
    1: ["Stock Price"],
    2: ["Actual Default"]
};

export default function ChartSection({ pdDataset }: ChartSectionProps) {
  const state = useStore() as StoreState;
  const currentDataIndex  = state.currentDataIndex;

  const mergedCategories = currentDataIndex.flatMap((index) => {
    const pdEntry = indexToKey[index];
    return pdEntry;
  });

  return (
    <AreaChart
      className="h-80"
      defaultValue={0}
      data={pdDataset}
      categories={mergedCategories}
      index="date"
      colors={["teal", "violet", "blue", "red"]}
      allowDecimals={false}
      yAxisWidth={60}
      tickGap={30}
      noDataText="No data available."
    />
  );
}
