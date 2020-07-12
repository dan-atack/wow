import React from 'react';
import styled from 'styled-components';
import Arena_01_proto from '../../../assets/arena_01_proto.jpg';
import EricTest from '../EricTest';

function Overworld() {
  // const Cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const nRows = 8;
  const nCols = 4;
  let grid = [];
  for (let i = 1; i <= nRows; i++) {
    let row = [];
    for (let x = 1; x <= nCols; x++) {
      row.push();
    }
    grid.push();
  }

  return (
    <Wrapper>
      {/* <h3>Da World</h3> */}
      <EricTest />
      {/* <Tile src={Arena_01_proto} alt='arena' /> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
  margin: 16px;
  border-radius: 8px;
  grid-area: map;
  overflow: hidden;
  justify-content: center;
`;

const Tile = styled.img`
  max-width: 128px;
  max-height: 128px;
`;

export default Overworld;
