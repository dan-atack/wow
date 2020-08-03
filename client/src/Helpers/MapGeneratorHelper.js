export const mapGenerate = (seed) => {
  const mapGrid = generator(seed)
  const payLoad = {
    map: mapGrid,
    playerPos: seed.playerStartPosition,
    enemyPos: seed.enemyStartPosition
  }
  return mapGrid
}

const generator = (seed) => {
  let mapGrid = []
  for (let y = 1; y <= seed.height; y++) {
    mapGrid.push([]);
    for (let x = 1; x <= seed.width; x++) {
      console.log(x, y, 'x + y')
      mapGrid[y - 1].push({ y: y, x: x, obst: 0 });
    }
  }
  return mapGrid 
}