import { Card, Title, Text } from "@tremor/react";
import ButtonSection from "@/app/components/ButtonSection";
import SelectSection from "@/app/components/SelectSection";
import { loadData } from "@/lib/load-data";
import ChartSection from "./components/ChartSection";

export default async function Home() {
  const dateThreshold = "2023-01-01";
  // List of data points for the chart
  const pdDataset = await loadData(dateThreshold);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full ">
        <Card>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <Title className="mb-2">PD Chart</Title>
              <Text className="mb-4">
                Display the daily Historical PD and the monthly Forward PD
                starting from {dateThreshold}.
              </Text>
            </div>
            <SelectSection />
          </div>

          <ButtonSection />
          <ChartSection pdDataset={pdDataset} />
        </Card>
      </main>
    </div>
  );
}
