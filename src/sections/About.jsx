import React from 'react';
import styled from 'styled-components';

import ParallaxContainer from '../components/ParallaxContainer';
import Content from '../components/Content';
import breakPoints from '../config/breakPoints';
import bgColors from '../config/bgColors';
import colors from '../config/colors';

const containerVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
    },
    transition: {
        duration: 1.5,
        type: 'tween'
    }
}

const StyledDiv = styled.div`
    color: ${colors.text10};
    padding-left: 110px;
    font-family: 'Anton', sans-serif;
    width: 50%;
    background: transparent;

    .title {
        font-size: 48px;
        margin-bottom: 20px;
    }

    .subtitle {
        font-size: 24px;
        margin-bottom: 15px;
        text-transform: uppercase;
    }

    .body {
        font-family: 'Fira Sans', sans-serif;
        font-size: 20px;
    }

    @media only screen and (max-width: ${breakPoints.sm}px) {
        width: 100%;
        padding: 0px 50px;

        .title {
            margin-bottom: 0px;
        }

        .subtitle {
            margin-bottom: 20px;
        }
    }

    @media only screen and (max-width: ${breakPoints.xs}px) {
        width: 100%;
        padding: 0px 20px;

        .title {
            margin-bottom: 0px;
            font-size: 24px;
        }

        .subtitle {
            margin-bottom: 20px;
            font-size: 20px;
        }

        .body {
            font-size: 16px;
        }
    }

    @media only screen and (max-height: ${breakPoints.height}px) {
        margin: 30px 0px;
    }
`;

const StyledPrint = styled.div`
    font-family: 'Fira Sans', sans-serif;
    font-size: 14px;
    color: ${colors.text10};
    position: absolute;
    bottom: 0px;
    left: 0px;
    text-align: center;
    padding: 5px 20px;
    width: 100%;
    opacity: 0.2;

    @media only screen and (max-width: ${breakPoints.sm}px) {
        display: none;
    }
`;

const About = () => {
    return (
        <ParallaxContainer containerId={'About'} headerHeight={55} bgColor={'skyblue'} colorStart={bgColors[0]} colorEnd={bgColors[1]} restrictHeight={true} mobileRestrictHeight={true}>
            <Content minHeight={'100%'} width={'100%'} variants={containerVariants}>
                <StyledDiv>
                    <p className='title'>about me</p>
                    <p className='subtitle'>full stack developer</p>
                    <p className='body'>After working in business operations and data analytics for 8+ years, I have made a career pivot to pursue my passion in software development. I am eager to apply the creative problem solving skills and work ethics that helped me succeed in my previous career to a new one in tech.</p>
                </StyledDiv>
            <StyledPrint>This site uses ReactJS, Framer Motion, Google Cloud, Recaptcha, and more.</StyledPrint>
            </Content>
        </ParallaxContainer>
    );
}

export default About;
