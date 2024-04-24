/* eslint-disable no-alert */
import { ComponentProps } from "react";
import { StoryFn, StoryObj, Meta, ArgTypes } from "@storybook/react";
import { Input } from "antd";
import { SearchFormItem } from "../SearchFormItem";

interface StoryProps extends ComponentProps<typeof SearchFormItem> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: "common/searchForm/SearchFormItem",
  component: SearchFormItem,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

interface FormItemDto {
  keyword: string;
}

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  return (
    <SearchFormItem {...props}>
      <Input />
    </SearchFormItem>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {
    label: "검색어",
  },
};
