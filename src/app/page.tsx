import { Flex } from "antd";
import Link from "next/link";

interface IndexPageProps {}

function IndexPage(_: IndexPageProps) {
  return (
    <Flex
      vertical
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
      justify="center"
      align="center"
    >
      <h1>Hello Stock!</h1>
      <Link href="/dividend">배당주보기</Link>
    </Flex>
  );
}

export default IndexPage;
