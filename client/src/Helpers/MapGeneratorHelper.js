import data from '../data/mapSeed.json';
import React from 'react';
import styled from 'styled-components';

export const mapGenerate = (seed) => {
  const mapGrid = generator(seed)
  console.log(mapGrid)
  const payLoad = {
    map: mapGrid,
    playerPos: seed.playerStartPosition,
    enemyPos: seed.enemyStartPosition
  }
  return mapGrid
}

const generator = (seed) => {
  let mapGrid = []
  let obsType = 0
  for (let y = 1; y <= seed.height; y++) {
    mapGrid.push([]);
    for (let x = 1; x <= seed.width; x++) {
      obsType = 0;
      seed.obstructions.forEach(obs => {
        if(obs.x === x && obs.y === y) {
          obsType = obs.obstacle
        }
      })
      mapGrid[y - 1].push({ y: y, x: x, obst: obsType });
    }
  }
  return mapGrid 
}

export const levelVisualGenerator = (level, mapGrid, PLAYER_POS, enemyLocation, PLAYER_MOVES, playerMove) => { //generates the map based on the player position, enemy location, obstruction and seed
  const seed = data.find(obj => obj.level === level);
  console.log(level)
  console.log(seed)
  mapGrid.map((row, idx) => {
    return (
      <div key={Math.random() * 100000} style={{ display: 'flex' }}>
        {row.map((sq) => {
          if (sq.x === PLAYER_POS.x && sq.y === PLAYER_POS.y) {
            return <Player key={Math.random() * 100000} />;
          } else if (
            seed.obstructions.find((obs) => sq.x === obs.x && sq.y === obs.y)
          ) {
            return (
              <Box key={Math.random() * 100000}>
                {
                  seed.obstructions.find(
                    (obs) => sq.x === obs.x && sq.y === obs.y
                  ).obstacle
                }
              </Box>
            );
          } else if (
            sq.x === enemyLocation.x &&
            sq.y === enemyLocation.y
          ) {
            return <Enemy key={Math.random() * 100000}>enemy</Enemy>;
          } else if (
            PLAYER_MOVES.find((obs) => sq.x === obs.x && sq.y === obs.y)
          ) {
            return (
              <PossibleBox
                key={Math.random() * 100000}
                onClick={() => playerMove(sq.x, sq.y)}
              >
                {sq.x}, {sq.y}
              </PossibleBox>
            );
          } else {
            return (
              <Box
              key={Math.random() * 100000}
              style={{ border: '1px solid black' }}
              >
              {sq.x},
              {sq.y}
            </Box>
            )}
          ;
        })}
      </div>
    );
  })
}


const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: grey;
  border: 1px solid black;
  opacity: 0.5;
`;

const Enemy = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
  border: 1px solid black;
  opacity: 0.5;
`;

const PossibleBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: grey;
  border: 1px solid black;
  opacity: 0.9;
`;

const Player = styled.div`
  width: 50px;
  height: 50px;
  background-color: red;
  border: 1px solid black;
  opacity: 0.8;
`;

const Path = styled.div`
  width: 50px;
  height: 50px;
  background-color: yellow;
  border: 1px solid black;
  opacity: 0.8;
`;