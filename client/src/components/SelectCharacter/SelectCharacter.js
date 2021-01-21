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
  width: 100%;
  color: black;
  background-color: white;
`;

const Option = styled.button`
  width: 100px;
  color: black;
  &:hover {
    cursor: pointer;
  }
`;

export default SelectCharacter;
