// gameChapters is the 'script' of this game. The game is a series of scenes, each of which contains a number of details
// which are passed as props to a UI of the appropriate type:
// NOTE: a scene's name property will correspond to a particular collection of frames in the cutsceneFrames data object below:
export const scenes = {
  scene_0: { name: 'parkingLot', type: 'cutscene', chapter: 1 },
  scene_1: { name: 'parkingLot', type: 'minigame', chapter: 1 },
  scene_2: {
    name: 'parkingLot',
    type: 'customizer',
    chapter: 1,
  },
  scene_3: { name: 'parkingLot', type: 'fight', chapter: 1 },
  scene_4: { name: 'buffetTable', type: 'cutscene', chapter: 2 },
  scene_5: { name: 'buffetTable', type: 'minigame', chapter: 2 },
};

// Cutscene frame template:
// character = String: name corresponding to an image file <== MUST MATCH WITH NAME IN CHARACTER COMPONENT CHARACTERS OBJECT!
// background = String: name corresponding to an image file <== MUST MATCH WITH NAME IN BACKGROUND COMPONENT BACKGROUNDS OBJECT!
// text = String: anything
// duration = time in milliseconds to stay on this frame

export const cutsceneFrames = {
  parkingLot: {
    frame_0: {
      character: 'You should not see this.',
      background: 'This is not visible.',
      text: 'loading cutscene...',
      duration: 1000,
    },
    frame_1: {
      character: 'player',
      background: 'gate',
      text: 'Let me in! I got an appointment with Mr. Moneybags!',
      duration: 5000,
    },
    frame_2: {
      character: 'valet',
      background: 'gate',
      text: "Not with those shoes, 'sir'",
      duration: 4000,
    },
    frame_3: {
      character: 'player',
      background: 'gate',
      text:
        'You are asking for an initiation in the meaning of hard times, sir.',
      duration: 5000,
      // add a little flag to the last frame in a scene, to linger on it:
      last: true,
    },
  },
};
