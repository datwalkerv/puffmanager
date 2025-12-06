'use client';
import React, { useEffect, useState } from 'react';

export default function ProjectChat({ projectId }: { projectId: string }) {
    const [messages, setMessages] = useState<{ id: string; text: string; author?: string }[]>([]);
    const [text, setText] = useState('');

    // Példa: poll vagy websocket integráció
    useEffect(() => {
        // ide jöhet a websocket csatlakozás vagy fetch a chat history-hoz
        // fetch(`/api/chat?projectId=${projectId}`)...
    }, [projectId]);

    async function handleSend() {
        if (!text) return;
        // itt POSTolnád a message-t a chat backendre
        setMessages(prev => [...prev, { id: String(Date.now()), text, author: 'you' }]);
        setText('');
    }

    return (
        <div style={{ border: '1px solid #ddd', padding: 10, borderRadius: 6 }}>
            <h3>Chat — projekt {projectId}</h3>
            <div style={{ maxHeight: 200, overflow: 'auto', marginBottom: 10 }}>
                {messages.map(m => <div key={m.id}><strong>{m.author ?? 'user'}:</strong> {m.text}</div>)}
            </div>
            <div>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Üzenet..." />
                <button onClick={handleSend}>Küld</button>
            </div>
        </div>
    );
}