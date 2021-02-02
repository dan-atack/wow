import data from '../../../data/mapSeed.json';
import React from 'react';
import styled from 'styled-components';

import combatState from '../../../state'
import globalState from '../../../state'
import { useRecoilState, useRecoilValue } from 'recoil';

import { useDispatch } from 'react-redux';
import { startReflexCheck } from '../../../actions';

import Pow from '../../Sprinkle/Pow';
import TerrainTile from './TerrainTile';


// generates the map based on the player position, enemy location, obstruction and seed
// PROP TYPES
// row: array of 3-part tuples {x, y, obstacle},
// baddieCoords: {x, y},
// playerMove: Handler function to be mapped to each tile in the player's move radius
// playerAttack: Handler function to be mapped to each tile in the player's ATTACK radius
// enemyAttackRadius: Array of 2-part coordinates {x, y} representing the baddie's "danger zone"
const LevelVisualGenerator = ({row, baddieCoords, playerMove, playerAttack, enemyAttackRadius}) => { 
  const level = useRecoilValue(globalState.level);
  const playerCoords = useRecoilValue(combatState.playerCoords);
  const playerMoveOptions = useRecoilValue(combatState.playerMoveOptions);
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
        if (
          seed.obstructions.find((obs) => sq.x === obs.x && sq.y === obs.y)
        ) {
          // This renders an obstacle if the map file contains an obstacle at the specified coords:
          return (
            <TerrainTile
            key={Math.random() * 100000}
            type='obstacle'
            text='obstacle'>
              {
                seed.obstructions.find(
                  (obs) => sq.x === obs.x && sq.y === obs.y
                ).obstacle
              }
            </TerrainTile>
          );
        } else if (
          sq.x === baddieCoords.x &&
          sq.y === baddieCoords.y
        ) {
          if (baddieIsAttackable) {
            // If you can attack the enemy, we render him as an attackable enemy:
            return <AttackableEnemy key={Math.random() * 100000} onClick={() => playerAttack(sq.x, sq.y)}>enemy</AttackableEnemy>
          } else {
          // Otherwise we render the regular thing:
          return <Enemy key={Math.random() * 100000}>enemy</Enemy>;
          }
        } else if (
          enemyAttackRadius.find((obs) => sq.x === obs.x && sq.y === obs.y)) {
            if(sq.x === playerCoords.x && sq.y === playerCoords.y) {
              // If, within the enemy's danger zone, we find the player's coords, render the Player with a POW animation:
              return (
                <Player key={Math.random() * 10000000}>
                  {sq.x}, {sq.y}
                  <Pow/>
                </Player>
              )
            } else {
              // Otherwise, within the enemy's danger zone, render the 'attack radius' tile to indicate danger:
              return (
                <EnemyAttackRadius key={Math.random() * 100000000}>
                  {sq.x}, {sq.y}
                </EnemyAttackRadius>
              )
            }
        } else if (
          sq.x === playerCoords.x && sq.y === playerCoords.y
          ) {
          // If we've run through the enemy's danger zone and not found the Player, render the Player, sans pow:
          return <Player key={Math.random() * 100000} />;
        } else if (
          playerAttackRadius.find((obs) => sq.x === obs.x && sq.y === obs.y)
        ) {
          // Next, render the Player's attack radius if applicable:
          return (
            <AttackRadius
              key={Math.random() * 100000}
              onClick = {() => playerAttack(sq.x, sq.y)}
            >
              {sq.x}, {sq.y}
            </AttackRadius>
          )
        } else if (
          playerMoveOptions.find((obs) => sq.x === obs.x && sq.y === obs.y)
        ) {
          // Next, render the Player's movement radius, if applicable:
          return (
            <PossibleMove
              key={Math.random() * 100000}
              onClick={() => playerMove(sq.x, sq.y)}
            >
              {sq.x}, {sq.y}
            </PossibleMove>
          );
        } else {
          // Finally, render whatever coordinates are left with the generic 'empty tile':
          return (
            <TerrainTile
            key={Math.random() * 100000}
            type='empty'
            text={`${sq.x}, ${sq.y}`}
            >
          </TerrainTile>
          )}
        ;
      })}
    </div>
  );
}


const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: grey;
  border: 1px solid black;
  opacity: 0.5;
`;

const AttackRadius = styled.div`
  width: 50px;
  height: 50px;
  background-color: pink;
  border: 1px solid black;
  opacity: 0.5;
  cursor: pointer;
`;

const EnemyAttackRadius = styled.div`
  width: 50px;
  height: 50px;
  background-color: pink;
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

const AttackableEnemy = styled.div`
  width: 50px;
  height: 50px;
  background-color: purple;
  border: 1px solid black;
  opacity: 0.5;
`;

const PossibleMove = styled.div`
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

export default LevelVisualGenerator;

