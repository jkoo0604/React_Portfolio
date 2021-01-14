import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import MovieContainer from '../components/MovieContainer';
import bgColors from '../config/bgColors';
import colors from '../config/colors';
import breakPoints from '../config/breakPoints';

const nameVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 3,
            ease: 'easeInOut',
        },
    },
};

const StyledDiv = styled.div`
    justify-content: center;
    align-items: center;
    width: 450px;
    position: absolute;
    color: ${colors.text10};
    font-family: 'Anton', sans-serif;
    font-size: min(max(10vw, 60px), 96px);
    z-index: 3;
    padding-left: 110px;
    text-align: left;

    .name {
        width: auto;
        height: auto;
    }

    @media only screen and (max-width: ${breakPoints.sm}px) {
        padding-left: 55px;
        width: 100%;
    }

    @media only screen and (max-width: ${breakPoints.xs}px) {
        padding-left: 25px;
        font-size: 50px;
        width: 100%;
    }
`;

const Landing = () => {
    return (
        <MovieContainer
            containerId={'Landing'}
            headerHeight={55}
            bgColor={bgColors[1]}
        >
            <StyledDiv>
                <motion.div
                    className="name"
                    variants={nameVariants}
                    initial="initial"
                    animate="animate"
                >
                    <p>Jayoung</p>
                    <p>Koo</p>
                </motion.div>
            </StyledDiv>
        </MovieContainer>
    );
};

export default Landing;
