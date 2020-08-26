import { types } from 'mobx-state-tree';

export const Song = types.model({
  id: types.identifier,
  url: types.string,
  name: types.maybeNull(types.string),
  createdAt: types.optional(types.Date, () => new Date()),
});
