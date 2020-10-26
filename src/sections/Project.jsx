import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import styled from 'styled-components';

import { useWindowDimensions } from '../components/layout/DimensionProvider';
import Container from '../components/Container';
import Content from '../components/Content';
import SliderModal from '../components/ImageModal';
import leftCaret from '../assets/slide_caret_lg_L@3x.png';
import rightCaret from '../assets/slide_caret_lg_R@3x.png';
import breakPoints from '../config/breakPoints';
import bgColors from '../config/bgColors';
import colors from '../config/colors';
import projectData from '../config/projectData';

const containerVariants = {
    initial: {
        opacity: 0,
        x: 0,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    transition: {
        duration: 1,
        type: 'tween'
    }
};

const ProjectDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    justify-content: center;

    .projectEl {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 30px;
        padding-right: 30px;
        height: 100%;
        width: 100%;
        flex-direction: column;
    }

    .imageModal {
        max-height: 100%;
        max-width: 100%;      
    }

    .image-gallery-thumbnail {
        filter: grayscale(1);
        border: 2px solid transparent;
    }

    .image-gallery-thumbnail.active, .image-gallery-thumbnail:hover, .image-gallery-thumbnail:focus {
        border: 2px solid ${colors.accent10};
        filter: grayscale(0);
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
        opacity: 0.5;
        filter: none;
    }

    .image-gallery-icon:hover {
        opacity: 1;
    }

    .projectDesc {
        text-align: left;
        padding: 15px;
    }

    .projectTitle, .projectSubtitle {
        font-family: 'Anton', sans-serif;
    }

    .projectTitle {
        font-size: 48px;
    }

    .projectSubtitle {
        font-size: 20px;
        margin-bottom: 20px;
        text-transform: uppercase;
    }

    .projectBody {
        font-family: 'Fira Sans', sans-serif;
        font-size: 18px;
        margin-bottom: 20px;
    }

    .projectDesc ul {
        padding-left: 40px;
    }

    .projectLink {
        margin-top: 30px;
    }

    .projectLink a {
        color: ${colors.link10};
        font-family: 'Fira Sans', sans-serif;
        font-size: 20px;
        font-weight: bold;
        text-decoration: underline;
        text-underline-position: under;
        cursor: pointer;
    }

    .projectLink a:hover {
        color: ${colors.link20};
    }

    .projectSummary {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .projectTech {
        font-size: 16px;
        margin-bottom: 10px;
        text-align: left;
    }

    @media only screen and (max-width: ${breakPoints.sm}px) {
        flex-direction: column;
        padding: 0px;
        justify-content: space-between;

        .projectEl {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 0px;
            padding-right: 0px;
            height: auto;
            width: 100%;
            flex-direction: column;
        }

        .imageModal {
            padding: 20px;     
        }
    }

    @media only screen and (max-width: ${breakPoints.xs}px) {
        flex-direction: column;
        padding: 0px;
        justify-content: space-between;

        .projectEl {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 0px;
            padding-right: 0px;
            height: auto;
            width: 100%;
            flex-direction: column;
        }

        .imageModal {
            padding: 20px;     
        }

        .projectTitle {
            font-size: 24px;
        }
    
        .projectSubtitle {
            font-size: 18px;
        }
    
        .projectBody {
            font-size: 16px;
        }
    
        .projectDesc ul {
            font-size: 16px;
        }
    
        .projectLink a {
            font-size: 16px;
        }

    }
`;

const Project = ({projectId, containerId}) => {
    const [showModal, setShowModal] = useState(false);
    const { width } = useWindowDimensions();
    const reverse = projectId % 2 === 0;

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

    const openModal = () => {
        setShowModal(true);
    };

    return (
        <>
        <Container containerId={containerId} headerHeight={55} bgColor={'mediumpurple'} colorStart={bgColors[projectId]} colorEnd={bgColors[projectId+1]} restrictHeight={true}>
            <ProjectDiv>
                <Content minHeight={'100%'} width={'60%'} variants={containerVariants} order={reverse ? 2 : 1} reverse={reverse}>
                    <div className={`projectEl ${width < breakPoints.sm ? 'mobile' : ''}`}>
                        <div className='imageModal'>
                            <ImageGallery items={projectData[projectId-1]['images']} showFullscreenButton={false} showPlayButton={false} slideDuration={500} disableThumbnailScroll={false} onClick={openModal} renderLeftNav={renderLeftNav} renderRightNav={renderRightNav} />
                        </div>
                    </div>
                </Content>
                <Content minHeight={'100%'} width={'40%'} variants={containerVariants} bgColor='white' order={reverse ? 1 : 2} reverse={reverse}>
                    <div className={`projectEl ${width < breakPoints.sm ? 'mobile' : ''}`}>
                        <div className='projectDesc'>
                            <p className='projectTitle'>{projectData[projectId-1]['name']}</p>
                            <p className='projectSubtitle'>{projectData[projectId-1]['summary']}</p>
                            <p className='projectBody'>{projectData[projectId-1]['description']}</p>
                            <ul className='projectBody'>
                            {
                                projectData[projectId-1]['tech'].map((li, idx) => (<li key={idx}>{li}</li>))
                            }
                            </ul>
                            <p className='projectLink'><a href={projectData[projectId-1]['repo']} target='_blank' rel='noopener noreferrer'>View project repo</a></p>    
                        </div>
                    </div>
                </Content>
            </ProjectDiv>
            
        </Container>
        <SliderModal showModal={showModal} setShowModal={setShowModal} projectId={projectId} />
        </>
    )
}

export default Project;