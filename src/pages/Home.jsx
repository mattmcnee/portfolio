import React from 'react';
import ChatboxOverlay from '/src/components/ChatboxOverlay';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <ChatboxOverlay />
            <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7253018009873608704" height="848" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7245151802453594113" height="787" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
        </div>
    );
};

export default Home;