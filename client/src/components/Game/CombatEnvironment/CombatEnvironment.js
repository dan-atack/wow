import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { setupPlayerMovePhase } from '../../../Helpers/playerMovePhase';
// Helper functions:
import { baddieMoveLogic } from '../../../Helpers/baddieMoveLogic';
import { baddieMakeDecision, baddieAction } from '../../../Helpers/baddieActionLogic';
import { specialEventLogic } from '../../../Helpers/specialEventLogic';
import { determineIfBaddieInRange } from '../../../Helpers/playerActionPhase';
// Recoil state management:
import combatState from '../../../state';
import globalState from '../../../state';
import { useRecoilValue, useRecoilState } from 'recoil';


// JSON DATA FILES
import data from '../../../data/mapSeed.json';
import playerMoveData from '../../../data/playerMoves.json';  // 'Moves' here refers to wrestling moves, not movement options
import baddieData from '../../../data/baddie.json';
import contextualMoves from '../../../data/contextualActiveMoves.json';
import moveCombos from '../../../data/playerMoves.json';

//HELPERS
import { possiblePaths, pathfinder } from '../../../Helpers/playerMoveHelper';
import { mapGenerate } from '../../../Helpers/MapGeneratorHelper';
import { adjacent, opponent_adjacent_then_player } from '../../../Helpers/contextualMoveHelper';
import { determineObstacle, advanceCombatSequence, advanceCombatWithMovement } from '../../../Helpers/generalCombatHelpers';

//components
import CombatUi from './CombatUi/CombatUi';
import LevelVisualGenerator from './LevelVisualGenerator';
import Versus from '../VersusScreen/Versus';
// Variable display element for dev-assistance purposes:
import DevDisplay from './DevD';
// Constants:
import { CONSTANTS } from '../../../constants.js';

