import { MOST_ACTIVE_STOCKS_URL, TOP_STOCK_GAINERS_URL } from "configs";
import { NextApiResponse, NextApiRequest } from "next";
import { stockService } from "services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const result = await stockService(
    query["type"] === "top" ? TOP_STOCK_GAINERS_URL : MOST_ACTIVE_STOCKS_URL,
    Boolean(query["filter"])
  );
  res.status(200).send(result);
}
