import React from 'react';
import styled from 'styled-components';

import {useRecoilState, useRecoilValue} from 'recoil';
import combatState from '../../../../state'


const Portrait = ({playerPortrait, selectedSkill, base}) => {
    // for this component to work, the naming convention of the baddie json must be, non capitalized.
    
    const combatPhase = useRecoilValue(combatState.combatPhase);
    const [baddieDecision, setBaddieDecision] = useRecoilState(combatState.baddieDecision);
    const status = useRecoilValue(playerPortrait ? combatState.playerStatus : combatState.baddieStatus); // when baddie is complete this will include baddie as well

    let baddiePortraitHandler = () => {
        if (baddieDecision.name !== "") {
            return require(`../../../../assets/character frames/images/${base}_${baddieDecision.portrait.permutation}.png`);
        } else {
            require(`../../../../assets/character frames/images/${base}_neutral.png`);
        }
    }

    let backgroundColorHandler = () => {
        if(playerPortrait) {
            if(selectedSkill) {
               return selectedSkill.portrait.color;
            } else {
                return
            }
        } else if (!playerPortrait && baddieDecision.name !== '') {
            return baddieDecision.portrait.color;
        } else {
            return
        }
    }

    let playerPortraitHandler = () => {
        if(selectedSkill) {
            return require(`../../../../assets/character frames/images/${selectedSkill.portrait.name}.png`)
        } else {
            return require('../../../../assets/character frames/images/shark_neutral.png');
        }
    }

    return (
        <Wrapper backgroundColor={backgroundColorHandler() || 'orange'}>
            <IconWrapper>
                {
                    status.positional?.name && 
                        <StatusIcon isPlayer={playerPortrait} type={'positional'}>
                            <div>{status.positional.name}</div>
                            <div>{status.positional.duration}</div>
                        </StatusIcon>
                }
                {
                    status.elemental?.name &&
                        <StatusIcon isPlayer={playerPortrait} type={'elemental'}>
                            <div>{status.elemental.name}</div>
                            <div>{status.elemental.duration}</div>
                        </StatusIcon>
                }
                {
                    status.physical?.length > 0 &&
                        status.physical.map(effect => {
                            return (
                                <StatusIcon isPlayer={playerPortrait} type={'physical'}>
                                    <div>{effect.name}</div>
                                    <div>{effect.duration}</div>
                                </StatusIcon>
                            )
                        })
                }
            </IconWrapper>
            <Image 
                playerPortrait={playerPortrait}
                src={ playerPortrait ? 
                    playerPortraitHandler() : 
                    baddiePortraitHandler()} alt='character portrait'
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

const IconWrapper = styled.div`
    display: flex;
    width: 200px;
`

const StatusIcon = styled.div`
    width: 50px;
    height: 50px;
    border: 1px solid black;
    background: ${props => props.type === 'elemental' ? 'red' : props.type === 'physical' ? 'chartreuse' : 'salmon'};
    position: relative;
    top:${props => props.isPlayer ? '270px' : '-70px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`

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