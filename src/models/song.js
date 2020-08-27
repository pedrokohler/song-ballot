import { types } from 'mobx-state-tree';
import { DefaultModel } from './default';

export const Song = types
  .compose(DefaultModel)
  .named('Song')
  .props({
    url: types.string,
    title: types.maybeNull(types.string),
  });
