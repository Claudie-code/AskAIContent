// Filter.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./components/Filter";

test("renders Filter component with input type", () => {
  const props = {
    label: "Test Label",
    type: "input",
    value: "Test Value",
    onChange: jest.fn(),
    cookieKeySelectedOption: "testCookieKey",
  };
  render(<Filter {...props} />);
  const inputElement = screen.getByLabelText(/Test/i);
  expect(inputElement).toBeInTheDocument();
  userEvent.type(inputElement, "New Value");
  expect(props.onChange).toHaveBeenCalledWith("New Value");
});

test("renders Filter component with select type", () => {
  const props = {
    label: "Test Label",
    type: "select" as const,
    options: ["Option1", "Option2"],
    value: "Test Value",
    onChange: (value: string) => {},
    cookieKeySelectedOption: "testCookieKey",
  };

  // Rend le composant avec les propriétés
  render(<Filter {...props} />);
  const selectElement = screen.getByLabelText(/Test/i);
  expect(selectElement).toBeInTheDocument();
  userEvent.selectOptions(selectElement, "Option2");
  expect(props.onChange).toHaveBeenCalledWith("Option2");
});

test("renders Filter component with customSelect type", () => {
  const onChangeMock = jest.fn();

  render(
    <Filter
      label="Test"
      type="customSelect"
      objetcOptions={[
        { title: "Option1", custom: false },
        { title: "Option2", custom: true },
      ]}
      value="Option1"
      onChange={onChangeMock}
      cookieKeyAllOptions="allOptions"
      cookieKeySelectedOption="selectedOption"
    />,
  );
  const customSelectButton = screen.getByRole("button");
  expect(customSelectButton).toBeInTheDocument();
  userEvent.click(customSelectButton);

  const newOptionInput = screen.getByRole("textbox");
  userEvent.type(newOptionInput, "New Option");

  const addOptionButton = screen.getByRole("button", { name: /add option/i });
  userEvent.click(addOptionButton);

  expect(onChangeMock).toHaveBeenCalledWith("New Option");
});

// Input.test.tsx
import Input from "./components/Input";

test("renders Input component", () => {
  const onChangeMock = jest.fn();
  render(<Input label="Test" value="Input" onChange={onChangeMock} />);
  const inputElement = screen.getByLabelText(/Test/i);
  expect(inputElement).toBeInTheDocument();
  userEvent.type(inputElement, "New Value");
  expect(onChangeMock).toHaveBeenCalledWith("New Value");
});

// Select.test.tsx
import Select from "./components/Select";

test("renders Select component", () => {
  const onChangeMock = jest.fn();
  render(
    <Select
      label="Test"
      options={["Option1", "Option2"]}
      value="Option1"
      onChange={onChangeMock}
    />,
  );
  const selectElement = screen.getByLabelText(/Test/i);
  expect(selectElement).toBeInTheDocument();
  userEvent.selectOptions(selectElement, "Option2");
  expect(onChangeMock).toHaveBeenCalledWith("Option2");
});

// CustomSelect.test.tsx
import CustomSelect from "./components/CustomSelect";

test("renders CustomSelect component", () => {
  const onChangeMock = jest.fn();
  const setCookieMock = jest.fn();
  const getCookieMock = jest.fn();
  render(
    <CustomSelect
      label="Test"
      options={[
        { title: "Option1", custom: false },
        { title: "Option2", custom: true },
      ]}
      value="Option1"
      onChange={onChangeMock}
      setCookie={setCookieMock}
      getCookie={getCookieMock}
      cookieKeyAllOptions="allOptions"
      cookieKeySelectedOption="selectedOption"
    />,
  );
  const customSelectButton = screen.getByRole("button");
  expect(customSelectButton).toBeInTheDocument();
  userEvent.click(customSelectButton);

  const newOptionInput = screen.getByRole("textbox");
  userEvent.type(newOptionInput, "New Option");

  const addOptionButton = screen.getByRole("button", { name: /add option/i });
  userEvent.click(addOptionButton);

  expect(onChangeMock).toHaveBeenCalledWith("New Option");
  expect(setCookieMock).toHaveBeenCalledWith("allOptions", expect.any(String));
});
