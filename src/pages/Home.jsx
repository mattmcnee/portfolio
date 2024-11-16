import React from 'react';
import { Link } from 'react-router-dom';
import ChatboxOverlay from '/src/components/ChatboxOverlay';
import Navbar from '/src/components/Navbar';
import './Home.scss';
import TextMask from '../components/TextMask';

const Home = () => {
    return (
        <div>
            <Navbar />
            

            <div className="homepage-banner">
                <div className="homepage-content">
                    <Link to='/map' className="get-started-button">AI Interview</Link>
                    <div className='tagline'>Download CV</div>
                </div> 
            </div>

            <TextMask backgroundColor="#fff" words={[
                { text: "import", color: "purple" },
                { text: "SPACE", color: "" },
                { text: "Through", color: "turquoise" },
                { text: "NEWLINE", color: "" },
                { text: "Text", color: "green" }
            ]}/>

            <ChatboxOverlay />
            {/* <iframe className='linkedin-embed' loading="lazy" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7253018009873608704" height="848" width="504" frameBorder="0" allowFullScreen="" title="Embedded post"></iframe>
            <iframe className='linkedin-embed' loading="lazy" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7245151802453594113" height="787" width="504" frameBorder="0" allowFullScreen="" title="Embedded post"></iframe> */}
        </div>
    );
};

export default Home;