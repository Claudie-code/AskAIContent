import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <input
      value={value}
      type="text"
      id={label.toLowerCase()}
      name={label.toLowerCase()}
      className="w-full rounded-md border p-2"
      placeholder={`Enter ${label.toLowerCase()}`}
      required
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
