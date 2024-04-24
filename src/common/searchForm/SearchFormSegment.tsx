"use client";

import { Segmented } from "antd";
import { SegmentedLabeledOption, SegmentedValue } from "antd/es/segmented";
import { useInitialState } from "@common/hooks/useInitialState";
import { BaseSearchFormItemProps, SearchFormItem } from "./SearchFormItem";
import { isNullish } from "safers";

export type SearchFormSegmentOptionType =
  | SegmentedValue
  | SegmentedLabeledOption;

export interface SearchFormSegmentChangeArgs {
  name: string;
  value: string;
}

interface SearchFormSegmentProps extends BaseSearchFormItemProps {
  options?: SearchFormSegmentOptionType[];
  name?: string;
  value?: string;
  onChange?: (args: SearchFormSegmentChangeArgs) => void;
}

export function SearchFormSegment({
  label,
  maxWidth,
  extra,
  options = [],
  name = "searchFormSegment",
  value: outValue = "",
  onChange,
}: SearchFormSegmentProps) {
  const [value, setValue] = useInitialState(outValue);

  const handleChange = (value: SegmentedValue) => {
    const newValue = isNullish(value) ? "" : String(value);

    onChange?.({ name, value: newValue });
    setValue(newValue);
  };

  return (
    <SearchFormItem label={label} maxWidth={maxWidth} extra={extra}>
      <Segmented options={options} value={value} onChange={handleChange} />
    </SearchFormItem>
  );
}
