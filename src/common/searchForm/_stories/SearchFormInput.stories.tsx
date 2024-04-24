/* eslint-disable no-alert */
import { ComponentProps } from "react";
import { ArgTypes, Meta, StoryFn, StoryObj } from "@storybook/react";
import { SearchFormInput } from "../SearchFormInput";

interface StoryProps extends ComponentProps<typeof SearchFormInput> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: "common/searchForm/SearchFormInput",
  component: SearchFormInput,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SearchFormInput {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {
    name: "formInput",
    placeholder: "name is Form Input",
  },
};

export const WithLabel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    label: "검색하기",
  },
};

export const Disabled: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const MaxWidth: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    maxWidth: 300,
  },
};
