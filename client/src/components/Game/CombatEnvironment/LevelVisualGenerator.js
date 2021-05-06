import data from '../../../data/mapSeed.json';
import React from 'react';
import styled from 'styled-components';

import combatState from '../../../state'
import globalState from '../../../state'
import { useRecoilValue } from 'recoil';

import Pow from '../../Sprinkle/Pow';
import TerrainTile from './TerrainTile';
import SpriteTile from './SpriteTile';
import OrientationPicker from './OrientationPicker';
// Asset Imports
import Tony from '../../../assets/combat/tony.gif';
import ObstructionTile from './ObstructionTile/ObstructionTile';

// generates the map based on the player position, enemy location, obstruction and seed
// PROP TYPES
// row: array of 3-part tuples {x, y, obstacle},  <---- obstacle is optional string
// baddieCoords: {x, y},
// playerMove: Handler function to be mapped to each tile in the player's move radius
// playerAttack: Handler function to be mapped to each tile in the player's ATTACK radius
// enemyAttackRadius: Array of 2-part coordinates {x, y} representing the baddie's "danger zone"
const LevelVisualGenerator = ({row, baddieCoords, playerMove, playerAttack, enemyAttackRadius}) => { 
  const level = useRecoilValue(globalState.level);
  const playerCoords = useRecoilValue(combatState.playerCoords);
  const playerMoveOptions = useRecoilValue(combatState.playerMoveOptions);
  const playerMovementDecision = useRecoilValue(combatState.playerMovementDecision);
  const playerAttackRadius = useRecoilValue(combatState.playerAttackRadius);

  const seed = data.find(obj => obj.level === level);

  let baddieIsAttackable = false;
  const determineBaddieIsAttackable = () => {
    if (playerAttackRadius.length > 0) {
      playerAttackRadius.forEach((tile) => {
        if (tile.x === baddieCoords.x && tile.y === baddieCoords.y) baddieIsAttackable = true;
      });
    }
  }

  determineBaddieIsAttackable();
  return (
    <div key={Math.random() * 100000} style={{ display: 'flex' }}>
      {row.map((sq) => {
        if (sq.x === playerMovementDecision.x && sq.y === playerMovementDecision.y) {
          return <OrientationPicker key={Math.random() * 100000} />
        }
        if (
          seed.obstructions.find((obs) => sq.x === obs.x && sq.y === obs.y)
        ) {
          // This renders an obstacle if the map file contains an obstacle at the specified coords:
          return (
            <ObstructionTile
              key={Math.random() * 100000}
              obstacle={seed.obstructions.find((obs) => sq.x === obs.x && sq.y === obs.y).obstacle}
              x={sq.x}
              y={sq.y}
            />
          );
        } else if (
          sq.x === baddieCoords.x &&
          sq.y === baddieCoords.y
        ) {
          if (baddieIsAttackable) {
            // If you can attack the enemy, we render him as an attackable enemy:
              return (
                <SpriteTile 
                  key={Math.random() * 100000}
                  level={seed.level}
                  onClick={() => playerAttack(sq.x, sq.y)}
                />
              )
            } else {
            // Otherwise we render them as a non-clickable image:
            return (
              <SpriteTile 
              key={Math.random() * 100000}
              level={seed.level}
            />
            )
          }
        } else if (
          enemyAttackRadius.find((obs) => sq.x === obs.x && sq.y === obs.y)) {
            if(sq.x === playerCoords.x && sq.y === playerCoords.y) {
              // If, within the enemy's danger zone, we find the player's coords, render the Player with a POW animation:
              return (
                <SpriteTile key={Math.random() * 1000000} isPlayer={true}>
                  <Pow />
                </SpriteTile>
              )
            } else {
              // Otherwise, within the enemy's danger zone, render the 'attack radius' tile to indicate danger:
              return (
                <TerrainTile
                  key={Math.random() * 100000000}
                  overlay={'baddieAttack'}
                  x={sq.x}
                  y={sq.y}
                />
              )
            }
        } else if (
          sq.x === playerCoords.x && sq.y === playerCoords.y
          ) {
          // If we've run through the enemy's danger zone and not found the Player, render the Player, sans pow:
          return (
            <SpriteTile key={Math.random() * 100000} isPlayer={true} />
          );
        } else if (
          playerAttackRadius.find((obs) => sq.x === obs.x && sq.y === obs.y)
        ) {
          // Next, render the Player's attack radius if applicable:
          return (
            <TerrainTile
              key={Math.random() * 100000}
              onClick = {() => playerAttack(sq.x, sq.y)}
              overlay={'playerAttack'}
              x={sq.x}
              y={sq.y}
            />
          )
        } else if (
          playerMoveOptions.find((obs) => sq.x === obs.x && sq.y === obs.y)
        ) {
          // Next, render the Player's movement radius, if applicable:
          return (
            <TerrainTile
              key={Math.random() * 100000}
              onClick={() => playerMove(sq.x, sq.y)}
              overlay={'playerMove'}
              x={sq.x}
              y={sq.y}
            />
          );
        } else {
          // Finally, render whatever coordinates are left with the generic 'empty tile':
          return (
            <TerrainTile
            key={Math.random() * 100000}
            level={level} // e.g. 'parkingLot', 'wrestlingRing', etc.
            overlay={'none'}  // Possible overlays: 'none', 'playerAttack', 'baddieAttack', 'playerMove'
            x={sq.x}
            y={sq.y}
          />
          )}
        ;
      })}
    </div>
  );
}

export default LevelVisualGenerator;

