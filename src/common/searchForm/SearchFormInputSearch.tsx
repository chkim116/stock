"use client";

import { ChangeEventHandler, ClipboardEventHandler } from "react";
import { Input } from "antd";
import { useInitialState } from "@common/hooks/useInitialState";
import { replaceSelectedText } from "@common/utils/replaceSelectedText";
import type { SearchFormInputProps } from "./SearchFormInput";
import { SearchFormItem } from "./SearchFormItem";

interface SearchFormInputSearchProps extends SearchFormInputProps {
  onSearch?: (value: string) => void;
}

export function SearchFormInputSearch({
  label,
  maxWidth = "100%",
  name = "",
  value: outValue = "",
  onChange,
  onPaste,
  ...props
}: SearchFormInputSearchProps) {
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
    <SearchFormItem label={label} maxWidth={maxWidth}>
      <Input.Search
        enterButton
        allowClear
        inputMode="search"
        name={name}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        {...props}
      />
    </SearchFormItem>
  );
}
