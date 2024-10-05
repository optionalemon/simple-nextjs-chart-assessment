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
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Reference</h3>
        <div className="flex flex-row justify-between items-center mt-4">
          <Text>Stock Price</Text>
          <Switch defaultChecked={currentDataIndex.includes(1)} onChange={() => {
            if (currentDataIndex.includes(1)) {
              removeData(1);
            } else {
              addData(1);
            }
          }} />
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <Text>Actual Default</Text>
          <Switch defaultChecked={currentDataIndex.includes(2)} onChange={() => {
            if (currentDataIndex.includes(2)) {
              removeData(2);
            } else {
              addData(2);
            }
          }}/>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <Text>PDiR Bonding</Text>
          <Switch />
        </div>
        <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </DialogPanel>
    </Dialog>
    </>
  );
}
