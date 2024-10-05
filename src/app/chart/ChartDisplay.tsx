import { AreaChart, Card, Title, Text } from "@tremor/react";
import ButtonSection from "@/app/components/ButtonSection";
import SelectSection from "@/app/components/SelectSection";
import { getPdChartData } from "@/lib/load-data";

export default async function ChartDisplay() {
  const dateThreshold = '2023-01-01'
  const pdDataset = await getPdChartData(dateThreshold);

  return (
    <Card>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Title className="mb-2">PD Chart</Title>
          <Text className="mb-4">
            Display the daily Historical PD and the monthly Forward PD starting from{" "}
            {dateThreshold}.
          </Text>
        </div>
        <SelectSection />
      </div>

      <ButtonSection />
      <AreaChart
        className="h-80"
        defaultValue={0}
        data={pdDataset}
        categories={["Historical PD", "Forward PD"]} 
        index="date"
        colors={["teal", "violet"]}
        allowDecimals={false}
        yAxisWidth={60}
        tickGap={30}
        noDataText="No data available."
      />
    </Card>
  );
}
