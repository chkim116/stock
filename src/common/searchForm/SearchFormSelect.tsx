"use client";

import { ReactNode } from "react";
import { Select } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import styled from "@emotion/styled";
import { useInitialState } from "@common/hooks/useInitialState";
import { SearchFormItem } from "./SearchFormItem";

export interface SearchFormSelectOptionType extends DefaultOptionType {
  value: string;
}

export interface SearchFormChangeArgs {
  name: string;
  value: string | string[];
}

interface SearchFormSelectProps {
  maxWidth?: string | number;
  isMulti?: boolean;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: SearchFormSelectOptionType[];
  name?: string;
  value?: string | string[];
  renderOptions?: (options: SearchFormSelectOptionType) => ReactNode;
  /**
   * @param args - `name`은 항상 `${name}` props이다.
   */
  onChange?: (args: SearchFormChangeArgs) => void;
}

const StyledSelect = styled(Select<string | string[]>)`
  &.ant-select {
    width: 150px;
  }
`;

function refineSelectedValue(value?: string | string[]) {
  if (!value) {
    return;
  }

  if (Array.isArray(value) && value.length === 0) {
    return;
  }

  return value;
}

export function SearchFormSelect({
  maxWidth,
  isMulti,
  label,
  name = "searchFormSelect",
  value: outValue,
  disabled,
  options,
  placeholder,
  onChange,
  renderOptions,
}: SearchFormSelectProps) {
  const mode = isMulti ? "multiple" : undefined;
  const [selectedValue, setSelectedValue] = useInitialState(
    refineSelectedValue(outValue),
    [outValue]
  );

  const handleChange = (value: string | string[]) => {
    setSelectedValue(value);
    onChange?.({ name, value: value ?? "" });
  };

  return (
    <SearchFormItem label={label} maxWidth={maxWidth}>
      <StyledSelect
        mode={mode}
        allowClear
        showSearch
        onChange={handleChange}
        value={selectedValue}
        disabled={disabled}
        placeholder={placeholder}
      >
        {options?.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {renderOptions ? renderOptions(option) : option.label}
          </Select.Option>
        ))}
      </StyledSelect>
    </SearchFormItem>
  );
}
