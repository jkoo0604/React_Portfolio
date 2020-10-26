import React, { useState, useEffect, createContext, useContext } from 'react';

const WindowDimensionContext = createContext(null);

const DimensionProvider = ({children}) => {
    const [dimensions, setDimensions] = useState({width: window.innerWidth, height: window.innerHeight, scrollY: 0});

    useEffect(() => {
        const handleResize = () => {
            setDimensions({...dimensions, width: window.innerWidth, height: window.innerHeight});
        };

        const handleScroll = () => {
            setDimensions({...dimensions, scrollY: window.scrollY});
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <WindowDimensionContext.Provider value={dimensions}>
            {children}
        </WindowDimensionContext.Provider>
    );
}

export default DimensionProvider;
export const useWindowDimensions = () => useContext(WindowDimensionContext);
