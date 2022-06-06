import styled from "@emotion/styled";
import { Table } from "antd";
import { ColumnType } from "antd/lib/table";
import { BodyTexts } from "core";

const AntdTable = styled(Table)`
  thead th {
    font-size: 16px;
    text-align: center;
  }

  tbody {
    text-align: center;
  }

  .row-light {
    background-color: #fff;
  }
  .row-dark {
    background-color: #f4f4f4;
  }
`;

interface StockTableProps {
  data: BodyTexts[];
  columns: ColumnType<Object>[];
}

export const StockTable = ({ data, columns }: StockTableProps) => {
  return (
    <AntdTable
      size="small"
      sticky
      bordered
      rowClassName={(_, index) => (index % 2 === 0 ? "row-light" : "row-dark")}
      loading={!!!data.length}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 100,
        current: 1,
        position: ["bottomCenter"],
        showSizeChanger: true,
        showTotal: (total) => `총 ${total}개`,
      }}
    />
  );
};
