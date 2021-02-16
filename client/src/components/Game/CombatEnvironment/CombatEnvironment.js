import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setCombatPhase, startReflexCheck } from '../../../actions';
import { setupPlayerMovePhase } from '../../../Helpers/playerMovePhase';
// Redux-advancing helper functions:
import { baddieMoveLogic } from '../../../Helpers/baddieMoveLogic';
import { baddieMakeDecision, baddieAction } from '../../../Helpers/baddieActionLogic'; 
import { specialEventLogic } from '../../../Helpers/specialEventLogic';
// Recoil state management:
import combatState from '../../../state';
import globalState from '../../../state';
import { useRecoilValue, useRecoilState } from 'recoil';

import { possiblePaths, pathfinder } from '../../../Helpers/playerMoveHelper';

import data from '../../../data/mapSeed.json';
import playerMoveData from '../../../data/playerMoves.json';  // 'Moves' here refers to wrestling moves, not movement options
import baddieData from '../../../data/baddie.json';

import { mapGenerate } from '../../../Helpers/MapGeneratorHelper';

//components
import CombatUi from './CombatUi/CombatUi';
import LevelVisualGenerator from './LevelVisualGenerator';
import Versus from '../VersusScreen/Versus';
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
  const [playerAttackRadius, setPlayerAttackRadius] = useRecoilState(combatState.playerAttackRadius);
  const [playerHype, setPlayerHype] = useRecoilState(combatState.playerHype);
  const [playerCoords, setPlayerCoords] = useRecoilState(combatState.playerCoords);
  const [playerMoveOptions, setPlayerMoveOptions] = useRecoilState(
    combatState.playerMoveOptions
  );
  // Player Attack Data (damage and such) is fetched based on the ID of the 'move' fed to the Reflex Check component:
  const reflexCheckId = useSelector((state) => state.game.reflexCheck);
  const playerAttackData = playerMoveData.find((move) => move.id === reflexCheckId);  // Hacky but effective!
  // Baddie Related State Values:
  const [baddieHP, setBaddieHP] = useRecoilState(combatState.baddieHP);
  const [baddieCoords, setBaddieCoords] = useRecoilState(combatState.baddieCoords);
  const [baddieDecision, setBaddieDecision] = useRecoilState(combatState.baddieDecision);
  const [enemyAttackRadius, setEnemyAttackRadius] = useState([]);

  // temporary character state//
  const [mapGrid, setMapGrid] = useRecoilState(combatState.mapGrid);
  const baddie = baddieData.find((obj) => obj.level === level);
  const seed = data.find((obj) => obj.level === level);

  // Switch case acts as the game's Engine, calling helper functions and then managing state with their outputs.
  // One Effect to Call Them All:
  React.useEffect(() => {
    switch (combatPhase) {
      case 'noCombat':
        // On initial round of combat, generate map from seed:
        setMapGrid(mapGenerate(seed));
        // Then fall straight through to the baddie decision phase:
      case 'baddieDecision':
        // Helper function contains the logic to determine which move is made:
        const decision = baddieMakeDecision(baddieCoords, playerCoords, baddie);
        setBaddieDecision(decision);    // Pass baddie's move data to recoil
        dispatch(setCombatPhase('playerMove'));                       // Advance to next combat phase with redux
        // IDEA: Use time hook to make this phase last 1 - 2 seconds; use that time to show a GIF that telegraphs the move!
        break;
      case 'playerMove':
        // Setup possible moves for the player then await their decision:
        const possibleMoves = setupPlayerMovePhase(playerAP, playerCoords, level);
        setPlayerMoveOptions(possibleMoves);
        // No dispatch here; the phase advances when the player picks their move.
        break;
      case 'baddieAction':
        const dangerZone = baddieAction(baddieCoords, seed, baddieDecision);
        // This will change the Level Visual Generator's props, causing it to reload:
        setEnemyAttackRadius(dangerZone);
        // Determine here if the player gets hit:
        dangerZone.forEach((point) => {
          if (point.x === playerCoords.x && point.y === playerCoords.y) {
            setPlayerHealth(playerHealth - baddieDecision.damage);
            console.log(`Player is hit by ${baddieDecision.name}, causing ${baddieDecision.damage} damage!`)
          }
        });
        dispatch(setCombatPhase('playerAction'));
        break;
      case 'playerAction':
        // Await input from the attack selection inputs and no more.
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
  }, [combatPhase]);

  React.useEffect(() => {
    if (playerHealth <= 0 ){
      console.log('Game Over Man.')
    }
  }, [playerHealth])

  // Handler function passed to the LVG, to be fired when the player selects a tile for MOVEMENT:
  const playerMove = (x, y) => {
    console.log('player moves');
    const playerPath = pathfinder({ x: x, y: y }, playerMoveOptions);
    setPlayerCoords({ x: x, y: y });
    setPlayerMoveOptions([]);
    dispatch(setCombatPhase('baddieAction'));
  };

  // Handler function passed to the LVG, to be fired when the player selects a tile for ATTACK:
  const playerAttack = (x, y) => {
    console.log('player attacks at ', x, y);
    setPlayerAttackRadius([]);       // Clear player attack radius once attack is selected.
    if (baddieCoords.x === x && baddieCoords.y === y) {
      dispatch(startReflexCheck());    // If the player hits the baddie, begin a reflex check but don't advance combat round.
    } else {                           // Otherwise, do advance the combat round:
      dispatch(setCombatPhase('specialEvent'))
    }
  }

  return (
    <>
      {devMode && <DevDisplay
        playerHP={playerHealth}
        playerAP={playerAP}
        playerHype={playerHype}
        playerCoords={playerCoords}
        baddieHP={baddieHP}
        baddieCoords={baddieCoords}
        baddieDecision={baddieDecision}
      />} 
      {/* <Versus/> */}
      <CombatUi
        turn={combatPhase}
        setEnemyAttackRadius={setEnemyAttackRadius}
      />
      <Wrapper>
        <div>
          {mapGrid.map((row) => {
            return (
              <LevelVisualGenerator
                row={row}
                baddieCoords={baddieCoords}
                playerMove={playerMove}
                playerAttack={playerAttack}
                enemyAttackRadius={enemyAttackRadius}
              />
            );
          })}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CombatEnvironment;
