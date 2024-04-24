import { ComponentProps } from "react";
import { ArgTypes, Meta, StoryFn, StoryObj } from "@storybook/react";
import DividendSearchTable from "../DividendSearchTable";

interface StoryProps extends ComponentProps<typeof DividendSearchTable> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: "dividend/search/DividendSearchTable",
  component: DividendSearchTable,
  argTypes,
} as Meta<typeof DividendSearchTable>;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  return <DividendSearchTable {...props}></DividendSearchTable>;
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    dividendList: [
      {
        name: "삼성전자",
        dividend: "1,000",
        threeYearAgoDividend: "1,000",
        twoYearAgoDividend: "1,000",
        yearAgoDividend: "1,000",
        dividendAttendance: true,
        payoutMonth: "2021-01",
        payoutRatio: 10,
        code: "005930",
        currentStock: "100",
        roe: 10,
        per: 10,
      },
    ],
  },
};
