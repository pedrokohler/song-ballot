import { types } from "mobx-state-tree";
import { v4 as uuid } from "uuid";

export const DefaultModel = types.model({
  id: types.optional(types.identifier, () => uuid()),
  createdAt: types.optional(types.Date, () => Date.now()),
}).postProcessSnapshot((snapshot) => ({
  ...snapshot,
  createdAt: new Date(snapshot.createdAt),
})).actions(() => ({
  generateId() {
    return uuid();
  },
}));
