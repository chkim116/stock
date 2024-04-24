/* eslint-disable no-alert */
import { ComponentProps } from "react";
import { StoryFn, StoryObj, Meta, ArgTypes } from "@storybook/react";
import { SearchFormInputNumber } from "../SearchFormInputNumber";

interface StoryProps extends ComponentProps<typeof SearchFormInputNumber> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: "common/searchForm/SearchFormInputNumber",
  component: SearchFormInputNumber,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SearchFormInputNumber {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {
    name: "form-inputNumber",
    placeholder: "...typing",
    addonAfter: "%",
    disabled: false,
  },
};

export const DefaultValue: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    value: 1234,
  },
};

export const WithLabel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    label: "쿠폰번호",
  },
};

export const Max100: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    max: 100,
    placeholder: "최댓값은 10",
  },
};

export const Min10: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    placeholder: "최솟값은 10",
    min: 10,
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
