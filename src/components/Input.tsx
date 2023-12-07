// Input.tsx
import React from "react";

interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="mb-2 block text-sm font-medium text-subtleText"
      >
        {label}
      </label>
      <input
        value={value}
        type="text"
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        className="mt-1 w-full rounded-md border p-2"
        required
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
