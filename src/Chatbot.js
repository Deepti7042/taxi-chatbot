import React, { useState, useEffect, useRef } from 'react';
import { LexRuntime } from 'aws-sdk';
import './Chatbot.css';

function ChatbotIcon({ onClick }) {
    return (
        <div className="chatbot-icon" onClick={onClick}>
            <span>💬</span>
        </div>
    );
}

function Chatbot({ isVisible }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null); // Ref for auto-scrolling

    const lexRuntime = new LexRuntime({
        region: 'us-east-1',
        credentials: {
            accessKeyId: 'AKIAUMYCIGCN3OO5KU6Y',
            secretAccessKey: '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',
        },
    });

    const sendMessageToLex = async (message) => {
        const params = {
            botAlias: 'TaxiBooking',
            botName: 'TaxiBooking',
            inputText: message,
            userId: 'LexDeveloper',
        };

        try {
            const response = await lexRuntime.postText(params).promise();
            if (message !== 'Heya') {
                // Only add to messages if it's not "Heya"
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: message, sender: 'user' },
                ]);
            }
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response.message, sender: 'bot' },
            ]);
        } catch (error) {
            console.error('Error sending message to Lex:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Sorry, I'm having trouble understanding you.", sender: 'bot' },
            ]);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = () => {
        if (input.trim()) {
            sendMessageToLex(input);
            setInput('');
        }
    };

    // Auto-scroll to the bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Trigger Welcome intent when chatbot becomes visible
    useEffect(() => {
        if (isVisible && messages.length === 0) {
            sendMessageToLex('Heya'); // Trigger intent without displaying "Heya"
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="chat-container">
            <div className="chat-title-bar">
                <span>Assistant here !!</span>
            </div>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

function App() {
    const [isChatVisible, setIsChatVisible] = useState(false);

    const toggleChat = () => setIsChatVisible(!isChatVisible);

    return (
        <div>
            <ChatbotIcon onClick={toggleChat} />
            <Chatbot isVisible={isChatVisible} />
        </div>
    );
}

export default App;
