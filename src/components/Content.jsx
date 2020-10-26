import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { isFirefox } from 'react-device-detect';

import breakPoints from '../config/breakPoints';

const StyledContent = styled(motion.div)`
    min-height: ${({minHeight}) => minHeight ? `${minHeight}` : '200px'};
    margin: 0 auto;
    width: ${({width}) => width ? `${width}` : '400px'};
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    background-color: ${({bgColor}) => bgColor ? `${bgColor}` : 'transparent'};
    order: ${({order}) => order ? order : 1};

    @media only screen and (max-width: ${breakPoints.sm}px) {
        min-height: 300px;
        width: 100%;
        padding: 10px;
        order: ${({order, reverse}) => reverse ? order===1 ? 2 : 1 : order};
    }
`;

const Content = ({minHeight, width, variants, bgColor, order, reverse, ...props}) => {
    const animation = useAnimation();
    const [ref, inView] = useInView({threshold: 0.1});

    useEffect(() => {
        if (inView) {
            animation.start('animate');
        } else {
            animation.start('initial');
        }
    },[animation, inView]);

    return (
        <StyledContent minHeight={minHeight} width={width} variants={isFirefox ? {} : variants} initial='initial' animate={animation} transition={variants['transition']} ref={ref} bgColor={bgColor} order={order} reverse={reverse}>
            {props.children}
        </StyledContent>
    );
}

export default Content;
