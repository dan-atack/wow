import { atom } from 'recoil';

//this file contains the character's stat sheets

export const characterSheet = atom({
    key: 'character',
    default: {
        characterType: null,
    }
})