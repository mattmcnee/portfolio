import React, { useState, useEffect } from 'react';
import chatIcon from '/src/assets/icons/chat.svg';
import Chatbox from '/src/components/Chatbox';

import './Chatbox.scss';

const ChatboxOverlay = ({ setIsChatOpen, isChatOpen}) => {
    const [messages, setMessages] = useState([]);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const preprompt = `You are a candidate in a job interview answering questions. 
    Potential relevant context is provided in the user's most recent question. MIRROR the TONE of this context. DO NOT claim to have experience not listed in this. DO NOT include the context UNLESS it addresses the user's message. 
    Use ONLY the conversation history or relevant details about yourself in this context to answer questions. IF greeted or thanked, respond politely without requiring context; DO NOT USE "!"
    IF there is nothing relevant in the context or conversation history: apologise, say either that you "don't know" or "can't recall" and ask for clarification or other questions. 
    When explaining concepts, be concise and FOCUS on what relevant experience you have. ENSURE your answers are LOGICALLY CONSISTENT and GRAMATICALLY CORRECT.
    Be concise; speak naturally; do not break character; do not refer to "the context"; DO NOT USE "!"; DO NOT SAY or include "feel free to ask"
    It is MORE IMPORTANT to CORRECTLY RESPOND to the user than to incorporate the context; DO NOT SAY "How can I assist you?"; DO NOT EXCEED 50 words.`;

    return (
        <>        
        <div className="chatbox-overlay">
            <div className="chatbox-container">
            {isChatOpen ? (
                <div className={`chatbox`}>
                    <Chatbox preprompt={preprompt} messages={messages} setMessages={setMessages} setIsChatOpen={setIsChatOpen}/>
                </div>
                ) : (
                    <div className="chatbox-icon" onClick={() => setIsChatOpen(true)}>
                        <img
                            src={chatIcon}
                            alt="Open chat"
                            className="chatbox-icon-img"
                        />
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default ChatboxOverlay;


