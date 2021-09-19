import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.COVALENT_KEY;
  const { slug } = req.query;
  await axios
    .get(
      `https://api.covalenthq.com/v1/${slug[0]}/address/${slug[1]}/balances_v2/?key=${apiKey}`
    )
    .then(({ data }) => {
      console.log(data.data.items);
      res.status(200).json({
        balance: data.data.items.filter(
          (item) => item.contract_ticker_symbol === 'AVAX'
        )[0].balance,
      });
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}
