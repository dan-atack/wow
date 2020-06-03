import React from 'react';
import styled from 'styled-components';

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
              possibleArray.push(move)
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

  const playerMove = (x, y) => {
    const distance = PLAYER_MOVES.find(sq => sq.x === x && sq.y === y).distance;
    console.log(x, y, 'xy')
    console.log(actionPoints, 'action points')
    console.log(distance, 'distance')
    setActionPoints(actionPoints - distance)
    SET_PLAYER_POS({x:x, y:y})
  }

  React.useEffect(()=> {
    if (actionPoints > 0) {
      possiblePaths()
    } else {
      SET_TURN('enemy')
      setActionPoints(4);
      setEnemyLocation({x: enemyLocation.x, y: enemyLocation.y + 1})
      SET_TURN('player')
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
                  <Player/>
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
  outline: 1px solid black;
  opacity: 0.8;
`;
const Path = styled.div`
  width: 50px;
  height: 50px;
  background-color: yellow;
  outline: 1px solid black;
  opacity: 0.8;
`;

export default CombatTestEnvironment;