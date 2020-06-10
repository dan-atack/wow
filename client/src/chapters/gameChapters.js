// Staring from the smallest details of a scene:

const chapter_0_scenes = {
  scene_0: { name: 'parking-lot-cutscene', type: 'cutscene', next: 1 },
  scene_1: { name: 'parking-lot-minigame', type: 'minigame', next: 2 },
  scene_2: { name: 'parking-lot-fight', type: 'fight', next: -1 },
};

const chapter_1_scenes = {
  scene_0: { name: 'buffet-table-cutscene', type: 'cutscene', next: 1 },
  scene_1: { name: 'buffet-table-promo', type: 'minigame', next: -1 },
};

export const chapters = {
  chapter_0: chapter_0_scenes,
  chapter_1: chapter_1_scenes,
};

export const sentence = 'hoorah!';
