import { types } from 'mobx-state-tree';
import { User } from './user';
import { Song } from './song';

export const Evaluation = types.model({
  id: types.identifier,
  evaluatorId: types.reference(User),
  evaluateeId: types.reference(User),
  songId: types.reference(Song),
  score: types.refinement(types.integer, (value) => value >= 1 && value <= 10),
  ratedFamous: types.boolean,
});
