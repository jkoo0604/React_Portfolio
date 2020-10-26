import React, { useState } from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const StyledInput = styled.div`
    display: flex;
    flex-direction: column;
    min-width: ${({minWidth, textArea}) => textArea ? '80%' : minWidth ? minWidth : '100px'};
    position: relative;
    margin-bottom: 8px;

    input {
        width: 100%;
        height: ${({height}) => height ? height : '56px'};
        padding: 14px 16px 0 10px;
        outline: 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: #fff;
    }

    textarea {
        width: 100%;
        padding: 20px 16px 0 14px;
        outline: 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: #fff;
        resize: none;
    }

    input, textarea {
        border: ${({error}) => error ? `1px crimson solid` : '0'};
        font-family: 'Fira Sans', sans-serif;
        font-size: 16px;
        box-shadow: none;
    }

    label {
        font-size: 16px;
        font-family: 'Fira Sans', sans-serif;
        padding: 8px 16px;
        color: #999;
        pointer-events: none;
        position: absolute;
        display: flex;
        height: 100%;
        align-items: ${({textArea}) => textArea ? 'flex-start' : 'center'};
        transform-origin: top left;
        transition: all 0.2s ease-out;
    }

    &:focus-within label, .active {
        transform: scale(0.72);
        align-items: flex-start;
    }

    @media only screen and (max-width: 768px) {
        min-width: 100%;
    }
`;

const Input = ({id, type, value, setValue, label, minWidth, height, textArea, error}) => {
    const [isActive, setIsActive] = useState(false);

    const handleChange = (e) => {
        if (e.target.value !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        };

        setValue(e.target.value);
    }

    return (
        <StyledInput id={id} minWidth={minWidth} height={height} textArea={textArea} error={error} >
            {
                !textArea ? 
                <input required type={type ? type : 'text'} onChange={handleChange} value={value} /> :
                <textarea required maxLength={500} value={value} onChange={handleChange} rows={5} />
            }
            <label className={isActive ? 'active' : ''}>{label}</label>
        </StyledInput>
    )
}

export default Input;