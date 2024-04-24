"use client";

import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import styled from "@emotion/styled";
import { BaseSearchFormItemProps, SearchFormItem } from "./SearchFormItem";

interface SearchFormActionsProps extends BaseSearchFormItemProps {
  submitText?: string;
  onReset?: () => void;
  onSubmit?: () => void;
}

const StyledButton = styled(Button)`
  width: 150px;
`;

export function SearchFormActions({
  label,
  submitText = "조회하기",
  maxWidth = "100%",
  onReset,
  onSubmit,
}: SearchFormActionsProps) {
  return (
    <SearchFormItem label={label} maxWidth={maxWidth}>
      <Space>
        <StyledButton
          htmlType="submit"
          type="primary"
          onClick={onSubmit}
          icon={<SearchOutlined />}
        >
          {submitText}
        </StyledButton>
        {onReset && <Button icon={<UndoOutlined />} onClick={onReset} />}
      </Space>
    </SearchFormItem>
  );
}
