import React from 'react';
import styled from 'styled-components';

import video from '../assets/videos/bgVideo.mp4';

const StyledContainer = styled.div`
    min-height: ${({headerHeight}) => `calc(100vh - ${headerHeight}px)`};
    height: ${({restrictHeight, headerHeight}) => restrictHeight ? `calc(100vh - ${headerHeight}px)` : 'auto'};
    width: 100vw;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'slategrey'};
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: -55px;
`;

const BgContainer = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
`;

const VideoBg = styled.video`
    width: 100vw;
    height: 100vh;
    o-object-fit: cover;
    object-fit: cover;
`;

const Container = ({containerId, bgColor, headerHeight, restrictHeight, ...props}) => {

    return (
        <StyledContainer id={containerId} bgColor={bgColor} headerHeight={headerHeight} restrictHeight={restrictHeight} >
            <BgContainer>
                <VideoBg autoPlay loop muted playsInline src={video} type='video/mp4' />
            </BgContainer>
            {props.children}
        </StyledContainer>
    );
}

export default Container;
