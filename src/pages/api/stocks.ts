import { NextApiResponse, NextApiRequest } from "next";

import { repo } from "@core/repo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await repo.stockPriceInfo.getFetch().then((res) => res.data);

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
}
