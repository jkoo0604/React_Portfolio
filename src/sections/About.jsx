import React from 'react';
import styled from 'styled-components';

import ParallaxContainer from '../components/ParallaxContainer';
import Content from '../components/Content';
import breakPoints from '../config/breakPoints';
import bgColors from '../config/bgColors';
import colors from '../config/colors';
import aws from '../assets/images/aws_dva.png';
import psm from '../assets/images/psmi.png';
import { contactUrl } from '../config/contactUrl';

const containerVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    transition: {
        duration: 1.5,
        type: 'tween',
    },
};

const StyledDiv = styled.div`
    color: ${colors.text10};
    padding-left: 110px;
    font-family: 'Anton', sans-serif;
    width: 60%;
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

const TextBlock = styled.div`
    font-family: 'Fira Sans', sans-serif;
    font-size: 20px;
    margin-bottom: 30px;

    @media only screen and (max-width: ${breakPoints.xs}px) {
        font-size: 16px;
    }
`;

const ImageDiv = styled.div`
    display: flex;

    img {
        max-height: 120px;
        transition: all 0.2s;
    }

    img:hover {
        transform: scale(1.07);
    }

    @media only screen and (max-width: ${breakPoints.xs}px) {
        justify-content: center;

        img {
            max-height: 90px;
        }
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
        <ParallaxContainer
            containerId={'About'}
            headerHeight={55}
            bgColor={'skyblue'}
            colorStart={bgColors[0]}
            colorEnd={bgColors[1]}
            restrictHeight={true}
            mobileRestrictHeight={true}
        >
            <Content
                minHeight={'100%'}
                width={'100%'}
                variants={containerVariants}
            >
                <StyledDiv>
                    <p className="title">about me</p>
                    <p className="subtitle">full stack developer + business analytics professional</p>
                    <TextBlock>
                        A full stack developer with knowledge of various technologies including JavaScript, Python, Java, and cloud. Uniquely positioned to combine software development with 8 years of business operations experience and expertise in data analytics and visualizations. A creative problem solver with proven track record and exceptional work ethics looking for a full-time opportunity.
                    </TextBlock>
                    <ImageDiv>
                        <a
                            href={contactUrl['aws']}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={aws} alt="AWS DVA" />
                        </a>
                        <a
                            href={contactUrl['psm']}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={psm} alt="PSM 1" />
                        </a>
                    </ImageDiv>
                </StyledDiv>
                <StyledPrint>
                    This site uses ReactJS, Framer Motion, Google Cloud Functions,
                    Recaptcha, and more.
                </StyledPrint>
            </Content>
        </ParallaxContainer>
    );
};

export default About;
