import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mainPage from '../../assets/mainPage.jpg';

function MainMenu() {
  return (
    <Wrapper>
      <h1>Welcome to World Of Wrestling!!!</h1>
      <Link to='/select-character'>
        <Start>Start New Game</Start>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 87vh;
  width: 80vw;
  margin: 4% 9%;
  border: 2px solid black;
  border-radius: 12px;
  background-image: url(${mainPage});
  color: white;
`;

const Start = styled.button`
  height: 25vh;
  width: 25vw;
  border: 3px solid whitesmoke;
  border-radius: 12px;
  font-size: 48px;
  text-decoration: none;
`;

export default MainMenu;
