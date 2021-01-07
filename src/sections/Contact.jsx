import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import firebase from 'firebase/app';
import 'firebase/functions';

import Container from '../components/Container';
import Content from '../components/Content';
import Input from '../components/Input';
import bgColors from '../config/bgColors';
import colors from '../config/colors';
import {contactUrl} from '../config/contactUrl';
import {recaptchaKey} from '../config/recaptchaConfig';
import linkedin from '../assets/icon_linkedin@3x.png';
import github from '../assets/icon_github@3x.png';
import mail from '../assets/icon_mail@3x.png';

const containerVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    transition: {
        duration: 1.5,
        type: 'tween'
    }
}

const Wrapper = styled.div`
    width: 55%;
    padding-left: 110px;

    .contact {
        text-align: left;
        padding-bottom: 25px;
    }

    .contact p {
        color: ${colors.text10};
        font-weight: bold;
        font-family: 'Anton', sans-serif;
        font-size: 48px;
    }

    .contact .icon {
        width: 32px;
    }

    .contact .icon:hover {
        transform: scale(1.1);
    }

    .iconLink + .iconLink {
        margin-left: 15px;
    }

    .submit {
        display: flex;
        flex-direction: column;
        margin-top: 8px;
    }

    @media only screen and (max-width: 768px) {
        width: 100%;
        padding: 20px;

        .contact {
            margin-top: 20px;
        }
    }
`;

const FormDiv = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    grid-template-areas:
        'error error'
        'first last'
        'email email'
        'message message';
    gap: 5px;

    #first {
        grid-area: first;
    }

    #last {
        grid-area: last;
    }

    #email {
        grid-area: email;
    }

    #message {
        grid-area: message;
    }

    #error {
        grid-area: error;
        color: red;
        font-size: 12px;
        margin-bottom: 5px;
        height: 20px;
    }

    @media only screen and (max-width: 768px) {
        grid-template-columns: auto;
        grid-template-areas:
            'error'
            'first'
            'last'
            'email'
            'message';
    }
`;

const StyledButton = styled.div`
    display: flex;
    align-self: flex-start;
    background: transparent;
    color: ${colors.text10};
    border: 2px solid ${colors.text10};
    border-radius: 5px;
    font-family: 'Fira Sans', sans-serif;
    font-weight: bold;
    font-size: 24px;
    padding: 10px 50px;
    text-transform: uppercase;
    cursor: ${({loading}) => loading === 'true' ? 'not-allowed' : 'pointer'};

    &:hover {
        transform: scale(1.05)
    }
`;

const StyledMsg = styled.div`
    display: flex;
    align-self: flex-start;
    align-items: center;
    background: transparent;
    color: ${colors.fill40};
    font-weight: bold;
    font-family: 'Fira Sans', sans-serif;
    font-size: 16px;
    height: 50px;
`;

const StyledPrint = styled.div`
    font-family: 'Fira Sans', sans-serif;
    font-size: 14px;
    color: ${colors.text10};
    position: absolute;
    bottom: 0px;
    left: 0px;
    text-align: center;
    padding: 25px 20px;
    width: 100%;
    opacity: 0.5;

    @media only screen and (max-width: 768px) {
        padding: 0px;
    }
`;

const Contact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [sent, setSent] = useState('');
    const [buttonText, setButtonText] = useState('send');
    const reRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {setSent('')}, 2000);
        return () => clearTimeout(timer);
    }, [sent]);

    const handleSubmit = async () => {
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setMessageError(false);
        
        if (!firstName.length || !lastName.length || !email.length || !message.length) {
            if (!firstName.length) setFirstNameError(true);
            if (!lastName.length) setLastNameError(true);
            if (!email.length) setEmailError(true);
            if (!message.length) setMessageError(true);
            return;
        } else {
            setButtonText('sending...');
            const reqBody = {firstName, lastName, email, message};
            const token = await reRef.current.executeAsync();
            reRef.current.reset();

            const sendMessage = firebase.functions().httpsCallable('verifyRecaptcha');
            sendMessage({reqBody, token})
                .then(res => {
                    setSent('Your message has been sent.');
                })
                .catch(error => {
                    console.log('error code: ', error.code);
                    console.log('error message: ', error.message);
                    console.log('error details: ', error.details);  
                    setSent('An error occurred.');              
                })
                .finally(() => {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setMessage('');
                    setButtonText('send');
                })
        };
    }

    return (
        <Container containerId={'Contact'} headerHeight={55} bgColor={'lightsalmon'} colorStart={bgColors[4]} colorEnd={bgColors[5]} restrictHeight={true} mobileRestrictHeight={true}>
            <Content minHeight={'100%'} variants={containerVariants} width={'100%'}>
                <Wrapper>
                    <div className='contact'>
                        <p>contact / connect</p>
                        <div className='icons'>
                            <a href={contactUrl['linkedin']} target='_blank' rel='noopener noreferrer' className='iconLink'><img src={linkedin} className='icon' alt='linkedin' /></a>
                            <a href={contactUrl['github']} target='_blank' rel='noopener noreferrer' className='iconLink'><img src={github} className='icon' alt='github' /></a>
                            <a href={contactUrl['email']} className='iconLink'><img src={mail} className='icon' alt='email' /></a>
                        </div>
                    </div>
                    <div className='form'>
                        <FormDiv>
                            <Input id='first' value={firstName} setValue={setFirstName} label='First Name*' error={firstNameError} />
                            <Input id='last' value={lastName} setValue={setLastName} label='Last Name*' error={lastNameError} />
                            <Input id='email' value={email} setValue={setEmail} label='Email*' type='email' error={emailError} />
                            <Input id='message' value={message} setValue={setMessage} label='Message*' textArea={true} error={messageError} />
                        </FormDiv>
                        <div className='submit'>
                            <StyledButton onClick={handleSubmit} loading={buttonText !== 'send' ? 'true' : 'false'}>{buttonText}</StyledButton>
                            <StyledMsg className={sent !== '' ? 'visible' : ''}>{sent}</StyledMsg>
                            <ReCAPTCHA sitekey={recaptchaKey} size='invisible' ref={reRef}/>
                        </div>
                    </div>
                </Wrapper>
                <StyledPrint>Jayoung Koo ©2020</StyledPrint>
            </Content>
        </Container>
    );
}

export default Contact;
