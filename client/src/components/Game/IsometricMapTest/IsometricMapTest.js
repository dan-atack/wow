import React from 'react';
import styled from 'styled-components';

function IsometricMap() {
  const cols = [1, 2, 3, 4, 5, 6, 7];
  const rows = [1, 2, 3, 4, 5, 6, 7];
  return (
    <Wrapper>
      {rows.map((row) => {
        return (
          <Row key={`row_${row}`} offset={row}>
            {cols.map((col) => {
              return <Cell key={`${col}-${row}`} />;
            })}
          </Row>
        );
      })}
      <Cell />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 2px solid darkblue;
  padding: 16px;
`;

const Row = styled.div`
  display: flex;
  margin-left: ${(props) => props.offset}%;
`;

const Cell = styled.div`
  height: 20px;
  width: 20px;
  transform: skew(21deg);
  border: 1px solid limegreen;
`;

export default IsometricMap;
