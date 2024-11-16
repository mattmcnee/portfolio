import React from 'react';
import ChatboxOverlay from '/src/components/ChatboxOverlay';
import './Home.scss';

const Home = () => {
    return (
        <div>
            <div className="homepage-banner"> </div>
            <h1>Welcome to the Home Page</h1>
            <ChatboxOverlay />
            <iframe className='linkedin-embed' src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7253018009873608704" height="848" width="504" frameBorder="0" allowFullScreen="" title="Embedded post"></iframe>
            <iframe className='linkedin-embed' src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7245151802453594113" height="787" width="504" frameBorder="0" allowFullScreen="" title="Embedded post"></iframe>
        </div>
    );
};

export default Home;