import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatboxOverlay from '/src/components/ChatboxOverlay';
import Navbar from '/src/components/Navbar';
import './Home.scss';
import { TertiaryButton } from '/src/components/Buttons';
import ImageHexagon from '/src/components/ImageHexagon';
import ExperienceCard from '../components/ExperienceCard';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const downloadCV = () => {
        const link = document.createElement('a');
        link.href = 'MatthewMcNeeCV.pdf';
        link.download = 'MatthewMcNeeCV';
        link.click();
    }

    return (
        <div>
            <Navbar downloadCV={downloadCV} />
            

            <div className="homepage-banner">
                <div className="homepage-content">
                    <div className='top-row'>
                        <ImageHexagon clickable={true} />
                        <div className='tagline'>Frontend Developer Specialising in UI/UX and React</div>
                    </div>

                    <div className='bottom-row'>
                    <TertiaryButton onClick={downloadCV}>
                        Download CV
                    </TertiaryButton>
                        {/* <TertiaryButton onClick={() => navigate('/cv')}>Schedule a Meeting</TertiaryButton> */}
                        <TertiaryButton onClick={() => setIsChatOpen(true)}>Chat with AI</TertiaryButton>
                    </div>
                </div> 
            </div>

            <div className='homepage-section'>

                <h1>Experience</h1>

                <ExperienceCard role="Full Stack Developer"
                    company="KSR Development"
                    type="Contract"
                    dates="Oct 2024 - Present · 2 mos"
                    location="Remote"
                >
                    <ul>
                        <li>
                        Identified security vulnerabilities, inefficient database queries and code quality issues through software audits. 
                        </li>
                        <li>
                        Provided documentation and proposed solutions to reduce system complexity while maintaining functionality.
                        </li>
                        <li>
                        Refactored, optimised and deployed Node.js applications to cloud platforms including GCP and AWS.
                        </li>
                    </ul>
                </ExperienceCard>

                <ExperienceCard role="Website Designer"
                    company="Acyleris Web Design"
                    type="Self-employed"
                    dates="Jun 2024 - Present · 6 mos"
                    location="Remote"
                >
                    <ul>
                        <li>
                        Delivered visually appealing and user-friendly websites for individuals and small businesses.
                        </li>
                        <li>
                        Leveraged Firebase Functions and MailJet to send emails from contact form submissions without passing on a subscription cost.
                        </li>
                        <li>
                        Managed websites through Firebase Hosting and configured DNS settings for customer domains.
                        </li>
                    </ul>
                </ExperienceCard>

                <ExperienceCard role="Officer Cadet"
                    company="Manchester and Salford Universities' Air Squadron (MASUAS)"
                    type="Part-time"
                    dates="Sep 2021 - Aug 2023 · 2 yrs"
                    location="Manchester, England, United Kingdom"
                >
                    <ul>
                        <li>
                        Reintroduced and instructed water training.
                        </li>
                        <li>
                        Delivered presentations on current affairs and training expedition proposals.
                        </li>
                        <li>
                        Managed aircrew at the RIAT air show, coordinating shuttle bus logistics.
                        </li>
                        <li>
                        Trained in aircraft piloting and weapons handling, with experience of a simulated deployment.
                        </li>
                    </ul>
                </ExperienceCard>

                <h1>Projects</h1>

                <ProjectCard 
                    name="Hiking Network route planner"
                    company="Acyleris Web Design"
                    dates="Jul 2024 - Sep 2024"
                    >
                    <ul>
                        <li>
                        Tested and deployed a route planning web application that provides a smoother UX than competitors for outdoor activity planning.
                        </li>
                        <li>
                        Managed route and user data across multiple Firestore collections and handled React State to render multiple routes on a map simultaneously.
                        </li>
                        <li>
                        Designed custom icons for a consistent, lightweight UI.
                        </li>
                    </ul>
                </ProjectCard>
                
                <ProjectCard 
                    name="Stackelberg and Hex AI agents"
                    company="The University of Manchester"
                    dates="Sep 2023 - Jun 2024"
                    >
                    <ul>
                        <li>
                        Maximised the leader’s profit in a Stackelberg pricing game, using weighted least squares regression and CNNs built in Keras to predict the follower’s response.
                        </li>
                        <li>
                        Optimised a lightweight AI agent for the game of Hex using alpha-beta pruned minimax and a unique pattern matching algorithm.
                        </li>
                    </ul>
                </ProjectCard>

                <ProjectCard 
                    name="Lexicon+ learning platform"
                    company="University of Manchester"
                    dates="Sep 2023 - Mar 2024"
                    >
                    <ul>
                        <li>
                        Developed a learning application with Vite, React, and Firebase, integrating Three.js geometric games into multimedia worksheets.
                        </li>
                        <li>
                        Managed image uploads with Google Drive OAuth 2.0 and implemented AI features for auto-generated flashcards and a maths assistance chatbot powered by a pre-prompted gpt-3.5-turbo model.
                        </li>
                    </ul>
                </ProjectCard>

                <ProjectCard 
                    name="UoM Blackboard browser extension"
                    company="University of Manchester"
                    dates="Sep 2023 - Dec 2023"
                    >
                    <ul>
                        <li>
                        Enhanced the UX of the University of Manchester’s online learning platform by adding upcoming deadlines and useful links to the homepage.
                        </li>
                        <li>
                        Improved design responsiveness and overhauled the site layout with CSS for a cleaner and consistent UI.
                        </li>
                        <li>
                        Received a 5-star rating on the Chrome Web Store.
                        </li>
                    </ul>
                </ProjectCard>


                



            </div>

            
            <div className="homepage-footer">Developed by <Link to='https://acyleris.com/'>Acyleris Web Design</Link></div>
            <ChatboxOverlay isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
            {/* <iframe className='linkedin-embed' loading="lazy" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7253018009873608704" height="848" width="504" frameBorder="0" allowFullScreen="" title="Embedded post"></iframe>
            <iframe className='linkedin-embed' loading="lazy" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7245151802453594113" height="787" width="504" frameBorder="0" allowFullScreen="" title="Embedded post"></iframe> */}
        </div>
    );
};

export default Home;