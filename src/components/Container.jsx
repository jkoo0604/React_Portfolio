import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

import { useWindowDimensions } from '../components/layout/DimensionProvider';
import breakPoints from '../config/breakPoints';

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
        height: auto;
    }

    @media only screen and (max-height: ${breakPoints.height}px) {
        height: auto;
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

    return (
        <StyledContainer ref={ref} id={containerId} bgColor={bgColor} headerHeight={headerHeight} style={{backgroundColor}} restrictHeight={restrictHeight} mobileRestrictHeight={mobileRestrictHeight} >
            {props.children}
        </StyledContainer>
    );
}

export default Container;
