"use client";

import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Form as AntdForm } from "antd";

interface SearchFormProps {
  onFinish?: () => void;
  children?: ReactNode;
}

const StyledForm = styled(AntdForm)``;

export function SearchForm({ onFinish, children, ...props }: SearchFormProps) {
  const handleFinish = () => {
    onFinish?.();
  };

  return (
    <StyledForm
      size="small"
      colon={false}
      labelAlign="left"
      labelCol={{ span: 3 }}
      onFinish={handleFinish}
      {...props}
    >
      {children}
    </StyledForm>
  );
}
