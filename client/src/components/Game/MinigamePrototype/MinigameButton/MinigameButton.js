import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setKarma } from '../../../../actions';

// buttons in the minigame will be fed a data object containing info such as text for the button, and the buttons' karma value.
function MinigameButton({ buttonData }) {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = React.useState('initial');
  const handleClick = () => {
    dispatch(setKarma(buttonData.karmicValue));
    setVisibility('none');
  };
  return (
    <Clicker
      alignment={buttonData.alignment}
      onMouseUp={() => handleClick()}
      visibility={visibility}
    >
      {buttonData.text}
    </Clicker>
  );
}

const Clicker = styled.button`
  height: 96px;
  width: 128px;
  background-color: ${(props) =>
    props.alignment === 'good' ? 'limegreen' : 'red'};
  border: 3px solid whitesmoke;
  border-radius: 18px;
  display: ${(props) => props.visibility};
`;

export default MinigameButton;
