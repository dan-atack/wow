import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setCombatPhase, setPlayerCoords } from '../../../actions';
import {
  setupPlayerMovePhase,
  playerMove,
} from '../../../Helpers/playerMovePhase';
// Dan's redux-advancing imports start:
import { playerActionPhase } from '../../../Helpers/playerActionPhase';
import { baddieMoveLogic } from '../../../Helpers/baddieMoveLogic';
import { baddieDecision, baddieAction } from '../../../Helpers/baddieActionLogic'; 
import { specialEventLogic } from '../../../Helpers/specialEventLogic';
// Dan's redux-advancing imports end

// recoil state management
import combatState from '../../../state';
import globalState from '../../../state';
import { useRecoilValue, useRecoilState } from 'recoil';

import {
  movementTimeout,
  sleep,
  possiblePaths,
  pathfinder,
} from '../../../Helpers/playerMoveHelper';

import { attackRange } from '../../../Helpers/playerCombatHelper';
import data from '../../../data/mapSeed.json';
import baddieData from '../../../data/baddie.json';

import { mapGenerate } from '../../../Helpers/MapGeneratorHelper';

//components
import CombatUi from './CombatUi';
import LevelVisualGenerator from './LevelVisualGenerator';
import { health } from '../../../state/combatState';

const CombatTestEnvironment = () => {
  const dispatch = useDispatch();
  const ACTION_POINTS = useRecoilValue(combatState.ACTION_POINTS);
  const level = useRecoilValue(globalState.level);
  // Bring in the global state:
  const combatPhase = useSelector((state) => state.game.combatPhase);
  const [PLAYER_MOVE_OPTIONS, SET_MOVE_OPTIONS] = useRecoilState(
    combatState.PLAYER_MOVE_OPTIONS
  );
  const [ATTACK_RADIUS, SET_ATTACK_RADIUS] = useRecoilState(
    combatState.ATTACK_RADIUS
  );
  const [health, setHealth] = useRecoilState(combatState.health);
  const [PLAYER_POS, SET_PLAYER_POS] = useRecoilState(combatState.PLAYER_POS);
  const [enemyDecision, setEnemyDecision] = useRecoilState(combatState.baddieAttack);
  const [ENEMY_ATTACK_RADIUS, SET_ENEMY_ATTACK_RADIUS] = useState([])

  // temporary character state//
  const [enemyHP, setEnemyHP] = React.useState(10);
  const [baddiePosition, setBaddiePosition] = React.useState({ x: 5, y: 10 });
  const [mapGrid, setMapGrid] = useRecoilState(combatState.mapGrid);
  const baddie = baddieData.find((obj) => obj.level === level);
  const seed = data.find((obj) => obj.level === level);

  // Super Switch Case Start //
  // One Effect to Call Them All:
  React.useEffect(() => {
    switch (combatPhase) {
      case 'noCombat':
        // On initial round of combat, generate map from seed:
        setMapGrid(mapGenerate(seed));
        // Then dispatch player movement phase:
        dispatch(setCombatPhase('baddieDecision'));
      case 'baddieDecision':
        baddieDecision(dispatch, setCombatPhase, baddiePosition, PLAYER_POS, baddie, seed, setEnemyDecision, enemyDecision);
        break;
      case 'playerMove':
        setupPlayerMovePhase(
          ACTION_POINTS,
          SET_MOVE_OPTIONS,
          PLAYER_POS,
          level,
          dispatch,
          setCombatPhase
        );
        break;
      case 'baddieAction':
        baddieAction(dispatch, setCombatPhase, baddiePosition, PLAYER_POS, baddie, seed, enemyDecision.decision, SET_ENEMY_ATTACK_RADIUS)
      case 'playerAction':
        playerActionPhase(dispatch, setCombatPhase);
        break;
      case 'specialEvent':
        specialEventLogic(dispatch, setCombatPhase, level);
        break;
      case 'baddieMove':
        baddieMoveLogic(dispatch, setCombatPhase, baddiePosition, setBaddiePosition, PLAYER_POS, baddie, seed,);
        break;
    }
  }, [combatPhase, PLAYER_POS]);
  // End of Super Switch Statement

  // Combat initiator line, rewired for Redux state:
  React.useEffect(() => {
    // console.log(combatPhase);
    if (combatPhase === 'noCombat') {
      dispatch(setCombatPhase('playerMove'));
      possiblePaths(ACTION_POINTS, SET_MOVE_OPTIONS, PLAYER_POS, level);
    }
  }, [combatPhase]);

  // React.useEffect(() => {
  //   if (health === 0 ){
  //     console.log('Game Over')
  //   }
  // }, [health])

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
    dispatch(setCombatPhase('baddieAction'));
    // playerAnimation(playerPath)
  };

  return (
    <>
      <CombatUi
        turn={combatPhase}
        SET_ENEMY_ATTACK_RADIUS={SET_ENEMY_ATTACK_RADIUS}
      />
      <Wrapper>
        {mapGrid.map((row, idx) => {
          return (
            <LevelVisualGenerator
              row={row}
              baddiePosition={baddiePosition}
              playerMove={playerMove}
              ENEMY_ATTACK_RADIUS={ENEMY_ATTACK_RADIUS}
            />
          );
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
