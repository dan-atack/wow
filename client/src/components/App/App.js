import React from 'react';
import Game from '../Game';
import styled from 'styled-components';

function App() {
  return (
    <AppBody className='App'>
      <h1>World of Wrestling!!</h1>
      <Game />
    </AppBody>
  );
}

const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export default App;
