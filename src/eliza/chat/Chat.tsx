import React, { useState } from 'react';
import './Chat.css';

const Chat = ({ onSuccess }: { onSuccess: () => void }) => {
    const ELIZA_URL = 'http://localhost:3000/';
    const AGENT_ID = '010bff8d-6d58-044d-a487-99e2d161dd1e';
    const [, setResponse] = useState<string>(''); 
    const [userMessage, setUserMessage] = useState<string>('');  
    const [isLoading, setIsLoading] = useState<boolean>(false);  
    const [chatHistory, setChatHistory] = useState<string[]>([]);  
    const [isClosed, setIsClosed] = useState<boolean>(false);  // 用于控制聊天框是否关闭

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(e.target.value);
    };

    const sendMessage = async () => {
        if (!userMessage.trim()) return; 
        setIsLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('user', '');  
        formDataToSend.append('text', userMessage);  
        formDataToSend.append('action', "NONE");

        try {
            const response = await fetch(`${ELIZA_URL}${AGENT_ID}/message`, {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': 'zh-CN,zh;q=0.9',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("AI 回复:", data);

            const aiMessage = data.map((item: any) => item.text).join("\n");
            setChatHistory((prev) => [...prev, `用户: ${userMessage}`, `Suki: ${aiMessage}`]);
            setResponse(aiMessage);
            setUserMessage(''); 
        } catch (error) {
            console.error("请求失败", error);
        } finally {
            setIsLoading(false);
            onSuccess();
        }
    };

    const closeChat = () => {
        setIsClosed(true);
    };

    if (isClosed) return null;

    return (
        <div className="chat-container">
            {/* 关闭按钮 */}
            <button className="close-button" onClick={closeChat}>X</button>

            <h2 className="chat-header">Suki</h2>

            {/* 聊天记录区域 */}
            <div className="chat-history">
                {chatHistory.map((message, index) => {
                    const [user, text] = message.split(': ');
                    return (
                        <div 
                            key={index}
                            className={`message-item ${user === '用户' ? 'user-message' : 'ai-message'}`}
                        >
                            <div className="message-label">{user}</div>
                            <div>{text}</div>
                        </div>
                    );
                })}
                {isLoading && <div className="loading-indicator">Suki 正在思考...</div>}
            </div>

            {/* 输入区域 */}
            <div className="input-container">
                <input
                    type="text"
                    value={userMessage}
                    onChange={handleInputChange}
                    placeholder="输入你想说的话..."
                    className="chat-input"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    disabled={isLoading || !userMessage.trim()}
                    className="send-button"
                >
                    {isLoading ? '发送中...' : '发送'}
                </button>
            </div>
        </div>
    );
};

export default Chat;
