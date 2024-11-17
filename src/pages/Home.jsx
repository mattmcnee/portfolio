import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatboxOverlay from '/src/components/ChatboxOverlay';
import Navbar from '/src/components/Navbar';
import './Home.scss';
import { TertiaryButton } from '/src/components/Buttons';
import ImageHexagon from '/src/components/ImageHexagon';

const Home = () => {
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div>
            <Navbar />
            

            <div className="homepage-banner">
                <div className="homepage-content">
                    <div className='top-row'>
                        <ImageHexagon clickable={true} />
                        <div className='tagline'>Frontend Developer Specialising in UI/UX and React</div>
                    </div>

                    <div className='bottom-row'>
                        <TertiaryButton onClick={() => navigate('/cv')}>Download CV</TertiaryButton>
                        <TertiaryButton onClick={() => navigate('/cv')}>Schedule a Meeting</TertiaryButton>
                        <TertiaryButton onClick={() => navigate('/cv')}>Chat with AI</TertiaryButton>
                    </div>
                </div> 
            </div>

            Hello

            

            <ChatboxOverlay isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
            {/* <iframe className='linkedin-embed' loading="lazy" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7253018009873608704" height="848" width="504" frameBorder="0" allowFullScreen="" title="Embedded post"></iframe>
            <iframe className='linkedin-embed' loading="lazy" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7245151802453594113" height="787" width="504" frameBorder="0" allowFullScreen="" title="Embedded post"></iframe> */}
        </div>
    );
};

export default Home;