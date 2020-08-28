import { types } from 'mobx-state-tree';
import { User } from './user';
// eslint-disable-next-line import/no-cycle
import { Song } from './song';

export const Evaluation = types.model({
  id: types.identifier,
  evaluator: types.reference(User),
  evaluatee: types.reference(User),
  song: types.reference(types.late(() => Song)),
  score: types.refinement(types.integer, (value) => value >= 1 && value <= 10),
  ratedFamous: types.boolean,
});
