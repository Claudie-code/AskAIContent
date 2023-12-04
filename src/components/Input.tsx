// Input.tsx
import React from "react";

interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <div className="h-32 rounded-lg bg-gray-100 p-2">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {label === "Article Length" ? (
        <>
          <input
            type="range"
            min="100"
            max="1000"
            id={label.toLowerCase()}
            name={label.toLowerCase()}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{value} words</span>
        </>
      ) : (
        <input
          value={value}
          type="text"
          id={label.toLowerCase()}
          name={label.toLowerCase()}
          className="mt-1 w-full rounded-md border p-2"
          required
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default Input;
