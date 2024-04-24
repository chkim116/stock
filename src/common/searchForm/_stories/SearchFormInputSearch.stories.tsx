/* eslint-disable no-alert */
import { ComponentProps } from "react";
import { StoryFn, StoryObj, Meta, ArgTypes } from "@storybook/react";
import { SearchFormInputSearch } from "../SearchFormInputSearch";

interface StoryProps extends ComponentProps<typeof SearchFormInputSearch> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: "common/searchForm/SearchFormInputSearch",
  component: SearchFormInputSearch,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SearchFormInputSearch {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {
    name: "formSearch",
    placeholder: "...typing",
  },
};

export const DefaultValue: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    value: "default value!",
  },
};

export const WithLabel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    label: "검색하기",
  },
};

export const MaxWidth: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    maxWidth: 300,
  },
};

export const Disabled: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};
