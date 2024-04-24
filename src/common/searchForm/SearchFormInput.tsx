"use client";

import { ChangeEventHandler, ClipboardEventHandler, ReactNode } from "react";
import { Input } from "antd";
import { useInitialState } from "@common/hooks/useInitialState";
import { replaceSelectedText } from "@common/utils/replaceSelectedText";
import { BaseSearchFormItemProps, SearchFormItem } from "./SearchFormItem";

export interface SearchFormInputChangeArgs {
  name: string;
  value: string;
}

export interface BaseSearchFormInputProps extends BaseSearchFormItemProps {
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  addonAfter?: ReactNode;
  onChange?: (args: SearchFormInputChangeArgs) => void;
  onBlur?: () => void;
}

export interface SearchFormInputProps extends BaseSearchFormInputProps {
  /**
   * @param args - `name`은 내려보내는 `name` props
   */
  onPaste?: (args: SearchFormInputChangeArgs) => void;
}

export const SearchFormInput = ({
  label = "",
  maxWidth = "100%",
  name = "",
  value: outValue = "",
  onChange,
  onPaste,
  ...props
}: SearchFormInputProps) => {
  const [value, setValue] = useInitialState(outValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setValue(value);
    onChange?.({ name, value });
  };

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
    if (onPaste) {
      e.preventDefault();

      const clipboardValue = e.clipboardData.getData("text");

      const newValue = replaceSelectedText(
        e.currentTarget.selectionStart || 0,
        e.currentTarget.selectionEnd || 0,
        value,
        clipboardValue
      );
      setValue(newValue);
      onPaste({ name, value: newValue });
    }
  };

  return (
    <SearchFormItem maxWidth={maxWidth} label={label}>
      <Input
        allowClear
        name={name}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        {...props}
      />
    </SearchFormItem>
  );
};
