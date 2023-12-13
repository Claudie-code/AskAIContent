import React, { useEffect, useRef, useState } from "react";

interface Option {
  title: string;
  custom: boolean;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  setCookie: (key: string, value: string) => void;
  getCookie: (key: string) => string | undefined;
  cookieKeyAllOptions: string;
  cookieKeySelectedOption: string;
}

function CustomSelect({
  label,
  options,
  value,
  onChange,
  setCookie,
  getCookie,
  cookieKeyAllOptions,
  cookieKeySelectedOption,
}: CustomSelectProps) {
  const [allOptions, setAllOptions] = useState<Option[]>(options);
  const [isListVisible, setListVisibility] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [newOption, setNewOption] = useState<string>("");
  const toggleListVisibility = (value: boolean) => {
    setListVisibility(value);
  };
  const handleNewOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewOption(event.target.value);
  };

  const handleAddOption = () => {
    if (
      newOption.trim() !== "" &&
      !allOptions.some(
        (tone) =>
          tone.title.trim().toLowerCase() === newOption.trim().toLowerCase(),
      )
    ) {
      const newToneObject = { title: newOption.trim(), custom: true };
      setAllOptions((prevOptions) => [...prevOptions, newToneObject]);
      setCookie(
        cookieKeyAllOptions,
        JSON.stringify([...allOptions, newToneObject]),
      );
      onChange(newOption.trim());
      setNewOption("");
    }
  };

  const handleRemoveOption = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    const updatedTones = allOptions.filter((_, i) => i !== index);

    const newToneValue = updatedTones.length > 0 ? updatedTones[0].title : "";
    setAllOptions(updatedTones);
    onChange(newToneValue);
    setCookie(cookieKeySelectedOption, newToneValue);
    setCookie(cookieKeyAllOptions, JSON.stringify(updatedTones));
  };

  const handleClickOutside = (event: React.MouseEvent | MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      toggleListVisibility(false);
    }
  };

  useEffect(() => {
    // save all tones
    const storedOptions = getCookie(cookieKeyAllOptions);
    const parsedOptions = storedOptions ? JSON.parse(storedOptions) : null;
    const tonesToSet =
      Array.isArray(parsedOptions) &&
      parsedOptions.every((item) => typeof item === "object" && item.title)
        ? parsedOptions.map((item) => ({
            title: item.title,
            custom: item.custom,
          }))
        : options;
    setAllOptions(tonesToSet);
  }, []);

  useEffect(() => {
    // Clic outside select
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-wrap items-center gap-2">
      <div ref={inputRef} className="w-full">
        <button
          className="flex w-full cursor-pointer items-center justify-between rounded-md border bg-white p-2"
          onClick={() => toggleListVisibility(!isListVisible)}
        >
          <p>{value}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="0.7em"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </button>

        {isListVisible && (
          <ul className="absolute left-0 top-0 mt-12 h-56 w-full overflow-y-scroll rounded-md border bg-white shadow-md">
            <div className="flex p-2">
              <input
                type="text"
                id={label.toLowerCase()}
                name={label.toLowerCase()}
                value={newOption}
                onChange={handleNewOptionChange}
                className="mr-2 flex-1 rounded-md border border-gray-300"
              />
              <button
                onClick={handleAddOption}
                className="rounded-md border border-border bg-elementBg p-2 text-subtleText hover:border-hoveredBorder hover:bg-hoveredElementBg active:bg-activeElementBg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
            </div>
            {allOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onChange(option.title);
                  toggleListVisibility(!isListVisible);
                }}
                className="flex items-center justify-between p-2 hover:bg-gray-100"
              >
                <span>{option.title}</span>
                {option.custom && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveOption(e, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CustomSelect;
