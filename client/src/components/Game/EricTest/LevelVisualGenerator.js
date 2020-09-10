import data from '../../../data/mapSeed.json';
import React from 'react';
import styled from 'styled-components';

import combatState from '../../../state'
import globalState from '../../../state'
import { useRecoilState, useRecoilValue } from 'recoil';

import { useDispatch, useSelector } from 'react-redux';
import { setCombatPhase } from '../../../actions';


const LevelVisualGenerator = ({row, enemyLocation, playerMove}) => { //generates the map based on the player position, enemy location, obstruction and seed
  const level = useRecoilValue(globalState.level);
  const PLAYER_POS = useRecoilValue(combatState.PLAYER_POS)
  const PLAYER_MOVE_OPTIONS = useRecoilValue(combatState.PLAYER_MOVE_OPTIONS)
  const [ATTACK_RADIUS, SET_ATTACK_RADIUS] = useRecoilState(combatState.ATTACK_RADIUS)
  const seed = data.find(obj => obj.level === level);

  const dispatch = useDispatch()

  const playerAction = () => {
    console.log('empty attack')
    dispatch(setCombatPhase('baddieMove'))
    SET_ATTACK_RADIUS([])
  }

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
          PLAYER_MOVE_OPTIONS.find((obs) => sq.x === obs.x && sq.y === obs.y)
        ) {
          return (
            <PossibleBox
              key={Math.random() * 100000}
              onClick={() => playerMove(sq.x, sq.y)}
            >
              {sq.x}, {sq.y}
            </PossibleBox>
          );
        } else if (
          ATTACK_RADIUS.find((obs) => sq.x === obs.x && sq.y === obs.y)
        ) {
          return (
            <AttackRadius
              key={Math.random() * 100000}
              onClick = {() => playerAction()}
            >
              {sq.x}, {sq.y}
            </AttackRadius>
          )
        }
          else {
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

export default LevelVisualGenerator;