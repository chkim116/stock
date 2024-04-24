/* eslint-disable no-alert */
import { ComponentProps } from "react";
import { StoryFn, StoryObj, Meta, ArgTypes } from "@storybook/react";
import {
  SearchFormInputSelect,
  SearchFormSelectInputOptionType,
} from "../SearchFormInputSelect";

interface StoryProps extends ComponentProps<typeof SearchFormInputSelect> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: "common/searchForm/SearchFormInputSelect",
  component: SearchFormInputSelect,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SearchFormInputSelect {...props} />
);

const SEARCH_OPTIONS: SearchFormSelectInputOptionType[] = [
  {
    label: "캐릭터",
    value: "char",
  },
  {
    label: "룩핀",
    value: "lookpin",
  },
];

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {
    name: "form-select",
    searchOptions: SEARCH_OPTIONS,
    selectPlaceholder: "선택",
    placeholder: "...typing",
  },
};

export const DefaultValue: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    value: "검색하기",
    selectedValue: SEARCH_OPTIONS[0].value,
  },
};

export const WithLabel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    label: "검색하기",
  },
};

export const AllDisabled: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    selectDisabled: true,
    disabled: true,
  },
};

export const SelectDisabled: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    selectDisabled: true,
  },
};

export const InputDisabled: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};
