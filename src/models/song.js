import { types } from "mobx-state-tree";
import { DefaultModel } from "./default";
// eslint-disable-next-line import/no-cycle
import { Round } from "./round";
import { User } from "./user";

export const Song = types
  .compose(DefaultModel)
  .named("Song")
  .props({
    url: types.string,
    title: types.maybeNull(types.string),
    round: types.reference(types.late(() => Round)),
    user: types.reference(types.late(() => User)),
  });

export default Song;
