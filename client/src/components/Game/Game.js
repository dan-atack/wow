import React from 'react';
import styled from 'styled-components';
import Overworld from './Overworld';
import MenuBar from './MenuBar';
import CharacterDisplay from './CharacterDisplay';
import PlayerSetup from './PlayerSetup';
import StatusBars from './StatusBars';

function Game() {
  return (
    <GameBody>
      <MenuBar></MenuBar>
      <PlayerSetup />
      <StatusBars />
      <Overworld />
    </GameBody>
  );
}

const GameBody = styled.div`
  display: grid;
  grid-template-areas:
    'mainmenu mainmenu mainmenu mainmenu'
    'disp disp bars bars'
    'disp disp stat stat'
    'map map map map'
    'map map map map';
  grid-template-rows: 4fr 9fr 9fr 9fr 9fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-height: 90vh;
`;

export default Game;
