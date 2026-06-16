import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io();

export default function StudyGroupChat() {
  const { id } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit('join_study_group', id);
    socket.on('receive_message', (data) => {
      setMessages(prev => [...prev, data]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    return () => { socket.off('receive_message'); };
  }, [id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit('send_message', { groupId: id, sender: user.username, text: input });
    setInput('');
  };

  return (
    <div className="max-w-[1000px] mx-auto h-[calc(100vh-140px)] flex flex-col py-md animate-slide-up">
      <div className="flex justify-between items-center mb-md">
        <div>
           <h2 className="font-display text-headline-lg text-primary">Study Group Channel</h2>
           <p className="font-mono-sm text-on-surface-variant uppercase tracking-widest">ID: {id?.substring(0,8)}</p>
        </div>
        <button className="bg-surface-container-highest hover:bg-surface-container-high border border-surface-container-high text-primary px-sm py-2 rounded-lg font-label-md transition-colors flex gap-xs items-center uppercase tracking-widest">
          <span className="material-symbols-outlined text-[18px]">mic</span>
          Connect Audio
        </button>
      </div>
      
      <div className="flex-1 bg-surface/60 backdrop-blur-xl rounded-t-xl border border-surface-container-high p-md overflow-y-auto flex flex-col gap-sm ambient-glow relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex-1 relative z-10 space-y-sm">
           {messages.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center text-on-surface-variant opacity-50 py-xl">
                <span className="material-symbols-outlined text-[48px] mb-sm">forum</span>
                <p className="font-body-md">Connection established. Say hello.</p>
             </div>
           )}
           {messages.map((msg, idx) => {
             const isMe = msg.sender === user.username;
             return (
               <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                 <span className="font-label-md text-on-surface-variant text-xs mb-1 px-1 uppercase tracking-widest">{msg.sender}</span>
                 <div className={`px-md py-sm rounded-2xl max-w-[80%] font-body-md ${isMe ? 'bg-primary text-black rounded-tr-sm' : 'bg-[#000000]/60 border border-[#27272A]/50 text-on-surface rounded-tl-sm'}`}>
                   {msg.text}
                 </div>
               </div>
             );
           })}
           <div ref={chatEndRef} />
        </div>
      </div>
      
      <form onSubmit={sendMessage} className="flex gap-sm bg-surface/80 backdrop-blur-xl p-md border border-t-0 border-surface-container-high rounded-b-xl relative z-10">
        <input 
          type="text" 
          className="flex-1 bg-[#000000]/40 border border-[#27272A]/50 rounded-lg p-3 font-body-md text-primary placeholder:text-surface-variant focus:border-primary/50 transition-colors outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Transmit message..."
        />
        <button type="submit" className="bg-primary hover:opacity-90 text-black px-lg py-3 rounded-lg font-label-md transition-opacity flex items-center gap-xs uppercase tracking-widest">
          <span className="material-symbols-outlined text-[18px]">send</span>
          Send
        </button>
      </form>
    </div>
  );
}
