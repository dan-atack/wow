import { atom } from 'recoil';

export const level = atom({
  key: "level",
  default: 'parkingLot'
});

export const scene = atom({
  key: 'scene',
  default: 'characterSelector',
})

export const frame = atom({
  key: 'frame',
  default: 0,
})
