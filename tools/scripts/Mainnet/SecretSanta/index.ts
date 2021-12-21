import { GraphQLClient, gql } from 'graphql-request';

const GET_SECRET_SANTA_WINNER = gql`
  query podUsers {
    podUsers(first: 1000) {
      id
      xorcaBurned
      xorcaMinted
    }
  }
`;

const handler = async () => {
  const client = new GraphQLClient(
    'https://api.thegraph.com/subgraphs/name/ursamaritimus/orca-dao'
  );
  const result = await client.request(GET_SECRET_SANTA_WINNER);

  const users = result.podUsers;
  const userHasXOrca = users.filter(
    (val) => val.xorcaMinted - val.xorcaBurned > 0
  );
  console.log(users.length);
  console.log(userHasXOrca.length);
  const winner = userHasXOrca[Math.floor(Math.random() * userHasXOrca.length)];
  console.log(winner);
};

handler()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
