import { atom } from 'recoil';

export const karma = atom({
    key: 'karma',
    default: 0
})
export const showmanship = atom({
    key: 'showmanship',
    default: 0
})
export const minigameRound = atom({
    key: 'minigame round',
    default: 0
})
export const updateRound = atom({
    key: 'update round',
    default: false
})
export const currentRound = atom({
    key: 'current round',
    default: 0,
})