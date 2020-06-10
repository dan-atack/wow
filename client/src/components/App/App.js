import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from '../Game';
import MainMenu from '../MainMenu';
import SelectCharacter from '../SelectCharacter';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <AppBody className='App'>
        <Switch>
          <Route exact path='/'>
            <MainMenu />
          </Route>
          <Route path='/select-character'>
            <SelectCharacter />
          </Route>
          <Route path='/game'>
            <Game />
          </Route>
        </Switch>
      </AppBody>
    </Router>
  );
}

const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export default App;
