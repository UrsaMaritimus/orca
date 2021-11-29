# OrcaDAO

A lending platform that allows minting of Avalanche Native stablecoin AVAI using crypto collateral, and governed with the ORCA token.

# Contracts

All contracts can be found in `apps/avai/src`, and can be interacted with using hardhat. Tools for that can be found under `tools/scripts` and tests can be found under `test`. Contracts are deployed using scripts under `deploy`. To see all currently deployed contracts and their addresses, go to [deployed](deployments/).

# User interface

The user interface can can be seen under `apps/orca` and `apps/landing`. Further, shared libraries can be seen under `libs`.

## Running User Interface

To run any of the front ends, you will need to have [`yarn`](https://classic.yarnpkg.com/lang/en/) installed. Run

```
yarn
```

to install all packages. Optionally, install [nx](https://nx.dev/l/r/getting-started/nx-setup) as well, for global use of monorepo.

Set up a .env file in the root directory, `./`, similar to .env.example. Only variables starting with `NEXT_PUBLIC_` are necessary.

Finally, to run, for example the orca app

```
yarn start orca
```

or

```
nx serve orca
```

To build, run

```
yarn build orca
```

or

```
nx build orca
```

Read Nx documentation for more options related to these commands. All Nx commands are available in this repo.

## Libs

A list of libs used throughtout the user interface.

### [components](libs/components/README.md)

Reusable components are produced in here, in their own subfolder, then exported via '@orca/components'

### [graphql](libs/graphql/README.md)

This is for setting up graphql calls to various endpoints. Exported via '@orca/graphql'

### [hooks](libs/hooks/README.md)

For various react based hooks. Exported via '@orca/hooks'

### [layouts](libs/layouts/README.md)

For adjusting the layouts for e.g. landing or app. Exported via '@orca/layouts'

### [pages](libs/pages/README.md)

The main components for each page, organized by sub folders. Exported via '@orca/pages'

### [shared](libs/shared/README.md)

For shared constants, such as contract addresses. Exported via '@orca/shared'

### [theme](libs/theme/README.md)

For the adjustments to the theme using material UI. Exported via '@orca/theme'

### [util](libs/util/README.md)

Various utility functions such as coloring text or formatting numbers. Exported via '@orca/util'

### [web3](libs/web3/README.md)

All functions related to web3 interaction, i.e. interacting with contracts. Exported via '@orca/web3'

# Engage in the OrcaDAO

- Explore our [Website](https://www.avai.finance/) and [Documentation](https://docs.avai.finance/) to learn more.
- Follow us on [Twitter](https://twitter.com/OrcaDAO) as testing begins to ramp up, or for discussion and quick news.
- Join our [Discord channel](https://discord.gg/KZHbxZvCsU) and become a contributor.
- Join our [Telegram](https://t.me/OrcaDAO_Official)
