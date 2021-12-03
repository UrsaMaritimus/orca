import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createApolloClient } from '@orca/graphql';
import { gql } from '@apollo/client';
import { ProtocolTokenInfo } from '@orca/shared';

const GET_TOTAL_SUPPLY = gql`
  query OrcaStats($id: ID!) @api(name: orca) {
    orca(id: $id) {
      id
      circulatingSupply
      maxSupply
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createApolloClient();
  await client
    .query({
      query: GET_TOTAL_SUPPLY,
      variables: {
        id: ProtocolTokenInfo['ORCA'].address.mainnet.toLowerCase(),
      },
    })
    .then(({ data }) => {
      res.status(200).json(data.orca.circulatingSupply / 1e18);
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}
