import React, { useState, useRef, useEffect } from 'react';
import { api } from '/src/utils/api';
import { splitIntoSentences, cleanMessage, getGreeting } from '/src/utils/textProcessing';
import closeIcon from '/src/assets/icons/close.svg';

const Chatbox = ({ preprompt, messages, setMessages, setIsChatOpen }) => {
    const [input, setInput] = useState('');
    const [references, setReferences] = useState([]);
    const [loading, setLoading] = useState(false);
    const transcriptRef = useRef([]);
    const messagesEndRef = useRef(null);
    const initialMessage = `${getGreeting()}, I'm Matt's AI counterpart`;

    const getResponse = async () => {
        setLoading(true);

        const recentMessages = transcriptRef.current.slice(-20).map((message) => ({
            role: message.role === 'user' ? 'user' : 'assistant',
            content: message.text,
        }));

        const joinedMessages = [];
        for (let i = 0; i < recentMessages.length; i++) {
            const currentMessage = recentMessages[i];
            if (joinedMessages.length === 0 || joinedMessages[joinedMessages.length - 1].role !== currentMessage.role) {
                joinedMessages.push(currentMessage);
            } else {
                joinedMessages[joinedMessages.length - 1].content += `\n${currentMessage.content}`;
            }
        }

        const trimmedMessages = joinedMessages.slice(-6);
        trimmedMessages.unshift({ role: 'system', content: preprompt });

        try {
            const topK = 3;
            if (trimmedMessages[trimmedMessages.length - 1].role === 'assistant') return;

            const result = await api.post(`${import.meta.env.VITE_API_URL}/getSimilarDocuments`, {
                topK,
                text: trimmedMessages[trimmedMessages.length - 1].content,
                preprompt,
                history: trimmedMessages,
            });

            let responseMessage = result.data.message;
            responseMessage = cleanMessage(responseMessage);

            const relevantReferences = result.data.context.matches
                .filter(match => match.score > 0.25)
                .map(match => ({ title: match.metadata.title, answer: match.metadata.answer, score: match.score }));

            setReferences(relevantReferences);

            const sentences = splitIntoSentences(responseMessage);

            sentences.forEach((sentence, index) => {
                setTimeout(() => {
                    const newMessage = { role: 'assistant', text: sentence };
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                    transcriptRef.current.push(newMessage);
                    if (index === sentences.length - 1) setLoading(false);
                }, index * 800);
            });
        } catch (e) {
            console.error('Error fetching response:', e);
            setLoading(false);
        }
    };

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = { role: 'user', text: input.trim() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        transcriptRef.current.push(userMessage);
        setInput('');
        getResponse();
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, loading]);


    const [loadingFirstMessage, setLoadingFirstMessage] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoadingFirstMessage(false);
        }, 1200);
    }, []);

    return (
        <>
            <img
                src={closeIcon}
                alt="Close chat"
                onClick={() => setIsChatOpen(false)}
                className="close-icon"
            />
            <div className="chatbox-header"></div>
            <div className="chatbox-corner"></div>
            <div className="chatbox-messages">
                {!loadingFirstMessage || messages.length > 0 ? (
                <div className="message-container assistant">
                    <div className="message assistant">{initialMessage}</div>
                </div>
                ) : (
                    <div className="message-container loading">
                        <div className="message loading">...</div>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div key={index} className={`message-container ${msg.role}`}>
                        <div className={`message ${msg.role}`}>{msg.text}</div>
                    </div>
                ))}
                {loading && (
                    <div className="message-container loading">
                        <div className="message loading">...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="chatbox-input"
            />
        </>
    );
};

export default Chatbox;
