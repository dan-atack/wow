import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setCombatPhase,} from '../../../actions';
import {
  setupPlayerMovePhase,
  playerMove,
} from '../../../Helpers/playerMovePhase';
// Redux-advancing helper functions:
import { playerActionPhase } from '../../../Helpers/playerActionPhase';
import { baddieMoveLogic } from '../../../Helpers/baddieMoveLogic';
import { baddieDecision, baddieAction } from '../../../Helpers/baddieActionLogic'; 
import { specialEventLogic } from '../../../Helpers/specialEventLogic';
// Recoil state management:
import combatState from '../../../state';
import globalState from '../../../state';
import { useRecoilValue, useRecoilState } from 'recoil';

import { possiblePaths, pathfinder } from '../../../Helpers/playerMoveHelper';

import data from '../../../data/mapSeed.json';
import baddieData from '../../../data/baddie.json';

import { mapGenerate } from '../../../Helpers/MapGeneratorHelper';

//components
import CombatUi from './CombatUi';
import LevelVisualGenerator from './LevelVisualGenerator';
// Variable display element for dev-assistance purposes:
import DevDisplay from './DevD';

const CombatEnvironment = () => {
  const dispatch = useDispatch();
  const devMode = true;   // Boolean switch allows optional display of the 'Dev Mode' panel (shows all combat-related variables)
  // State-dependent combat values start here:
  const combatPhase = useSelector((state) => state.game.combatPhase);   // Redux is used for the combat phase.
  const level = useRecoilValue(globalState.level);                      // All other combat state is handled by recoil.
  // Player Related State Values:
  const [playerHealth, setPlayerHealth] = useRecoilState(combatState.playerHealth);
  const [playerAP, setPlayerAP] = useRecoilState(combatState.playerAP);
  const [playerHype, setPlayerHype] = useRecoilState(combatState.playerHype);
  const [playerCoords, setPlayerCoords] = useRecoilState(combatState.playerCoords);
  const [PLAYER_MOVE_OPTIONS, SET_MOVE_OPTIONS] = useRecoilState(
    combatState.PLAYER_MOVE_OPTIONS
  );
  const [ATTACK_RADIUS, SET_ATTACK_RADIUS] = useRecoilState(
    combatState.ATTACK_RADIUS
  );
  // Baddie Related State Values:
  const [baddieHP, setBaddieHP] = useRecoilState(combatState.baddieHP);
  const [baddieCoords, setBaddieCoords] = useRecoilState(combatState.baddieCoords);
  const [enemyDecision, setEnemyDecision] = useRecoilState(combatState.baddieAttack);
  const [ENEMY_ATTACK_RADIUS, SET_ENEMY_ATTACK_RADIUS] = useState([]);

  // temporary character state//
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
        // Then fall straight through to the baddie decision phase:
      case 'baddieDecision':
        // Helper function contains the logic to determine which move is made:
        const decision = baddieDecision(baddieCoords, playerCoords, baddie);
        setEnemyDecision({...enemyDecision, decision : decision});    // Pass baddie's move data to recoil
        dispatch(setCombatPhase('playerMove'));                       // Advance to next combat phase with redux
        break;
      case 'playerMove':
        console.log(enemyDecision)
        setupPlayerMovePhase(
          playerAP,
          SET_MOVE_OPTIONS,
          playerCoords,
          level,
          dispatch,
          setCombatPhase
        );
        break;
      case 'baddieAction':
        baddieAction(dispatch, setCombatPhase, baddieCoords, playerCoords, baddie, seed, enemyDecision.decision, SET_ENEMY_ATTACK_RADIUS);
        break;
      case 'playerAction':
        playerActionPhase(dispatch, setCombatPhase);
        break;
      case 'specialEvent':
        specialEventLogic(dispatch, setCombatPhase, level);
        break;
      case 'baddieMove':
        baddieMoveLogic(dispatch, setCombatPhase, baddieCoords, setBaddieCoords, playerCoords, baddie, seed,);
        break;
      default:
        console.log('invalid phase requested');
    }
  }, [combatPhase, playerCoords]);
  // End of Super Switch Statement

  // Combat initiator line, rewired for Redux state:
  React.useEffect(() => {
    if (combatPhase === 'noCombat') {
      dispatch(setCombatPhase('playerMove'));
      possiblePaths(playerAP, SET_MOVE_OPTIONS, playerCoords, level);
    }
  }, [combatPhase]);

  React.useEffect(() => {
    if (playerHealth === 0 ){
      console.log('Game Over')
    }
  }, [playerHealth])

  const playerMove = (x, y) => {
    const playerPath = pathfinder({ x: x, y: y }, PLAYER_MOVE_OPTIONS);
    setPlayerCoords({ x: x, y: y });
    SET_MOVE_OPTIONS([]);
    dispatch(setCombatPhase('baddieAction'));
  };

  return (
    <>
      {devMode ? <DevDisplay
        playerHP={playerHealth}
        playerAP={playerAP}
        playerHype={playerHype}
        playerCoords={playerCoords}
        baddieHP={baddieHP}
        baddieCoords={baddieCoords}
      /> : <></>}
      <CombatUi
        turn={combatPhase}
        SET_ENEMY_ATTACK_RADIUS={SET_ENEMY_ATTACK_RADIUS}
      />
      <Wrapper>
        {mapGrid.map((row, idx) => {
          return (
            <LevelVisualGenerator
              row={row}
              baddieCoords={baddieCoords}
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

export default CombatEnvironment;
