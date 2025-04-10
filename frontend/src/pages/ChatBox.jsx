import React, { useState } from 'react';
import './ChatBox.css';
import ReactMarkdown from 'react-markdown';
import Sidebar from "../components/sidebar";

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
        // Step 1: Extract text from image
        const res1 = await fetch('http://localhost:8000/extract_text/', {
            method: 'POST',
            body: formData,
        });

        const { extracted_text } = await res1.json();

        const userMessage = { sender: 'user', text: '[Uploaded Prescription Image]' };
        setMessages((prev) => [...prev, userMessage]);

        // Step 2: Validate prescription & extract medicine names
        const res2 = await fetch('http://localhost:8000/validate_prescription/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: extracted_text }),
        });

        const { validated, details, available } = await res2.json();
        console.log("✅ API Response - available:", available);
        // Show validated medicine list
        const validatedMessage = { sender: 'bot', text: validated };
        setMessages((prev) => [...prev, validatedMessage]);

        // Show info for each medicine
        for (const [name, detail] of Object.entries(details)) {
            const infoMessage = {
                sender: 'system',
                text: `💊${detail.description}\nQuantity: ${detail.inventory.stock}`
            };
            setMessages((prev) => [...prev, infoMessage]);
        }
        // ✅ Prompt to add available medicines to cart
        if (Array.isArray(available) && available.length > 0) {
            const confirmMessage = {
                sender: 'bot',
                text: `✅ Do you want me to add 1 of each available medicine to your cart?`
            };
            setMessages((prev) => [...prev, confirmMessage]);
            const yesNoPrompt = window.confirm("Add all available medicines to cart?");
            const userId = localStorage.getItem("userId");
            if (yesNoPrompt) {
                for (const med of available) {
                    try {
                        await fetch("http://localhost:5000/api/cart/add", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userId, // Replace with actual user ID
                                medId: med.medId,
                                med_name:med.med_name,
                                quantity:1,
                                price:med.med_price
                            })
                        });
                    } catch (error) {
                        console.error(`Failed to add ${med.med_name} to cart`, error);
                    }
                }
                setMessages((prev) => [...prev, {
                    sender: 'bot',
                    text: `🛒 All available medicines have been added to your cart.`
                }]);
            }
        }

        // Optionally: Detect medicine names from `result` and call /medicine_info/

        } catch (err) {
        console.error('Image upload error:', err);
        }

        setImage(null);
    };

    return (
        <div className="chat-cont">
            <Sidebar/>
            <h1>PharmaHub Assistant</h1>
        <div className="chattingbox">
            {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
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
            placeholder="         Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>

        <div className="uploadingbox">
            <label htmlFor="file-upload">Choose Prescription 📎</label>
            <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            />
            <button onClick={sendImage} disabled={!image}>Upload Prescription</button>
        </div>
        </div>
    );
};

export default ChatBox;
