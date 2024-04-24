"use client";

import { ReactNode } from "react";
import { Form } from "antd";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { isNumber } from "safers";

export interface BaseSearchFormItemProps {
  label?: ReactNode;
  maxWidth?: string | number;
  extra?: ReactNode;
}

interface SearchFormItemProps extends BaseSearchFormItemProps {
  maxWidth?: string | number;
  children?: ReactNode;
}

interface SearchFormItemStyledProps {
  maxWidth?: string | number;
}

const StyledFormItem = styled(Form.Item)<SearchFormItemStyledProps>`
  margin-bottom: 12px;

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${isNumber(maxWidth) ? maxWidth + "px" : maxWidth};
    `}
`;

export function SearchFormItem({
  maxWidth = "100%",
  children,
  ...props
}: SearchFormItemProps) {
  return (
    <StyledFormItem maxWidth={maxWidth} {...props}>
      {children}
    </StyledFormItem>
  );
}
