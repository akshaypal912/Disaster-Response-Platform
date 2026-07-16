import React, { useState } from 'react';

export function AIChatbot() {
  const [chat, setChat] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const triggerChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    try {
      const res = await fetch('/api/disaster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setChat(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch {
      setChat(prev => [...prev, { role: 'bot', text: 'Local guidance override: Evacuate current sector, monitor official broadcasts.' }]);
    }
  };

  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs">
      <h3 className="text-white font-mono">TAC-AI ASSISTANT</h3>
      <div className="h-32 overflow-y-auto space-y-2">
        {chat.map((c, i) => <div key={i} className={`p-2 rounded ${c.role === 'user' ? 'bg-red-950/40 text-right' : 'bg-slate-950/80 text-left text-slate-300'}`}>{c.text}</div>)}
      </div>
      <form onSubmit={triggerChat} className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-slate-950 border border-slate-800 p-2 rounded text-white" placeholder="Query Gemini API..." />
        <button className="px-3 bg-red-600 rounded text-white">SEND</button>
      </form>
    </div>
  );
}
