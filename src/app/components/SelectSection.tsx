import { Select, SelectItem, DateRangePicker } from "@tremor/react";

export default function SelectSection() {
  return (
    <div className="flex justify-end flex-row gap-4">
    <DateRangePicker enableSelect={false} />
      <Select defaultValue="1" className="w-20">
        <SelectItem value="1">PD Horizon</SelectItem>
      </Select>
    </div>
  );
}
