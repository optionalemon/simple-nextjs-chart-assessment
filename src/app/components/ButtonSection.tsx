// components/ButtonSection.tsx (Client Component)
"use client"; // This makes the component a Client Component

import { ReactNode, MouseEventHandler, useState } from "react";
import { Button, Dialog, DialogPanel, Switch, Text } from "@tremor/react";
import { CgAddR, CgPen } from "react-icons/cg";
import { useStore } from "@/store/StoreProvider";
import { current } from "tailwindcss/colors";

interface MainButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: ReactNode;
}
interface StoreState {
  currentDataIndex: number[];
  addData: (data: number) => void;
  removeData: (data: number) => void;
}

const MainButton = ({ children, onClick, icon }: MainButtonProps) => {
  return (
    <Button variant="secondary" color="slate" onClick={onClick}>
      <div className="flex flex-row justify-between gap-2 items-center w-24">
        {children}
        {icon}
      </div>
    </Button>
  );
};

const toggles = [
  { label: "Stock Price", index: 1 },
  { label: "Actual Default", index: 2 },
  { label: "PDiR Bonding", index: 3 },
];

interface DataToggleProps {
  label: string;
  index: number;
  currentDataIndex: number[];
  addData: (data: number) => void;
  removeData: (data: number) => void;
}

const DataToggle = ({
  label,
  index,
  currentDataIndex,
  addData,
  removeData,
}: DataToggleProps) => {
  const isToggled = currentDataIndex.includes(index);

  const handleToggle = () => {
    if (isToggled) {
      removeData(index);
    } else {
      addData(index);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center mt-4">
      <Text>{label}</Text>
      <Switch defaultChecked={isToggled} onChange={handleToggle} />
    </div>
  );
};

export default function ButtonSection() {
  const [isOpen, setIsOpen] = useState(false);
  const state = useStore() as StoreState;
  const currentDataIndex = state.currentDataIndex;
  const addData = state.addData;
  const removeData = state.removeData;

  return (
    <>
      <div className="flex justify-start flex-row gap-4">
        <MainButton onClick={() => {}} icon={<CgAddR />}>
          {" "}
          Series{" "}
        </MainButton>
        <MainButton onClick={() => setIsOpen(true)} icon={<CgPen />}>
          {" "}
          Reference{" "}
        </MainButton>
      </div>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Reference
          </h3>
          {toggles.map((toggle) => (
            <DataToggle
              key={toggle.index}
              label={toggle.label}
              index={toggle.index}
              currentDataIndex={currentDataIndex}
              addData={addData}
              removeData={removeData}
            />
          ))}
          <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>
            Done
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
}
