"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";
import { useStore } from "@/store/StoreProvider";
import { Text } from "@tremor/react";

interface ChartSectionProps {
  pdDataset: Array<Array<object>>;
}

interface StoreState {
  currentDataIndex: number[];
}

export default function ChartSection({ pdDataset }: ChartSectionProps) {
  const state = useStore() as StoreState;
  const currentDataIndex = state.currentDataIndex;

  const bonding_data = pdDataset[1];
  const pd_data = pdDataset[0];
  return (
    <ResponsiveContainer width="100%" className="mt-12 text-sm" height={400}>
      <ComposedChart data={pd_data}>
        <Legend verticalAlign="top" align="right" />
        <XAxis dataKey="date" minTickGap={30} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="0" vertical={false} />
        {currentDataIndex.includes(0) && (
          <Area
            legendType="plainline"
            type="natural"
            dataKey="Historical PD"
            stroke="#14b8a6"
            strokeWidth={5}
            fill="#14b8a6"
          />
        )}
        {currentDataIndex.includes(0) && (
          <Area
            legendType="plainline"
            type="natural"
            dataKey="Forward PD"
            stroke="#8b5cf6"
            strokeWidth={5}
            fill="#8b5cf6"
          />
        )}
        {currentDataIndex.includes(1) && (
          <Area
            legendType="plainline"
            type="natural"
            dataKey="Stock Price"
            stroke="#9ca3af"
            strokeWidth={5}
            fill="#9ca3af"
          />
        )}
        {currentDataIndex.includes(2) && (
          <Bar legendType="square" dataKey="Actual Default" barSize={100} fill="#2563eb" />
        )}
        {currentDataIndex.includes(3) &&
          bonding_data.map((entry: any) => {
            return (
              <ReferenceLine
                y={entry["bonding"]}
                label={entry["rate"]}
                stroke="#9ca3af"
                strokeDasharray="3 3"
                strokeWidth={2}
              />
            );
          })}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
