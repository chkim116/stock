"use client";

import { ChangeEventHandler, ClipboardEventHandler } from "react";
import { Input, Select, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import styled from "@emotion/styled";
import { useInitialState } from "@common/hooks/useInitialState";
import { replaceSelectedText } from "@common/utils/replaceSelectedText";
import type {
  SearchFormInputChangeArgs,
  SearchFormInputProps,
} from "./SearchFormInput";
import { SearchFormItem } from "./SearchFormItem";

export interface SearchFormSelectInputOptionType extends DefaultOptionType {
  value: string;
}

interface SearchFormInputSelectProps extends SearchFormInputProps {
  selectDisabled?: boolean;
  selectPlaceholder?: string;
  searchOptions?: SearchFormSelectInputOptionType[];
  /**
   * 현재 선택된 searchOption value
   */
  selectedValue?: string;
  /**
   * @param args - `name`은 항상 `${name}SearchType`이다.
   */
  onSelectChange?: (args: SearchFormInputChangeArgs) => void;
}

const SearchTypeSelect = styled(Select<string>)`
  &.ant-select {
    width: 120px;
  }
`;

export function SearchFormInputSelect({
  label,
  maxWidth = "100%",
  name = "",
  value: outValue = "",
  selectedValue: outSelectedValue,
  searchOptions,
  selectDisabled,
  selectPlaceholder,
  onChange,
  onSelectChange,
  onPaste,
  ...props
}: SearchFormInputSelectProps) {
  const [value, setValue] = useInitialState(outValue);
  const [selectedValue, setSelectedValue] = useInitialState(outSelectedValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setValue(value);
    onChange?.({ name, value });
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    onSelectChange?.({ name: `${name}SearchType`, value: value ?? "" });
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

  const selectProps = {
    options: searchOptions,
    value: selectedValue,
    placeholder: selectPlaceholder,
    disabled: selectDisabled,
    onChange: handleSelectChange,
  };

  return (
    <SearchFormItem maxWidth={maxWidth} label={label}>
      <Space.Compact block>
        <SearchTypeSelect {...selectProps} allowClear />
        <Input
          allowClear
          name={name}
          value={value}
          onPaste={handlePaste}
          onChange={handleChange}
          {...props}
        />
      </Space.Compact>
    </SearchFormItem>
  );
}
