import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setKarma, setShowmanship } from '../../../../actions';

// buttons in the minigame will be fed a data object containing info such as text for the button, and the buttons' karma value.
function MinigameButton({ buttonData }) {
  const { id, axis, value, text } = buttonData;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (axis === 'karmic') {
      dispatch(setKarma(value));
    } else if (axis === 'showmanship') {
      dispatch(setShowmanship(value));
    }
  };
  return (
    <Clicker onMouseUp={() => handleClick()}>
      {id}
      {text}
    </Clicker>
  );
}

const Clicker = styled.button`
  height: 128px;
  width: 192px;
  background-color: black;
  color: whitesmoke;
  font-size: 1em;
  border: 3px solid whitesmoke;
  border-radius: 18px;
`;

export default MinigameButton;
