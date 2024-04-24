"use client";

import { ReactNode } from "react";
import { Checkbox } from "antd";
import styled from "@emotion/styled";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { BaseSearchFormItemProps, SearchFormItem } from "./SearchFormItem";
import { useInitialState } from "@common/hooks/useInitialState";

export interface SearchFormCheckboxChangeArgs {
  name: string;
  value: string;
}

interface SearchFormCheckboxProps extends BaseSearchFormItemProps {
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean, addArgs: SearchFormCheckboxChangeArgs) => void;
  children?: ReactNode;
}

const StyledCheckbox = styled(Checkbox)``;

export function SearchFormCheckbox({
  label,
  maxWidth,
  checked: outChecked,
  disabled,
  name,
  value,
  onChange,
  children,
}: SearchFormCheckboxProps) {
  const [checked, setChecked] = useInitialState(outChecked);

  const handleChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);

    onChange?.(e.target.checked, {
      name: e.target.name || "",
      value: e.target.value || "",
    });
  };

  return (
    <SearchFormItem label={label} maxWidth={maxWidth}>
      <StyledCheckbox
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {children}
      </StyledCheckbox>
    </SearchFormItem>
  );
}
