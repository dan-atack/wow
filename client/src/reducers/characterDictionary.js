// The Character Dictionary will have the default stats associated with each Character Type, to help define players' initial stats:
// These export statements will be read by the player reducer when calculating the player's stats.
// This should allow for easier switching between character types while retaining stats chosen by the player.
// Let's say stats are on a 0-100 range:

export const HighFlier = {
  id: 'highFlier',
  damage: 12,
  endurance: 10,
  acrobatics: 17,
  items: 11,
  moveList: ['corkscrew'],
};

export const Tank = {
  id: 'tank',
  damage: 15,
  endurance: 15,
  acrobatics: 10,
  items: 10,
  moveList: ['chokehold'],
};

export const SuperStar = {
  id: 'superStar',
  damage: 14,
  endurance: 14,
  acrobatics: 14,
  items: 13,
  moveList: ['suplex'],
};
