import React from 'react';
import styled from 'styled-components';

import { movementTimeout, sleep } from '../../../Helpers/helper'

const CombatTestEnvironment = () => {
  const [PLAYER_POS, SET_PLAYER_POS] = React.useState({x:5, y:1});
  const [PLAYER_MOVES, SET_PLAYER_MOVES]= React.useState([])
  const [TURN, SET_TURN] = React.useState('player')
  const [OBSTRUCTIONS, SET_OBSTRUCTIONS] = React.useState([
    {x:1, y:1, obstacle:'turn buckle'},
    {x:10, y:10, obstacle:'turn buckle'},
    {x:1, y:10, obstacle:'turn buckle'},
    {x:10, y:1, obstacle:'turn buckle'},
  ]);

  //temporary character state//
  const [actionPoints, setActionPoints] = React.useState(4)
  const [playerHP, setPlayerHP] = React.useState(10)
  const [enemyHP, setEnemyHP] = React.useState(10)
  const [enemyLocation, setEnemyLocation] = React.useState({x:5, y: 10})

  const width = 10;
  const height = 10;
  let mapGrid = [];
  for (let y = 1; y <= height; y++) {
    mapGrid.push([]);
    for (let x = 1; x <= width; x++) {
      mapGrid[y - 1].push({ y: y, x: x, obst: 0 });
    }
  }

  const possiblePaths = () => {
    SET_PLAYER_MOVES([])
    let distanceCounter = 1;
    let moves = actionPoints;
    const possibleArray = [PLAYER_POS];
    for (let i = moves; i > 0; i-= 1) {
      possibleArray.forEach(node => {
        const unsolvedSpaces = [
          {x: node.x - 1, y: node.y, distance: distanceCounter},
          {x: node.x + 1, y: node.y, distance: distanceCounter},
          {y: node.y - 1, x: node.x, distance: distanceCounter},
          {y: node.y + 1, x: node.x, distance: distanceCounter},
        ]
        unsolvedSpaces.forEach((move) => {
          if ((move.x > 0 && move.y > 0 && move.x <= width && move.y <= height) && (!OBSTRUCTIONS.find(obj=> obj.x === move.x && obj.y === move.y))) {
            if(i === 0) {
              return
            } else {
              if(possibleArray.find(obj => (obj.x === move.x && obj.y === move.y)) === undefined) {
                possibleArray.push(move)
              } else {
                return
              }
            }
          } else {
            return
          }
        })
      })
      distanceCounter += 1;
    }
    SET_PLAYER_MOVES(possibleArray);
  }
  // console.log(PLAYER_MOVES)
  const playerMove = (x, y) => { // 
    // const movementData = movementTimeout({x:x, y:y},PLAYER_POS) //total time, xTime, yTime, isTurn, movement x and y
    const TotalDistance = PLAYER_MOVES.find(sq => sq.x === x && sq.y === y).distance;
    // console.log(x, y, 'xy')
    // console.log(actionPoints, 'action points')
    // console.log(TotalDistance, 'distance')
    const playerPath = path({x:x, y:y})
    // setActionPoints(actionPoints - TotalDistance)
    // SET_PLAYER_POS({x:x, y:y})
    playerAnimation(playerPath)
  }

  const playerAnimation = (path) => {
    path.forEach( async (move) => {
      await sleep(1);
      SET_PLAYER_POS({x:move.x, y:move.y})
    })
  }

  const path = (target) => { // takes target location and extrapolates a path backwards
    let endpoint = PLAYER_MOVES.find(obj => obj.x === target.x && obj.y === target.y);
    console.log(endpoint, 'endpoint')
    let previousSquare = endpoint
    const pathArray = [endpoint]
    for(let i = endpoint.distance - 1; i > 0; i -= 1) {
      const tempPath = PLAYER_MOVES.find(obj => 
        (obj.distance === i && obj.x === previousSquare.x - 1 && obj.y === previousSquare.y) ||
        (obj.distance === i && obj.x === previousSquare.x + 1 && obj.y === previousSquare.y) ||
        (obj.distance === i && obj.y === previousSquare.y + 1 && obj.y === previousSquare.x) ||
        (obj.distance === i && obj.y === previousSquare.y - 1 && obj.x === previousSquare.x)
      )
      pathArray.push(tempPath);
      previousSquare = tempPath;
    }
    return pathArray.sort((a,b) => {
      return a.distance - b.distance;
    })
  }

  React.useEffect(()=> {
    if (actionPoints > 0) {
      possiblePaths()
    } else {
      setActionPoints(4);
      setEnemyLocation({x: enemyLocation.x, y: enemyLocation.y + 1})
    }
  }, [PLAYER_POS, enemyLocation])
  if(TURN === 'player') {
    return (
      <Wrapper>
      {mapGrid.map((row, idx) => {
        return (
          <div key={idx} style={{display:'flex'}}>
            {row.map((sq) => {
              if(sq.x === PLAYER_POS.x && sq.y === PLAYER_POS.y) {
                return (
                  <Player />
                )
              }  else if (OBSTRUCTIONS.find(obs => sq.x === obs.x && sq.y === obs.y)){
                return (
                  <Box>{OBSTRUCTIONS.find(obs => sq.x === obs.x && sq.y === obs.y).obstacle}</Box>
                )
              } else if (sq.x === enemyLocation.x && sq.y === enemyLocation.y) { 
                return (
                  <Enemy>enemy</Enemy>
                )
              } else if (PLAYER_MOVES.find(obs => sq.x === obs.x && sq.y === obs.y)) {
                return (
                  <PossibleBox 
                  key={Math.random() * 100000}
                  onClick = {() => playerMove(sq.x, sq.y)}
                  >
                    {sq.x}, {sq.y}
                  </PossibleBox>
                )
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
  );
  } else {
    return (
      <Wrapper>
      {mapGrid.map((row, idx) => {
        return (
          <div key={idx} style={{display:'flex'}}>
            {row.map((sq) => {
              if(sq.x === PLAYER_POS.x && sq.y === PLAYER_POS.y) {
                return (
                  <Player/>
                )
              } else if (OBSTRUCTIONS.find(obs => sq.x === obs.x && sq.y === obs.y)){
                return (
                  <Box>{OBSTRUCTIONS.find(obs => sq.x === obs.x && sq.y === obs.y).obstacle}</Box>
                )
              } else if (sq.x === enemyLocation.x && sq.y === enemyLocation.y) { 
                return (
                  <Enemy>enemy</Enemy>
                )
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
  );
  }
}

const Wrapper = styled.div`
  width: auto;
  height: auto;
  position: absolute;
`;
const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: grey;
  border: 1px solid black;
  opacity: 0.5;
`
const Enemy = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
  border: 1px solid black;
  opacity: 0.5;
`

const PossibleBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: grey;
  border: 1px solid black;
  opacity: 0.9;
`

const Player = styled.div`
  width: 50px;
  height: 50px;
  background-color: red;
  border: 1px solid black;
  opacity: 0.8;
  transition
`;

//       animation: ${(props) => blast(props.x, props.y)} 500ms ease-in,
//         ${fade} 1000ms forwards;

const Path = styled.div`
  width: 50px;
  height: 50px;
  background-color: yellow;
  border: 1px solid black;
  opacity: 0.8;
`;

export default CombatTestEnvironment;