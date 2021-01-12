import data from '../data/mapSeed.json';
import React from 'react';
import styled from 'styled-components';

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