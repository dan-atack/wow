import React from 'react';
import styled from 'styled-components';
// Temporary squatters using this component as a test environment:
import ReflexCheck from '../ReflexCheck';
import moveCombos from '../../../data/moveCombos.json';

function Customizer({ words }) {
  const randMove = Math.floor(Math.random() * 3);
  // It is easier if the randomization all occurs in the component that doesn't rerender all the time:
  const randCombo = Math.floor(Math.random() * 3);
  const move = moveCombos[randMove];
  return (
    <Wrapper>
      <h1>Character Customization and Sandbox UI!!!</h1>
      <h1>{words}</h1>
      <ReflexCheck move={move} combo={randCombo} numPrevMoves={2}/>
      {/* <h1>Skill points</h1> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-area: ui;
  margin: 4% 9%;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;

export default Customizer;
