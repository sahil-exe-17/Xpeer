import React, { useState } from 'react';
import axios from 'axios';

export default function AIHub() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse('');
    try {
      const res = await axios.post('/api/ai/ask', {
        userId: user.id,
        question
      });
      setResponse(res.data.answer);
      
      // Update local quota
      if (user.aiQuota > 0) {
         user.aiQuota -= 1;
         localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (err: any) {
      setResponse(err.response?.data?.error || 'Failed to communicate with AI core.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto py-xl animate-slide-up">
      {/* Page Header */}
      <div className="mb-lg">
        <h2 className="font-display text-display text-primary mb-xs">AI Scholar Hub</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Your personal algorithmic tutor. Ask any technical question.</p>
      </div>

      <div className="bg-surface/60 backdrop-blur-xl border border-surface-container-high rounded-xl p-md ambient-glow relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex items-center justify-between mb-lg border-b border-surface-container-high pb-sm relative z-10">
           <div className="flex items-center gap-sm">
             <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">smart_toy</span>
             </div>
             <div>
               <h3 className="font-headline-md text-primary">Nexus AI</h3>
               <p className="font-mono-sm text-on-surface-variant uppercase tracking-widest">Model: Xpeer-V1</p>
             </div>
           </div>
           <div className="text-right">
              <span className="font-display text-headline-md text-primary">{user.aiQuota || 0}</span>
              <p className="font-mono-sm text-on-surface-variant uppercase tracking-widest">Queries Remaining</p>
           </div>
        </div>

        <div className="min-h-[200px] mb-lg relative z-10">
          {response ? (
             <div className="bg-[#000000]/40 border border-[#27272A]/50 backdrop-blur-md rounded-lg p-md">
                <div className="flex items-center gap-xs mb-sm">
                  <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                  <span className="font-label-md text-primary uppercase tracking-widest">AI Response</span>
                </div>
                <p className="font-body-md text-on-surface leading-relaxed whitespace-pre-wrap">{response}</p>
             </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-on-surface-variant opacity-50 py-xl">
                <span className="material-symbols-outlined text-[48px] mb-sm">forum</span>
                <p className="font-body-md">Awaiting your query...</p>
             </div>
          )}
        </div>

        <form onSubmit={handleAsk} className="relative z-10 flex gap-sm">
           <input 
              type="text" 
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="e.g. How does Dijkstra's algorithm work?"
              className="flex-1 bg-[#000000]/40 border border-[#27272A]/50 backdrop-blur-md rounded-lg p-3 font-body-md text-primary placeholder:text-surface-variant transition-colors focus:border-primary/50"
              disabled={isLoading}
           />
           <button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary text-black font-label-md px-lg py-3 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest flex items-center gap-xs disabled:opacity-50"
           >
              {isLoading ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span className="material-symbols-outlined">send</span>}
              Ask
           </button>
        </form>
      </div>
    </div>
  );
}
