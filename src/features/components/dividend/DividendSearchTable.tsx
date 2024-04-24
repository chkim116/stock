import { CrownOutlined } from "@ant-design/icons";
import { DividendSearchModel } from "@features/models/dividend.model";
import { Flex, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

interface DividendSearchTableProps {
  dividendList: DividendSearchModel[];
}

function DividendSearchTable({ dividendList }: DividendSearchTableProps) {
  const columns: ColumnsType<DividendSearchModel> = [
    {
      title: "종목코드",
      dataIndex: "code",
    },
    {
      title: "종목명",
      dataIndex: "name",
      render(name: string, { code }) {
        return (
          <a
            href={`https://finance.naver.com/item/main.naver?code=${code}`}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
        );
      },
    },
    {
      title: "주가",
      dataIndex: "currentStock",
    },
    {
      title: "PER",
      dataIndex: "per",
      render(per: number) {
        if (per === 0) {
          return "N/A";
        }

        return (
          <Typography.Text type={per > 5 ? "danger" : "success"}>
            {per}
          </Typography.Text>
        );
      },
    },
    {
      title: "ROE",
      dataIndex: "roe",
      render(roe: number) {
        return (
          <Typography.Text type={roe > 10 ? "success" : "danger"}>
            {roe}%
          </Typography.Text>
        );
      },
    },

    {
      title: "최근 배당금 추이",
      width: 350,
      render(
        _,
        {
          dividend,
          threeYearAgoDividend,
          twoYearAgoDividend,
          yearAgoDividend,
          dividendAttendance,
        }
      ) {
        return (
          <Flex gap={4}>
            <Typography.Text>
              {[
                dividend,
                yearAgoDividend,
                twoYearAgoDividend,
                threeYearAgoDividend,
              ].join(" <- ")}
            </Typography.Text>
            {dividendAttendance && <CrownOutlined />}
          </Flex>
        );
      },
    },
    {
      title: "기준월",
      dataIndex: "payoutMonth",
    },
    {
      title: "배당성향",
      dataIndex: "payoutRatio",
      render(payoutRatio: string) {
        return `${payoutRatio}%`;
      },
    },
  ];

  return (
    <Table
      sticky={{
        offsetHeader: 0,
      }}
      bordered
      rowKey="name"
      columns={columns}
      dataSource={dividendList}
    ></Table>
  );
}

export default DividendSearchTable;
