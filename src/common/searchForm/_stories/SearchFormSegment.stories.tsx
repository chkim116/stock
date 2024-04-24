/* eslint-disable no-alert */
import { ComponentProps } from 'react';
import { StoryFn, StoryObj, Meta, ArgTypes } from '@storybook/react';
import { SearchFormSegment } from '../SearchFormSegment';

interface StoryProps extends ComponentProps<typeof SearchFormSegment> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: 'common/searchForm/SearchFormSegment',
  component: SearchFormSegment,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SearchFormSegment {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {
    options: [
      { label: '최신순', value: 'newest' },
      { label: '오래된순', value: 'oldest' },
    ],
  },
};

export const DefaultValue: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    value: 'oldest',
  },
};

export const WithLabel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...Default.args,
    label: '정렬순',
  },
};
export const MaxWidth: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...WithLabel.args,
    maxWidth: 100,
  },
};
