import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

import { useWindowDimensions } from '../components/layout/DimensionProvider';
import breakPoints from '../config/breakPoints';
import colors from '../config/colors';

const StyledContainer = styled(motion.div)`
    min-height: ${({headerHeight}) => `calc(100vh - ${headerHeight}px)`};
    height: ${({restrictHeight, headerHeight}) => restrictHeight ? `calc(100vh - ${headerHeight}px)` : 'auto'};
    width: 100vw;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'slategrey'};
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media only screen and (max-width: ${breakPoints.sm}px) {
        min-height: ${({mobileRestrictHeight, headerHeight}) => mobileRestrictHeight ? `calc(100vh - ${headerHeight}px)` : 'auto'};
    }

    @media only screen and (max-height: ${breakPoints.height}px) {
        height: auto;
    }
`;

const BgContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 1;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ParallaxDiv = styled.div`
    width: 100%;
    font-family: 'Fira Sans', sans-serif;
    font-weight: 200;
    color: ${colors.fill60};
    text-align: right;
    overflow: hidden;

    p {
        &:nth-child(1) {
            font-size: min(max(10vw, 80px), 128px);
            padding-right: 100px;
        }
        &:nth-child(2) {
            font-size: min(max(5vw, 40px), 64px);
            padding-right: 230px;
        }
        &:nth-child(3) {
            font-size: min(max(7.5vw, 72px), 96px);
            padding-right: 60px;
        }
        &:nth-child(4) {
            font-size: min(max(4vw, 36px), 70px);
            padding-right: 120px;
        }
        &:nth-child(5) {
            font-size: min(max(10vw, 80px), 70px);
            padding-right: 150px;
        }
        &:nth-child(6) {
            font-size: min(max(5vw, 40px), 74px);
            padding-right: 200px;
        }
        &:nth-child(7) {
            font-size: min(max(7.5vw, 72px), 64px);
            padding-right: 30px;
        }
        &:nth-child(8) {
            font-size: min(max(3vw, 36px), 60px);
            padding-right: 350px;
        }
    }

    @media only screen and (max-width: ${breakPoints.sm}px) {
        opacity: 0.7;

        p {
            &:nth-child(1) {
                padding-right: 0px;
                text-align: left;
            }
            &:nth-child(2) {
                padding-right: 0px;
                text-align: right;
            }
            &:nth-child(3) {
                padding-right: 0px;
                text-align: center;
            }
            &:nth-child(4) {
                padding-right: 0px;
                text-align: left;
            }
        }
    }
`;

const Container = ({containerId, bgColor, headerHeight, colorStart, colorEnd, restrictHeight, mobileRestrictHeight, ...props}) => {
    const [elementTop, setElementTop] = useState(0);
    const ref = useRef(null);
    const { scrollY } = useViewportScroll();
    const { height } = useWindowDimensions();

    useLayoutEffect(() => {
        const element = ref.current;
        setElementTop(element.offsetTop);
    }, [ref]);

    const bgOffsetStart = height < breakPoints.height ? 100 : 400;
    const bgOffsetEnd = height < breakPoints.height ? 70 : 100;
    const backgroundColor = useTransform(scrollY, [elementTop-bgOffsetStart, elementTop-bgOffsetEnd], [colorStart, colorEnd]);
    const y = useTransform(scrollY, [elementTop, elementTop+1],[0, -1], {clamp: false});

    return (
        <StyledContainer ref={ref} id={containerId} bgColor={bgColor} headerHeight={headerHeight} style={{backgroundColor}} restrictHeight={restrictHeight} mobileRestrictHeight={mobileRestrictHeight} >
            { 
                <BgContainer style={{y}}>
                    <ParallaxDiv>
                        <p>ReactJS</p>
                        <p>React Native</p>
                        <p>Python</p>
                        <p>Java</p>
                        <p>SQL/NoSQL</p>
                        <p>Cloud</p>
                        <p>REST API</p>
                        <p>HTML5/CSS</p>
                    </ParallaxDiv>
                </BgContainer>
            }
            {props.children}
        </StyledContainer>
    );
}

export default Container;
