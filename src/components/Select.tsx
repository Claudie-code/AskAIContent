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
    <div className="h-32 rounded-lg bg-gray-100 p-2">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={value}
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
