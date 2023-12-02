// Filter.tsx
import React from "react";
import Input from "./Input";
import Select from "./Select";

interface FilterProps {
  label: string;
  type: "input" | "select";
  options?: string[];
  value: string | number;
  onChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  label,
  type,
  options,
  value,
  onChange,
}) => {
  return type === "input" ? (
    <Input label={label} value={value as string} onChange={onChange} />
  ) : (
    <Select
      label={label}
      options={options as string[]}
      value={value as string}
      onChange={onChange}
    />
  );
};

export default Filter;
