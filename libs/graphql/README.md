# graphql

This exports hooks used for calling various graphql endpoints.

## Adding a new endpoint

To add a new endpoint, add to `codegen.js` with the following format:

```
'./libs/graphql/src/generated/NAME.ts': {
      documents: ['./libs/graphql/src/lib/NAME/**/*.graphql'],
      schema: 'GQL Endpoint',
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
```

Replacing NAME with the endpoint name and GQL Endpoint with the url.

You will also need to go to `src/lib/apollo/links.ts` and add the endpoint url along with the name under endpoints in `httpLink` and `wsLink`.

## Generating hooks

Once endpoints are added, hooks can be generated using `yarn gql:generate`. Desired hooks must be exported manually from `index.ts`.

## Running unit tests

Run `nx test graphql` to execute the unit tests via [Jest](https://jestjs.io).
