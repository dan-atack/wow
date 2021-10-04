import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import livingRoom from '../../assets/backgrounds/livingRoom.png';

function MainMenu() {
  return (
    <Wrapper>
      <Header>World Of Wrestling!!!</Header>
      <Link to='/game'>
        <Start>Start New Game</Start>
      </Link>
      <BackgroundImage src={livingRoom} alt='picture of a living room'/>
    </Wrapper>
  );
}

const BackgroundImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  /* top: 0px; */
  /* left: 0px; */
  z-index: -1;
`

const Header = styled.h1`
  margin-bottom: 48px;
  font-size: 72px;
  color: black;
`

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  border: none;
  border-radius: 0px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Start = styled.button`
  height: 50px;
  width: 300px;
  border: 3px solid black;
  font-size: 24px;
  text-decoration: none;
  background: rgb(255,255,255,0.5);
  transition: all .2s ease-in;
  :hover {
    background: rgb(255,255,255,1);
  }
`;

export default MainMenu;
