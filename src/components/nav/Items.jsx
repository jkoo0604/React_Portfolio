import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';

import colors from '../../config/colors';

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrwap;

    li {
        padding: 18px 10px;
        color: ${colors.text10};
    }

    .invisible {
        padding: 0px;
    }

    @media only screen and (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: ${colors.text20};
        opacity: 1;
        position: fixed;
        transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 0px;
        right: 0px;
        height: 45vh;
        width: 100%;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s ease-in-out;
        z-index: 19;
    }
`;

const StyledSpan = styled.span`
    color: ${colors.text10};
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'Fira Sans', sans-serif;
    font-size: 20px;
    font-weight: regular;
    font-weight: ${({active}) => active ? 'bold' : 'regular'};
`;

const Items = ({open, setOpen}) => {
    const [landingActive, setLandingActive] = useState(false);
    const [aboutActive, setAboutActive] = useState(false);
    const [projectsActive, setProjectsActive] = useState(false);
    const [contactActive, setContactActive] = useState(false);

    const handleActive = to => {
        if (to === 'About') {
            setLandingActive(false);
            setAboutActive(true);
            setProjectsActive(false);
            setContactActive(false);
        } else if (to.indexOf('Project-') > -1) {
            setLandingActive(false);
            setAboutActive(false);
            setProjectsActive(true);
            setContactActive(false);
        } else if (to === 'Contact') {
            setLandingActive(false);
            setAboutActive(false);
            setProjectsActive(false);
            setContactActive(true);
        } else {
            setLandingActive(true);
            setAboutActive(false);
            setProjectsActive(false);
            setContactActive(false);
        }
        setOpen(false);
    };

    return (
        <Ul open={open}>
            <li>
                <Link activeClass={'active'} to={'About'} spy={true} smooth={true} offset={-55} duration={1000} onSetActive={handleActive}>
                    <StyledSpan active={aboutActive} onClick={() => setOpen(false)}>About</StyledSpan>
                </Link>
            </li>
            <li>
                <Link activeClass={'active'} to={'Project-1'} spy={true} smooth={true} offset={-55} duration={1000} onSetActive={handleActive}>
                    <StyledSpan active={projectsActive} onClick={() => setOpen(false)}>Projects</StyledSpan>
                </Link>
            </li>
            <li>
                <Link activeClass={'active'} to={'Contact'} spy={true} smooth={true} offset={-55} duration={1000} onSetActive={handleActive}>
                    <StyledSpan active={contactActive} onClick={() => setOpen(false)}>Contact</StyledSpan>
                </Link>
            </li>
            <li className='invisible'>
                <Link activeClass={'active'} to={'Landing'} spy={true} smooth={true} offset={-55} duration={750} onSetActive={handleActive}>
                    <StyledSpan active={landingActive} onClick={() => setOpen(false)}></StyledSpan>
                </Link>
            </li>
            <li className='invisible'>
                <Link activeClass={'active'} to={'Project-2'} spy={true} smooth={true} offset={-55} duration={750} onSetActive={handleActive}>
                    <StyledSpan active={projectsActive} onClick={() => setOpen(false)}></StyledSpan>
                </Link>
            </li>
            <li className='invisible'>
                <Link activeClass={'active'} to={'Project-3'} spy={true} smooth={true} offset={-55} duration={750} onSetActive={handleActive}>
                    <StyledSpan active={projectsActive} onClick={() => setOpen(false)}></StyledSpan>
                </Link>
            </li>
        </Ul>
    );
}

export default Items;