"use client";

import { ComponentProps } from "react";
import { ErrorComponent } from "next/dist/client/components/error-boundary";
import { Result } from "antd";
import Link from "next/link";

function DividendErrorPage(_: ComponentProps<ErrorComponent>) {
  return (
    <Result
      status="error"
      title="에러입니다."
      extra={<Link href="/dividend">다시가기</Link>}
    />
  );
}

export default DividendErrorPage;