const CombatEnvironment = () => {
  const devMode = CONSTANTS.DEV_MODE;   // Boolean switch allows optional display of the 'Dev Mode' panel
  // State-dependent combat values start here:
  const [combatPhase, setCombatPhase] = useRecoilState(combatState.combatPhase);   // recoil is used for the combat phase.
  const level = useRecoilValue(globalState.level);                      // All combat state is handled by recoil.

  // Player Related State Values:
  const [playerAttacksInQueue, setPlayerAttacksInQueue] = useRecoilState(combatState.playerAttacksInQueue);
  const [playerHealth, setPlayerHealth] = useRecoilState(combatState.playerHealth);
  const [playerAP, setPlayerAP] = useRecoilState(combatState.playerAP);
  const [playerAttackRadius, setPlayerAttackRadius] = useRecoilState(combatState.playerAttackRadius);
  const [playerHype, setPlayerHype] = useRecoilState(combatState.playerHype);
  const [playerCoords, setPlayerCoords] = useRecoilState(combatState.playerCoords);
  const [playerOrientation, setPlayerOrientation] = useRecoilState(combatState.playerOrientation);
  const [playerMoveOptions, setPlayerMoveOptions] = useRecoilState(combatState.playerMoveOptions);
  const [playerMovementDecision, setPlayerMovementDecision] = useRecoilState(combatState.playerMovementDecision);
  const [playerIsDead, setPlayerIsDead] = useRecoilState(combatState.playerIsDead);
  const [playerSkills, setPlayerSkills] = useRecoilState(combatState.playerSkills);
  const [playerStatus, setPlayerStatus] = useRecoilState(combatState.playerStatus);
  const [playerAttackSelecting, setPlayerAttackSelecting] = useRecoilState(combatState.playerAttackSelecting);

  // Player Attack Data (damage and such) is fetched based on the ID of the 'move' fed to the Reflex Check component:
  const [reflexCheck, setReflexCheck] = useRecoilState(combatState.reflexCheck);

  // Baddie Related State Values:
  const [baddieHP, setBaddieHP] = useRecoilState(combatState.baddieHP);
  const [baddieCoords, setBaddieCoords] = useRecoilState(combatState.baddieCoords);
  const [baddieOrientation, setBaddieOrientation] = useRecoilState(combatState.baddieOrientation);
  const [baddieDecision, setBaddieDecision] = useRecoilState(combatState.baddieDecision);
  const [enemyAttackRadius, setEnemyAttackRadius] = useState([]);
  const [baddieStatus, setBaddieStatus] = useRecoilState(combatState.baddieStatus);

  // temporary character state//
  const [mapGrid, setMapGrid] = useRecoilState(combatState.mapGrid);
  const baddie = baddieData.find((obj) => obj.level === level);
  const seed = data.find((obj) => obj.level === level);

  // Switch case acts as the game's Engine, calling helper functions and then managing state with their outputs.
  // One Effect to Call Them All:
  useEffect(() => {
    switch (combatPhase) {
      case 'noCombat':
        // On initial round of combat, generate map from seed:
        setMapGrid(mapGenerate(seed));
      // Then fall straight through to the baddie decision phase:
      case 'baddieDecision':
        // Helper function contains the logic to determine which move is made:
        const decision = baddieMakeDecision(baddieCoords, baddieOrientation, playerCoords, playerOrientation, baddie);
        setBaddieDecision(decision);    // Pass baddie's move data to recoil
        // Helper function advances to next phase AFTER a given time delay, to allow for an animation 'telegraphing' the decision:
        // console.log(`Baddie move choice: ${decision.name}`);
        advanceCombatSequence(1500, 'playerMove', setCombatPhase);
        // IDEA: Use time hook to make this phase last 1 - 2 seconds; use that time to show a GIF that telegraphs the move!
        break;
      case 'playerMove':
        // Setup possible moves for the player then await their decision:
        const possibleMoves = setupPlayerMovePhase(playerAP, playerCoords, level);
        setPlayerMoveOptions(possibleMoves);
        // No dispatch here; the phase advances when the player picks their move.
        // NOTE: To allow for combat animations, we'll need to add the combat sequence timeout to the player movement helper function
        break;
      case 'baddieAction':
        const dangerZone = baddieAction(baddieCoords, seed, baddieDecision);
        // This will change the Level Visual Generator's props, causing it to reload:
        setEnemyAttackRadius(dangerZone);
        // Determine here if the player gets hit:
        const point = dangerZone.filter(point => point.x === playerCoords.x && point.y === playerCoords.y);
        if (point.length === 1) { // If there is a hit, it will be the only member of this list
          setPlayerHealth(playerHealth - baddieDecision.damage);
            // if the move has an effect then it attaches the effect here
            if (baddieDecision.effect) {
              const { effect, duration } = baddieDecision;

              if (effect.type === 'positional') {
                setPlayerStatus({ ...playerStatus, positional: { duration: duration, name: effect.name } })
              } else if (effect.type === 'elemental') {
                setPlayerStatus({ ...playerStatus, elemental: { name: effect.name, duration: duration } })
              } else if (effect.type === 'physical') {
                let tempArray = [...playerStatus.physical];
                tempArray.push({ name: effect.name, duration: duration });
                setPlayerStatus({ ...playerStatus, physical: tempArray });
              }
            }
            // Baddie throw logic goes here!
            const destination = determineObstacle(baddieDecision.throwDistance, baddieOrientation, baddieCoords, playerCoords, seed);
            // console.log(`DESTINATION: ${destination.x}, ${destination.y}`);
            advanceCombatWithMovement(1000, 'playerAction', setCombatPhase, setPlayerCoords, destination);
          } else {
            // console.log('no hit on player');
            setCombatPhase('playerAction');
          }
        break;
      case 'playerAction':
        // Go through the player's list of attacks and see if the baddie is within range of any of them:
        let inRange = false;
        playerMoveData.forEach((attack) => {
          if (determineIfBaddieInRange(attack.range, playerCoords, baddieCoords)) {
            inRange = true;
          };
        })
        // Uncomment for help troubleshooting:
        // console.log(inRange);
        // console.log(playerCoords);
        // console.log(baddieCoords);
        // If none of the player's moves is in range of the baddie, skip to the next phase:
        if (!inRange) {
          // This code down here is the same as that in the combat ui for the attack button handlers:
          setEnemyAttackRadius([]);
          setPlayerMoveOptions([]);
          // No need to waste time on a delay if no attack is possible. If an attack is possible, delay should be added to player action/combat helper...
          setCombatPhase('specialEvent');
        }
        break;  // Await input from the attack selection inputs and no more.
      case 'specialEvent':
        setPlayerAttacksInQueue([]);
        specialEventLogic(setCombatPhase, level, advanceCombatSequence);
        break;
      case 'baddieMove':
        // Instead of having the logic helper function implement the result of the baddie's move choice, it should return that value.
        // Then, we can pass the result (coords) and the baddie position setter to the advanceCombatWithMovement helper.
        const coords = baddieMoveLogic(
          baddieCoords,
          baddieOrientation,
          setBaddieOrientation,
          playerCoords,
          playerOrientation,
          baddie,
          seed
        );
        // TODO: Set time delay to phase advance based on distance travelled.
        advanceCombatWithMovement(1000, 'baddieDecision', setCombatPhase, setBaddieCoords, coords);
        setCombatPhase('baddieDecision');
        break;
      case 'gameOver':
        break;  // Just hang and wait for the player to hit the reset button.
      case 'victory':
        break;  // Just hang and wait for the player to hit the next level button (and possibly play some kind of animation).
      default:
        console.log('invalid phase requested');
    }
  }, [combatPhase]);

  // Check for Player Attack Selection phase:
  useEffect(() => {
    console.log(`player attack selection target updated to ${playerAttackSelecting}`);
  }, [playerAttackSelecting]);

  // Check for player death:
  useEffect(() => {
    if (playerHealth <= 0) {
      setPlayerIsDead(true);
      setCombatPhase('gameOver');
    }
  }, [playerHealth])

  // Check for baddie death:
  useEffect(() => {
    if (baddieHP <= 0) {
      console.log('Victory! We have victory!')
      setCombatPhase('victory');
    }
  }, [baddieHP])

  // Handler function passed to the LVG, to be fired when the player selects a tile for MOVEMENT:
  const playerMove = (x, y) => {
    const playerPath = pathfinder({ x: x, y: y }, playerMoveOptions);
    setPlayerMoveOptions([]);
    setPlayerMovementDecision({ x: x, y: y });
  };

  // Handler function passed to the LVG, to be fired when the player selects a tile for ATTACK:
  const playerAttack = (x, y) => {
    setPlayerAttackRadius([]);       // Clear player attack radius once attack is selected.
    if (baddieCoords.x === x && baddieCoords.y === y) {
      setReflexCheck(true);  // If the player hits the baddie, begin a reflex check but don't advance combat round.
    } else {                           // Otherwise, advance the combat round:
      setCombatPhase('specialEvent')
    }
  }

  //every player action, check to see if the prerequisites are present for a contextual move
  useEffect(() => {
    if (combatPhase !== 'playerAction') {
      setPlayerSkills(moveCombos);
      return;
    };

    //queries the level for the contextual attacks

    //gets the data of this specific map
    let obstructions = seed.obstructions;


    obstructions.forEach(obstruction => {
      if (!obstruction.active) return;

      let foundMove = contextualMoves.find(move => move.name === obstruction.active);

      if (foundMove.context === 'adjacent') {
        adjacent(obstruction, playerCoords, setPlayerSkills, playerSkills, foundMove)
      } else if (foundMove.context === 'opponent_adjacent_then_player') {
        opponent_adjacent_then_player(obstruction, playerCoords, baddieCoords, setPlayerSkills, playerSkills, foundMove)
      } else {
        setPlayerSkills(moveCombos);
      }
    })

  }, [combatPhase])

  useEffect(() => {
    if (combatPhase !== 'playerMove') return;

    //Checks players status' elapses those elapsed, and ticks duration down by 1
    if (playerStatus.physical?.length > 0) {
      let tempArray = []
      playerStatus.physical.forEach(effect => {
        if (effect.duration - 1 !== 0) {
          tempArray.push({ name: effect.name, duration: effect.duration - 1 });
        }
      })
      setPlayerStatus({ ...playerStatus, physical: tempArray });
    }

    if (playerStatus.elemental?.name) {
      if (playerStatus.elemental.duration - 1 !== 0) {
        setPlayerStatus({ ...playerStatus, elemental: { name: playerStatus.elemental.name, duration: playerStatus.elemental.duration - 1 } })
      } else {
        setPlayerStatus({ ...playerStatus, elemental: {} })
      }
    }

    if (playerStatus.positional?.name) {
      if (playerStatus.positional.duration - 1 !== 0) {
        setPlayerStatus({ ...playerStatus, positional: { name: playerStatus.positional.name, duration: playerStatus.positional.duration - 1 } })
      } else {
        setPlayerStatus({ ...playerStatus, positional: {} });
      }
    }

    //Checks players status' elapses those elapsed, and ticks duration down by 1
    if (baddieStatus.physical?.length > 0) {
      let tempArray = []
      baddieStatus.physical.forEach(effect => {
        if (effect.duration - 1 !== 0) {
          tempArray.push({ name: effect.name, duration: effect.duration - 1 });
        }
      })
      setBaddieStatus({ ...baddieStatus, physical: tempArray });
    }

    if (baddieStatus.elemental?.name) {
      if (baddieStatus.elemental.duration - 1 !== 0) {
        setBaddieStatus({ ...baddieStatus, elemental: { name: baddieStatus.elemental.name, duration: baddieStatus.elemental.duration - 1 } })
      } else {
        setBaddieStatus({ ...baddieStatus, elemental: {} })
      }
    }

    if (baddieStatus.positional?.name) {
      if (baddieStatus.positional.duration - 1 !== 0) {
        setBaddieStatus({ ...baddieStatus, positional: { name: baddieStatus.positional.name, duration: baddieStatus.positional.duration - 1 } })
      } else {
        setBaddieStatus({ ...baddieStatus, positional: {} });
      }
    }

  }, [combatPhase])

  return (
    <>
      {devMode && <DevDisplay
        playerHP={playerHealth}
        playerAP={playerAP}
        playerHype={playerHype}
        playerCoords={playerCoords}
        playerOrientation={playerOrientation}
        baddieHP={baddieHP}
        baddieCoords={baddieCoords}
        baddieOrientation={baddieOrientation}
        baddieDecision={baddieDecision}
        playerAttacksInQueue={playerAttacksInQueue}
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
                key={Math.random() * 100000}
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
