// Filter.tsx
import React, { useEffect } from "react";
import Input from "./Input";
import Select from "./Select";
import CustomSelect from "./CustomSelect";
import Cookies from "js-cookie";

interface Option {
  title: string;
  custom: boolean;
}

interface FilterProps {
  label: string;
  type: "input" | "select" | "customSelect";
  options?: string[] | Option[];
  value: string | number;
  onChange: (value: string) => void;
  cookieKeyAllOptions?: string;
  cookieKeySelectedOption: string;
}

const Filter: React.FC<FilterProps> = ({
  label,
  type,
  options,
  value,
  onChange,
  cookieKeyAllOptions,
  cookieKeySelectedOption,
}) => {
  const getCookie = (key: string) => Cookies.get(key);
  const setCookie = (key: string, value: string | number) =>
    Cookies.set(key, value.toString());

  useEffect(() => {
    const storeOption = getCookie(cookieKeySelectedOption) || "";
    onChange(storeOption);
  }, []);

  switch (type) {
    case "input":
      return <Input label={label} value={value} onChange={onChange} />;
    case "select":
      return (
        <Select
          label={label}
          value={value as string}
          options={options as string[]}
          onChange={onChange}
        />
      );
    case "customSelect":
      return (
        <CustomSelect
          label={label}
          value={value as string}
          options={options as Option[]}
          onChange={onChange}
          cookieKeySelectedOption={cookieKeySelectedOption}
          cookieKeyAllOptions={cookieKeyAllOptions as string}
          setCookie={setCookie}
          getCookie={getCookie}
        />
      );
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

export default Filter;
