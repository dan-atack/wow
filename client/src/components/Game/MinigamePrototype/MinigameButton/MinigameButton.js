import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setKarma, setShowmanship, setMinigameRound } from '../../../../actions';
import { useSelector } from 'react-redux';

// buttons in the minigame will be fed a data object containing info such as text for the button, and the buttons' karma value.
function MinigameButton({ buttonData }) {
  const currentRound = useSelector((state) => state.game.minigameRound);
  const { id, axes, value, text } = buttonData;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (axes.includes('karmic')) {
      dispatch(setKarma(value));
    }
    if (axes.includes('showmanship')) {
      dispatch(setShowmanship(value));
    }
    // When this function runs it increments the minigame round, and sets the 'update minigame' flag to true:
    dispatch(setMinigameRound(currentRound + 1, true));
  };
  return (
    <Clicker onMouseUp={() => handleClick()}>
      {text}
    </Clicker>
  );
}

const Clicker = styled.button`
  height: 100%;
  width: 100%;
  background-color: black;
  color: whitesmoke;
  font-size: 1em;
  border: 3px solid rgb(197, 185, 151);
  border-radius: 18px;
`;

export default MinigameButton;
