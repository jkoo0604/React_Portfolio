import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';

import projectData from '../config/projectData';
import breakPoints from '../config/breakPoints';
import leftCaret from '../assets/slide_caret_lg_L@3x.png';
import rightCaret from '../assets/slide_caret_lg_R@3x.png';

const Backdrop = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 31;
    display: flex;

    @media only screen and (max-width: ${breakPoints.sm}px) {
        background: rgba(0,0,0,0.9);
    }
`;

const StyledDiv = styled(motion.div)`
    margin: 0 auto;
    position: relative;
    top: 10vh;
    z-index: 6;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 74vh;
    max-width: 80vw;
    flex-direction: column;
    padding: 10px;


    .imageModal {
        max-height: 100%;
        max-width: 100%;     
    }

    .image-gallery-slide .image-gallery-image {
        max-height: 70vh;
    }

    .image-gallery-custom-left-nav, .image-gallery-custom-right-nav {
        padding: 0px 10px;
        top: 50%;
        transform: translateY(-50%);
        height: 40px;
    }

    .image-gallery-custom-left-nav {
        left: 0px;
    }

    .image-gallery-custom-right-nav {
        right: 0px;
    }

    .image-gallery-icon {
        opacity: 0.7;
        filter: none;
    }

    .image-gallery-icon:hover {
        opacity: 1;
    }

    @media only screen and (max-width: ${breakPoints.sm}px) {
        max-width: 100vw;
        max-height: 95vh;
        width: auto;
        padding: 20px;
    }
`;

const backdropVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};

const modalVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 1
        }
    }
}

const SliderModal = ({showModal, setShowModal, projectId, ...props}) => {
    const handleClose = () => {
        setShowModal(false);
    };

    const renderLeftNav = (onClick, disabled) => {
        return (
            <img src={leftCaret} className='image-gallery-custom-left-nav image-gallery-icon' disabled={disabled} onClick={onClick} alt='Previous Slide' />
        );
    }

    const renderRightNav = (onClick, disabled) => {
        return (
            <img src={rightCaret} className='image-gallery-custom-right-nav image-gallery-icon' disabled={disabled} onClick={onClick} alt='Next Slide' />
        );
    }

    return(
        <AnimatePresence exitBeforeEnter>
            {
                showModal && projectId && (
                    <Backdrop variants={backdropVariants} initial='initial' animate='animate' exit='initial' onClick={handleClose}>
                        <StyledDiv >
                            <motion.div className='imageModal' variants={modalVariants} onClick={e => e.stopPropagation()}>
                                <ImageGallery items={projectData[projectId-1]['images']} showFullscreenButton={false} showPlayButton={false} slideDuration={500} showThumbnails={false} showBullets={false} renderLeftNav={renderLeftNav} renderRightNav={renderRightNav} />
                            </motion.div>
                        </StyledDiv>
                    </Backdrop>

                )
            }
        </AnimatePresence>
    )
}

export default SliderModal;