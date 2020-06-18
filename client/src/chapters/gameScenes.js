// gameChapters is the 'script' of this game. The game is a series of scenes, each of which contains a number of details
// which are passed as props to a UI of the appropriate type:
export const scenes = {
  scene_0: { name: 'parking-lot-cutscene', type: 'cutscene', chapter: 1 },
  scene_1: { name: 'parking-lot-minigame', type: 'minigame', chapter: 1 },
  scene_2: {
    name: 'parking-lot-character-dev',
    type: 'customizer',
    chapter: 1,
  },
  scene_3: { name: 'parking-lot-fight', type: 'fight', chapter: 1 },
  scene_4: { name: 'buffet-table-cutscene', type: 'cutscene', chapter: 2 },
  scene_5: { name: 'buffet-table-promo', type: 'minigame', chapter: 2 },
};

// Scene templates:
// character = String: name corresponding to an image file
// background = String: name corresponding to an image file
// text = String: anything
// duration = time in seconds to stay on this frame

const cutsceneTemplate = {
  frame0: {
    character: 'Player',
    background: 'Gate',
    text: 'Let me in!!!',
    duration: 5,
  },
};
