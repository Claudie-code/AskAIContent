// Select.tsx
import React, { useEffect } from "react";

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="text-subtleText mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      <select
        value={value}
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border p-2"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
