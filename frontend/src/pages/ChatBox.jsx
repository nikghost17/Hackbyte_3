import React, { useState } from 'react';
import './ChatBox.css';
import ReactMarkdown from 'react-markdown';
import Sidebar from '../components/Sidebar'; // adjust path if needed

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: input }),
      });

      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
    }

    setInput('');
  };

  const sendImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    try {
      const res1 = await fetch('http://localhost:8000/extract_text/', {
        method: 'POST',
        body: formData,
      });

      const { extracted_text } = await res1.json();

      const userMessage = { sender: 'user', text: '[Uploaded Prescription Image]' };
      setMessages((prev) => [...prev, userMessage]);

      const res2 = await fetch('http://localhost:8000/validate_prescription/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extracted_text }),
      });

      const { validated, details } = await res2.json();

      const validatedMessage = { sender: 'bot', text: validated };
      setMessages((prev) => [...prev, validatedMessage]);

      for (const [name, description] of Object.entries(details)) {
        const infoMessage = {
          sender: 'system',
          text: `💊${description}`,
        };
        setMessages((prev) => [...prev, infoMessage]);
      }

    } catch (err) {
      console.error('Image upload error:', err);
    }

    setImage(null);
  };

  return (
    <div className="chatbox-container">
      <Sidebar />
      <div className="chat-cont">
        <div className="chattingbox">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user' : msg.sender === 'bot' ? 'bot' : 'system'}`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
        </div>

        <div className="inputbox">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>

        <div className="uploadingbox">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={sendImage} disabled={!image}>
            Upload Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
