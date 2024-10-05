// components/ButtonSection.tsx (Client Component)
"use client"; // This makes the component a Client Component

import { ReactNode, MouseEventHandler } from "react";
import { Button } from "@tremor/react";
import { CgAddR, CgPen } from "react-icons/cg";

interface MainButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: ReactNode;
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
  return (
    <div className="flex justify-start flex-row gap-4">
      <MainButton onClick={() => {}} icon={<CgAddR />}>
        {" "}
        Series{" "}
      </MainButton>
      <MainButton onClick={() => {}} icon={<CgPen />}>
        {" "}
        Reference{" "}
      </MainButton>
    </div>
  );
}
