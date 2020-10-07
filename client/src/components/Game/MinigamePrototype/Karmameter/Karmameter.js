import React from 'react';
import styled from 'styled-components';

// The Karmameter will be a round display output which tracks your position on two axes: Karmic and Virtuosic
// Later iterations of this should have space for inner rings/regions to indicate when your dialogue choices have
// nudged you towards eligibility for certain bonuses/powerups/unique moves.
function Karmameter({ valueA, valueB, axisA, axisB}) {
  // Color scheme logic is bananas...
  const colorScheme =
    axisA === 'karmic'
      ? valueA > 1
        ? 'rgb(27, 204, 65)'
        : 'rgb(204, 39, 27)'
      : valueB > 1
      ? 'rgb(190, 175, 35)'
      : 'rgb(39, 39, 179)';
  return (
    <Wrapper colorScheme={colorScheme}>
      <h1>{axisA}</h1>
      <h2>{valueA}</h2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 192px;
  width: 384px;
  font-size: 1em;
  background-color: ${(props) => props.colorScheme};
  border: 3px solid whitesmoke;
  border-radius: 50%;
  color: whitesmoke;
`;

export default Karmameter;
