import React, { useState } from 'react';
import styled from 'styled-components';
import CharacterDetails from './CharacterDetails';
import { useDispatch } from 'react-redux';
import { selectCharacterType } from '../../actions';

function SelectCharacter() {
  const dispatch = useDispatch();
  const [localCharacterType, setLocalCharacterType] = useState(null)

  let [isSelected, setSelected] = useState(false);

  const renderDescription = () => {
    switch (localCharacterType) {
      case 'superstar':
        return 'Live and die by the seat of the audience. Pull off huge stunts, get the crowd hyped and cash it out for huge damage.'
      case 'highFlier':
        return 'A high flier is a master of his environment, looking for the next obstacle to jump off of, or a little trip to set up a huge acrobatic move.'
      case 'tank':
        return 'Like smash? Do smash!! You are goliath, they are David. Don\'t find their weakness, you are their weakness. Less mobile than other wrestlers, but they can\'t run forever.'
      default:
        return
    }
  }

  const handleSelect = (type) => {
    setLocalCharacterType(type);
  };

  const handleConfirm = () => {
    dispatch(selectCharacterType(localCharacterType))
    setSelected(true);
  }

  return (
    <Wrapper>
        <Header>Select Your Character Expertise!</Header>
        {
          !isSelected &&
            <ButtonWrapper>
              <Option onClick={() => handleSelect('highFlier')} >
                <h2>High-Flier</h2>
              </Option>
              <Option onClick={() => handleSelect('tank')} >
                <h2>Tank</h2>
              </Option>
              <Option onClick={() => handleSelect('superstar')} >
                <h2>Superstar</h2>
              </Option>
            </ButtonWrapper>
        }
        {
          !isSelected &&       
          <FooterWrapper>
            <Description>
              {renderDescription()}
            </Description>
            <ConfirmButton onClick={handleConfirm}>
              CONFIRM
            </ConfirmButton>
          </FooterWrapper>    
        }
        {isSelected && <CharacterDetails />}
    </Wrapper>
  );
}

const ConfirmButton = styled.button`
  width: 25%;
  margin-left: 24px;
  height: 100%;
  background-color: white;
  border: none;
  box-shadow:   -5px 0 0 0 black,
                 5px 0 0 0 black,
                 0 -5px 0 0 black,
                 0 5px 0 0 black;
`

const FooterWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-top: 24px;
`

const Description = styled.div`
  text-align: left;
  padding: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  box-shadow:   -5px 0 0 0 black,
                 5px 0 0 0 black,
                 0 -5px 0 0 black,
                 0 5px 0 0 black;
`

const Header = styled.h1`
  height: 100px;
  min-height: 100px;
  width: 100%;
  margin-bottom: 24px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:   -5px 0 0 0 black,
                 5px 0 0 0 black,
                 0 -5px 0 0 black,
                 0 5px 0 0 black;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
  font-family: sans-serif;
`

const ButtonWrapper = styled.div`
  width: 100%;
  color: black;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-items: center;
  > h2 {
    z-index: 10;
  }
`;

const Option = styled.button`
  width: 100%;
  height: 65vh;
  color: black;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow:   -5px 0 0 0 black,
                 5px 0 0 0 black,
                 0 -5px 0 0 black,
                 0 5px 0 0 black;
  &:hover {
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  opacity: .3;
  width: 50vw;
  object-fit: cover;
  top: 0px;
  left: 0px;
  z-index: 0;
  &:hover {
    opacity: .8;
  }
`

export default SelectCharacter;
