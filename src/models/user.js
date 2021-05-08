import { types } from "mobx-state-tree";

export const User = types.model("User", {
  id: types.identifier,
  displayName: types.string,
  email: types.string,
  photoURL: types.string,
  groups: types.array(types.string),
  telegramChatId: types.maybeNull(types.string),
});
