import React from 'react';
import styled from 'styled-components';
import CharacterDetails from './CharacterDetails';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectCharacterType } from '../../actions';

function SelectCharacter() {
  const dispatch = useDispatch();
  let [selected, setSelected] = React.useState(false);
  const handleSelect = (type) => {
    setSelected(true);
    dispatch(selectCharacterType(type));
  };
  return (
    <Wrapper>
      <h1>Choose Your Character Type!</h1>
      <Option onMouseUp={() => handleSelect('highFlier')}>
        <h2>High-Flier</h2>
      </Option>
      <Option onMouseUp={() => handleSelect('tank')}>
        <h2>Tank</h2>
      </Option>
      <Option onMouseUp={() => handleSelect('superStar')}>
        <h2>SuperStar</h2>
      </Option>
      {selected ? <CharacterDetails /> : <> </>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 87vh;
  width: 80vw;
  margin: 4% 9%;
  border: 2px solid black;
  border-radius: 12px;
  color: white;
  background-color: black;
`;

const Option = styled.button`
  width: 20vw;
  border: 3px solid gray;
  border-radius: 12px;
  background-color: black;
  color: white;
  margin: 8px;
  &:hover {
    cursor: pointer;
  }
`;

export default SelectCharacter;
