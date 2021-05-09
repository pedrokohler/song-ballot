import { types } from "mobx-state-tree";

export const Group = types.model("Group", {
  id: types.identifier,
  name: types.string,
  ongoingRound: types.string,
});
