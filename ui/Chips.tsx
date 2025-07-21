import React from 'react';
import '@/styles/chip.css'

type ChipsProps = {
  label: string;
};

const Chips = ({ label }: ChipsProps) => {
  return (
    <span className="chip">
      {label}
    </span>
  );
};

export default Chips;