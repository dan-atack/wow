import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mainPage from '../../assets/mainPage.jpg';

function MainMenu() {
  return (
    <Wrapper>
      <Header>World Of Wrestling!!!</Header>
      <Link to='/select-character'>
        <Start>Start New Game</Start>
      </Link>
    </Wrapper>
  );
}

const Header = styled.h1`
  margin-bottom: 48px;
  font-size: 72px;
`

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  border: none;
  border-radius: 0px;
  background-image: url(${mainPage});
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
  border-radius: 12px;
  font-size: 24px;
  text-decoration: none;
`;

export default MainMenu;
