import React from 'react';
import styled from 'styled-components';

import {useSelector} from 'react-redux';
import {useRecoilState} from 'recoil';
import combatState from '../../../../state'


const Portrait = ({playerPortrait, value, base}) => {
    // for this component to work, the naming convention of the baddie json must be, non capitalized.
    
    const combatPhase = useSelector((state) => state.game.combatPhase);
    const [baddieDecision, setBaddieDecision] = useRecoilState(combatState.baddieDecision);


    return (
        <Wrapper>
            <Image 
                playerPortrait={playerPortrait}
                src={ playerPortrait ? 
                    require(`../../../../assets/character frames/images/sharkNeutral.png`) : 
                    require(`../../../../assets/character frames/images/${base}.png`)} alt='character portrait'
                />
            {
                !playerPortrait && combatPhase === 'playerMove' && 
                    <ChatBubble>
                        {baddieDecision.hint}
                    </ChatBubble>
            }
        </Wrapper>
    )
}

export default Portrait

const ChatBubble = styled.div`
    position: relative;
    left: -250px;
    top: 100px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
    border: 2px solid black;
`

const Image = styled.img`
    width: 200px;
    transform: ${props => props.playerPortrait && 'scaleX(-1)'};
    position: absolute;
    bottom: 0px;
    right: 0px;
`

const Wrapper = styled.div` 
    width: 200px;
    height: 256px;
    border: 2px solid black;
    background: ${props => props.backgroundColor || 'orange'};
    position: relative;
`