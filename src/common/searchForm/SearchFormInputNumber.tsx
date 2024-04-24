"use client";
import { InputNumber } from "antd";
import { useInitialState } from "@common/hooks/useInitialState";
import type { BaseSearchFormInputProps } from "./SearchFormInput";
import { SearchFormItem } from "./SearchFormItem";
import { isNullish, toNumber } from "safers";

export interface SearchFormInputNumberChangeArgs {
  name: string;
  value: number | null;
}

interface SearchFormInputNumberProps
  extends Omit<BaseSearchFormInputProps, "value" | "onChange"> {
  max?: number;
  min?: number;
  value?: number | null;
  onChange: (args: SearchFormInputNumberChangeArgs) => void;
}

export function SearchFormInputNumber({
  label,
  maxWidth = "100%",
  name = "",
  value: outValue = null,
  onChange,
  ...props
}: SearchFormInputNumberProps) {
  const [value, setValue] = useInitialState(outValue);

  const handleChangeNumber = (value: string | number | null) => {
    const newValue = isNullish(value) ? null : toNumber(value, 0);

    onChange?.({ name, value: newValue });
    setValue(newValue);
  };

  return (
    <SearchFormItem maxWidth={maxWidth} label={label}>
      <InputNumber
        controls={false}
        keyboard={false}
        inputMode="numeric"
        value={value}
        onChange={handleChangeNumber}
        {...props}
      />
    </SearchFormItem>
  );
}
