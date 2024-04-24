/* eslint-disable no-alert */
import { ComponentProps } from "react";
import { StoryFn, StoryObj, Meta, ArgTypes } from "@storybook/react";
import { SearchFormSelect } from "../SearchFormSelect";

interface StoryProps extends ComponentProps<typeof SearchFormSelect> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: "common/searchForm/SearchFormSelect",
  component: SearchFormSelect,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SearchFormSelect {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {
    name: "currentStatus",
    disabled: false,
    placeholder: "form select..",
    options: [
      {
        label: "판매중",
        value: "sale",
      },
      {
        label: "판매중지",
        value: "stop",
      },
      {
        label: "품절",
        value: "soldout",
      },
      {
        label: "재고없음",
        value: "wait",
      },
    ],
  },
};

export const WithLabel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    label: "현재상태",
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

export const DefaultValue: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    value: "wait",
  },
};

export const Multiple: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    isMulti: true,
  },
};
