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
  type: string;
  options?: string[];
  objetcOptions?: Option[];
  value: string;
  onChange: (value: string) => void;
  cookieKeyAllOptions?: string;
  cookieKeySelectedOption: string;
}

const Filter: React.FC<FilterProps> = ({
  label,
  type,
  options,
  objetcOptions,
  value,
  onChange,
  cookieKeyAllOptions,
  cookieKeySelectedOption,
}) => {
  const getCookie = (key: string) => Cookies.get(key);
  const setCookie = (key: string, value: string) =>
    Cookies.set(key, value.toString());

  useEffect(() => {
    const storeOption = getCookie(cookieKeySelectedOption) ?? value;
    onChange(storeOption);
  }, []);

  return type === "select" && options ? (
    <Select
      label={label}
      value={value as string}
      options={options}
      onChange={onChange}
    />
  ) : type === "customSelect" && objetcOptions ? (
    <CustomSelect
      label={label}
      value={value as string}
      options={objetcOptions}
      onChange={onChange}
      cookieKeySelectedOption={cookieKeySelectedOption}
      cookieKeyAllOptions={cookieKeyAllOptions as string}
      setCookie={setCookie}
      getCookie={getCookie}
    />
  ) : type === "input" ? (
    <Input label={label} value={value} onChange={onChange} />
  ) : null;
};

export default Filter;
