import { ComponentProps } from "react";
import { ArgTypes, Meta, StoryFn, StoryObj } from "@storybook/react";
import DividendSearchForm from "../DividendSearchForm";
import { createDividendSearchParamsModel } from "@features/models/dividend.create";

interface StoryProps extends ComponentProps<typeof DividendSearchForm> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: "dividend/search/DividendSearchForm",
  component: DividendSearchForm,
  argTypes,
} as Meta<typeof DividendSearchForm>;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  return <DividendSearchForm {...props}></DividendSearchForm>;
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    params: createDividendSearchParamsModel(),
  },
};
