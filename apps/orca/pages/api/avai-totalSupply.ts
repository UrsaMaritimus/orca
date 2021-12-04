import type { NextApiRequest, NextApiResponse } from 'next';
import { createApolloClient } from '@orca/graphql';
import { gql } from '@apollo/client';

const GET_TOTAL_SUPPLY = gql`
  query TotalSupplyFrontPage @api(name: orca) {
    stablecoins {
      totalSupply
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createApolloClient();
  await client
    .query({ query: GET_TOTAL_SUPPLY })
    .then(({ data }) => {
      res.status(200).json(data.stablecoins[0].totalSupply / 1e18);
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}
