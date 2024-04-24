/* eslint-disable no-alert */
import { ComponentProps } from 'react';
import { StoryFn, StoryObj, Meta, ArgTypes } from '@storybook/react';
import { SearchFormActions } from '../SearchFormActions';

interface StoryProps extends ComponentProps<typeof SearchFormActions> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: 'common/searchForm/SearchFormActions',
  component: SearchFormActions,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SearchFormActions {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {},
};

export const MaxWidth: StoryObj<StoryProps> = {
  render: Template,
  args: {
    maxWidth: 600,
  },
};

export const CustomSubmitText: StoryObj<StoryProps> = {
  render: Template,
  args: {
    submitText: '발급하기',
  },
};
