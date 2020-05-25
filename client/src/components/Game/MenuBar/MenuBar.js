import React from 'react';
import styled from 'styled-components';

function MenuBar() {
  return (
    <MainMenu>
      <h2>Main Menu</h2>
    </MainMenu>
  );
}

const MainMenu = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
  margin: 16px;
  display: flex;
  flex-direction: row;
  grid-area: mainmenu;
`;

export default MenuBar;
