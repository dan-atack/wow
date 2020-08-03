import React from 'react';
import styled from 'styled-components';

import { movementTimeout, sleep, possiblePaths, pathfinder } from '../../../Helpers/playerMoveHelper'
import { attackRange } from '../../../Helpers/playerCombatHelper'
import data from '../../../data/mapSeed.json'
import {mapGenerate} from '../../../Helpers/MapGeneratorHelper'

//components
import CombatUi from './CombatUi';

const CombatTestEnvironment = () => {
  const [PLAYER_POS, SET_PLAYER_POS] = React.useState({ x: 5, y: 1 });
  const [PLAYER_MOVES, SET_PLAYER_MOVES] = React.useState([]);
  const [TURN, SET_TURN] = React.useState('idle');
  const [ATTACK_RADIUS, SET_ATTACK_RADIUS] = React.useState([]);
  const [OBSTRUCTIONS, SET_OBSTRUCTIONS] = React.useState([
    { x: 1, y: 1, obstacle: 'turn buckle' },
    { x: 10, y: 10, obstacle: 'turn buckle' },
    { x: 1, y: 10, obstacle: 'turn buckle' },
    { x: 10, y: 1, obstacle: 'turn buckle' },
  ]);
  //temporary character state//
  const [actionPoints, setActionPoints] = React.useState(4);
  const [playerHP, setPlayerHP] = React.useState(10);
  const [enemyHP, setEnemyHP] = React.useState(10);
  const [enemyLocation, setEnemyLocation] = React.useState({ x: 5, y: 10 });
  const [level, setLevel] = React.useState('parking lot');
  const [mapGrid, setMapGrid] = React.useState([]);
  const playerSkills = [
    {name: 'slap', range: 1, pathing: 'radial'},
    {name: 'slap', range: 1, pathing: 'radial'},
    {name: 'slap', range: 1, pathing: 'radial'},
    {name: 'slap', range: 1, pathing: 'radial'},
  ]

  React.useEffect(() => {
    const seed = data.find(obj => obj.level === level)
    setMapGrid(mapGenerate(seed))
  }, [level])


  // const width = 10;
  // const height = 10;
  // for (let y = 1; y <= height; y++) {
  //   mapGrid.push([]);
  //   for (let x = 1; x <= width; x++) {
  //     mapGrid[y - 1].push({ y: y, x: x, obst: 0 });
  //   }
  // }
  console.log(ATTACK_RADIUS)
  if(TURN === 'idle') {
    SET_TURN('playerMove')
    possiblePaths(actionPoints, SET_PLAYER_MOVES, PLAYER_POS, level, OBSTRUCTIONS)
  }

  const playerMove = (x, y) => { // 
    // const movementData = movementTimeout({x:x, y:y},PLAYER_POS) //total time, xTime, yTime, isTurn, movement x and y
    // const TotalDistance = PLAYER_MOVES.find(sq => sq.x === x && sq.y === y).distance;
    // console.log(x, y, 'xy')
    // console.log(actionPoints, 'action points')
    // console.log(TotalDistance, 'distance')
    const playerPath = pathfinder({x:x, y:y}, PLAYER_MOVES)
    // setActionPoints(actionPoints - TotalDistance)
    SET_PLAYER_POS({x:x, y:y})
    SET_PLAYER_MOVES([])
    SET_TURN('playerAction')
    // playerAnimation(playerPath)
  }

  const playerAnimation = (path) => {
    path.forEach(async (move) => {
      await sleep(1);
      SET_PLAYER_POS({ x: move.x, y: move.y });
    });
  };

  return (
    <>
      <CombatUi 
        turn={TURN} 
        SET_ATTACK_RADIUS={SET_ATTACK_RADIUS} 
        playerSkills={playerSkills}
        PLAYER_POS={PLAYER_POS}
        OBSTRUCTIONS={OBSTRUCTIONS}
      />
      <Wrapper>
        {mapGrid.map((row, idx) => {
          return (
            <div key={Math.random() * 100000} style={{ display: 'flex' }}>
              {row.map((sq) => {
                if (sq.x === PLAYER_POS.x && sq.y === PLAYER_POS.y) {
                  return <Player key={Math.random() * 100000} />;
                } else if (
                  OBSTRUCTIONS.find((obs) => sq.x === obs.x && sq.y === obs.y)
                ) {
                  return (
                    <Box key={Math.random() * 100000}>
                      {
                        OBSTRUCTIONS.find(
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
                  PLAYER_MOVES.find((obs) => sq.x === obs.x && sq.y === obs.y)
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
        })}
      </Wrapper>
    </>
  );
}



const Wrapper = styled.div`
  grid-area: ui;
  width: auto;
  height: 1000px;
  margin-top: 5%;
  margin-left: 5%;
`;

const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: grey;
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

export default CombatTestEnvironment