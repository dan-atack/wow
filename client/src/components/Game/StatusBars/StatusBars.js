import React from 'react';
import styled from 'styled-components';

function StatusBars() {
  // inFight status would come from Redux state to determine hype bar's visibility...
  // const inFight = useSelector(state => state.fightStatus.inFight);
  const inFight = false;
  return (
    <Wrapper>
      <h3> Status Bars:</h3>
      <Bar type={'health'} fullness={60}>
        Health
      </Bar>
      <Bar type={'experience'} fullness={20}>
        Experience?
      </Bar>
      <Bar type={'hype'} fullness={50}>
        Hype (for in-fight display only)
      </Bar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-area: bars;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
  margin: 16px;
  text-align: left;
`;

const Bar = styled.div`
  width: ${(props) => `${props.fullness}%`};
  /* border: 2px solid
    ${(props) =>
      props.type === 'health'
        ? 'red'
        : props.type === 'experience'
        ? 'limegreen'
        : 'cyan'}; */
  background-color: ${(props) =>
    props.type === 'health'
      ? 'red'
      : props.type === 'experience'
      ? 'limegreen'
      : 'cyan'};
`;

export default StatusBars;
