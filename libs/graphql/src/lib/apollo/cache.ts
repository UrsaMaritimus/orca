import { InMemoryCache } from '@apollo/client/cache';

const cache = new InMemoryCache();

export type Ctx = typeof cache;

export default cache;
