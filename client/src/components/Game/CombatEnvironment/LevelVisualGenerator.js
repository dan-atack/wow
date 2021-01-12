import data from '../../../data/mapSeed.json';
import React from 'react';
import styled from 'styled-components';

import combatState from '../../../state'
import globalState from '../../../state'
import { useRecoilState, useRecoilValue } from 'recoil';

import { useDispatch } from 'react-redux';
import { startReflexCheck } from '../../../actions';

import Pow from '../../Sprinkle/Pow';


//generates the map based on the player position, enemy location, obstruction and seed
const LevelVisualGenerator = ({row, baddiePosition, playerMove, ENEMY_ATTACK_RADIUS}) => { 
  const level = useRecoilValue(globalState.level);
  const PLAYER_POS = useRecoilValue(combatState.PLAYER_POS)
  const PLAYER_MOVE_OPTIONS = useRecoilValue(combatState.PLAYER_MOVE_OPTIONS)
  const [ATTACK_RADIUS, SET_ATTACK_RADIUS] = useRecoilState(combatState.ATTACK_RADIUS)
  const [enemyDecision, setEnemyDecision] = useRecoilState(combatState.baddieAttack)

  const seed = data.find(obj => obj.level === level);
  const dispatch = useDispatch()

  const playerAction = () => {
    dispatch(startReflexCheck());    // When the player selects their action, begin a reflex check but don't advance combat round.
    SET_ATTACK_RADIUS([]);
  }

  return (
    <div key={Math.random() * 100000} style={{ display: 'flex' }}>
      {row.map((sq) => {
        if (
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
          sq.x === baddiePosition.x &&
          sq.y === baddiePosition.y
        ) {
          return <Enemy key={Math.random() * 100000}>enemy</Enemy>;
        } else if (
          ENEMY_ATTACK_RADIUS.find((obs) => sq.x === obs.x && sq.y === obs.y)) {
            //make a useeffect that checks for player and enemy intersection instead of this damned pow component in CombatEnvironment
            if(sq.x === PLAYER_POS.x && sq.y === PLAYER_POS.y) {
              return (
                <Player key={Math.random() * 10000000}>
                  {sq.x}, {sq.y}
                  <Pow/>
                </Player>
              )
            } else {
              return (
                <EnemyAttackRadius key={Math.random() * 100000000}>
                  {sq.x}, {sq.y}
                </EnemyAttackRadius>
              )
            }
        } else if (
          sq.x === PLAYER_POS.x && sq.y === PLAYER_POS.y
          ) {
          return <Player key={Math.random() * 100000} />;
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

