import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setCombatPhase } from '../../../actions';

// recoil state management
import combatState from '../../../state'
import globalState from '../../../state'
import { useRecoilValue, useRecoilState } from 'recoil'

import {
  movementTimeout,
  sleep,
  possiblePaths,
  pathfinder,
} from '../../../Helpers/playerMoveHelper';

import { attackRange } from '../../../Helpers/playerCombatHelper';
import data from '../../../data/mapSeed.json';

import {
  mapGenerate,
} from '../../../Helpers/MapGeneratorHelper';

//components
import CombatUi from './CombatUi';
import LevelVisualGenerator from './LevelVisualGenerator'

const CombatTestEnvironment = () => {
  const dispatch = useDispatch();
  // const { health, hype, ACTION_POINTS } = useRecoilValue(combatState)
  const ACTION_POINTS = useRecoilValue(combatState.ACTION_POINTS)
  const level = useRecoilValue(globalState.level)
  // const [PLAYER_POS, SET_PLAYER_POS] = React.useState({ x: 5, y: 1 }); 
  // Bring in the global state:
  const combatPhase = useSelector((state) => state.game.combatPhase);
  // const [TURN, SET_TURN] = React.useState('idle');
  
  const [PLAYER_MOVE_OPTIONS, SET_MOVE_OPTIONS] = useRecoilState(combatState.PLAYER_MOVE_OPTIONS);
  const [ATTACK_RADIUS, SET_ATTACK_RADIUS] = useRecoilState(combatState.ATTACK_RADIUS);
  const [PLAYER_POS, SET_PLAYER_POS] = useRecoilState(combatState.PLAYER_POS);

  // temporary character state//
  // const [actionPoints, setActionPoints] = React.useState(4);
  // const [playerHP, setPlayerHP] = React.useState(10); playerCombatState
  const [enemyHP, setEnemyHP] = React.useState(10);
  const [enemyLocation, setEnemyLocation] = React.useState({ x: 5, y: 10 });
  // const [level, setLevel] = React.useState('parking lot');
  const [mapGrid, setMapGrid] = useRecoilState(combatState.mapGrid);

  React.useEffect(() => {
    const seed = data.find((obj) => obj.level === level);
    setMapGrid(mapGenerate(seed));
  }, [level]);

  // Combat initiator line, rewired for Redux state:
  React.useEffect(() => {
    console.log(combatPhase)
    if (combatPhase === 'noCombat') {
      dispatch(setCombatPhase('playerMove'));
      console.log(combatPhase);
      possiblePaths(ACTION_POINTS, SET_MOVE_OPTIONS, PLAYER_POS, level);
    }
  }, [combatPhase])

  const playerMove = (x, y) => {
    //
    // const movementData = movementTimeout({x:x, y:y},PLAYER_POS) //total time, xTime, yTime, isTurn, movement x and y
    // const TotalDistance = PLAYER_MOVES.find(sq => sq.x === x && sq.y === y).distance;
    // console.log(x, y, 'xy')
    // console.log(actionPoints, 'action points')
    // console.log(TotalDistance, 'distance')
    const playerPath = pathfinder({ x: x, y: y }, PLAYER_MOVE_OPTIONS);
    // setActionPoints(actionPoints - TotalDistance)
    SET_PLAYER_POS({ x: x, y: y });
    SET_MOVE_OPTIONS([]);
    dispatch(setCombatPhase('playerAction'));
    console.log(combatPhase);
    // playerAnimation(playerPath)
  };

  const playerAnimation = (path) => {
    path.forEach(async (move) => {
      await sleep(1);
      SET_PLAYER_POS({ x: move.x, y: move.y });
    });
  };

  return (
    <>
      <CombatUi
        turn={combatPhase}
        SET_ATTACK_RADIUS={SET_ATTACK_RADIUS}
        PLAYER_POS={PLAYER_POS}
        level={level}
      />
      <Wrapper>
        {mapGrid.map((row, idx) => {
          return <LevelVisualGenerator
            row = {row}
            enemyLocation = {enemyLocation}
            playerMove = {playerMove}
          />
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  grid-area: ui;
  width: auto;
  height: 1000px;
  margin-top: 5%;
  margin-left: 5%;
`;

export default CombatTestEnvironment;
