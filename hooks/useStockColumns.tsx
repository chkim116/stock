import styled from "@emotion/styled";
import { ReactNode } from "react";
import { ColumnType } from "antd/lib/table";

import { BodyTexts, HeadText } from "core";

const PlusText = styled.span`
  color: red;
`;
const MinusText = styled.span`
  color: blue;
`;

export const useStockColumns = (headText: HeadText[]) => {
  const defaultColumns = headText.map((text) => ({
    title: text,
    dataIndex: text,
    key: text,
    render: (value: string): string | ReactNode => {
      if (text.includes("종목")) {
        const [originText, link] = value.split("@");
        return (
          <a
            href={`https://kr.investing.com/${link}`}
            target="_blank"
            rel="noreferrer"
          >
            {originText}
          </a>
        );
      }

      if (text.includes("변동")) {
        if (value.includes("+")) {
          return <PlusText>{value}</PlusText>;
        }
        return <MinusText>{value}</MinusText>;
      }

      return value;
    },
    sorter: text.includes("변동")
      ? (a: BodyTexts, b: BodyTexts) => {
          return +b[text].replace("%", "") - +a[text].replace("%", "");
        }
      : false,
    showSorterTooltip: false,
  }));

  if (!defaultColumns) {
    return [] as ColumnType<Object>[];
  }

  return [
    ...defaultColumns,
    {
      title: "뉴스",
      dataIndex: "뉴스",
      key: "뉴스",
      render: (_: string, record: BodyTexts) => (
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(
            record.종목
          )}&sxsrf=ALiCzsbOUeEU3RbWu7bMESXdV4ceYEyzng:1654500586856&source=lnms&tbm=nws&sa=X&ved=2ahUKEwigjor-ppj4AhVkq1YBHSAJAOIQ_AUoAXoECAIQAw&cshid=1654500589546948&biw=1440&bih=796&dpr=2`}
          target="_blank"
          rel="noreferrer"
        >
          뉴스 보기
        </a>
      ),
    },
  ] as ColumnType<Object>[];
};
