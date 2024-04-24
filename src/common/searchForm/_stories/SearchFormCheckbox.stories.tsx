/* eslint-disable no-alert */
import { ComponentProps } from 'react';
import { StoryFn, StoryObj, Meta, ArgTypes } from '@storybook/react';
import { SearchFormCheckbox } from '../SearchFormCheckbox';

interface StoryProps extends ComponentProps<typeof SearchFormCheckbox> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: 'common/searchForm/SearchFormCheckbox',
  component: SearchFormCheckbox,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SearchFormCheckbox {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {
    label: '체크체크',
    name: '이름',
    value: '벨류',
    children: '🚀',
  },
};

export const Checked: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    checked: true,
  },
};

export const Disabled: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};
