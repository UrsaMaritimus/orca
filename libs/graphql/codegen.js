module.exports = {
  overwrite: true,
  generates: {
    './libs/graphql/src/generated/orca.ts': {
      documents: ['./libs/graphql/src/lib/orca/**/*.graphql'],
      schema:
        'https://api.thegraph.com/subgraphs/name/ursamaritimus/orca-staging',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: '@apollo/client',
      },
    },
    './libs/graphql/src/generated/png.ts': {
      documents: ['./libs/graphql/src/lib/png/**/*.graphql'],
      schema: 'https://api.thegraph.com/subgraphs/name/pangolindex/exchange',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: '@apollo/client',
      },
    },
  },
};
