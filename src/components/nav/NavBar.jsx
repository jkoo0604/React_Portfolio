import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animateScroll as scroll, scrollSpy} from 'react-scroll';

import { useWindowDimensions } from '../layout/DimensionProvider';
import logo from '../../assets/icon_home@3x.png';
import colors from '../../config/colors';
import Burger from './Burger';

const Nav = styled.nav`
    width: 100%;
    height: 55px;
    position: sticky;
    top: 0px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    background-color: ${({transparent}) => transparent ? 'transparent' : colors.text20};
    opacity: ${({transparent}) => transparent ? '1' : '0.9'};
    z-index: 30;

    .logo {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .logo img {
        width: 40px;
        height: 40px;
    }
`;

const NavBar = () => {
    const { scrollY } = useWindowDimensions();
    const [transparent, setTransparent] = useState(true);

    useEffect(() => {
        navBg();
    },[scrollY]);

    const navBg = () => {
        if (scrollY > 55) {
            setTransparent(false);
        } else {
            setTransparent(true);
        }
    }

    const scrollToTop = () => {
        scroll.scrollToTop();
        scrollSpy.update();
    };
    
    return (
        <Nav transparent={transparent}>
            <div className='logo' onClick={scrollToTop}>
                <img src={logo} alt='logo'/>
            </div>
            <Burger />
        </Nav>
    );
}

export default NavBar;