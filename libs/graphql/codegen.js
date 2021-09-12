module.exports = {
  schema: 'https://api.thegraph.com/subgraphs/name/ursamaritimus/orcadao',
  documents: ['./libs/graphql/src/lib/**/*.graphql'],
  overwrite: true,
  generates: {
    './libs/graphql/src/generated/index.ts': {
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
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
