import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard').then(res => setUsers(res.data)).catch(console.error);
  }, []);

  return (
    <div className="max-w-[800px] mx-auto py-xl animate-slide-up">
      <div className="mb-lg text-center">
        <h2 className="font-display text-display text-primary mb-xs">Global Rankings</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Top contributors in the Nexus.</p>
      </div>
      
      <div className="bg-surface/60 backdrop-blur-xl rounded-xl border border-surface-container-high overflow-hidden shadow-2xl ambient-glow relative">
        <div className="absolute top-0 right-0 w-full h-64 bg-primary opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10">
           {users.length === 0 ? (
             <p className="text-center font-body-md text-on-surface-variant py-xl">No ranking data available.</p>
           ) : users.map((u: any, index) => (
             <div key={u.id} className="flex items-center gap-md p-md border-b border-surface-container-high last:border-0 hover:bg-surface-container-low/50 transition-colors">
               <div className="font-display text-headline-lg text-on-surface-variant w-8 text-center">
                 {index === 0 ? '1' : index === 1 ? '2' : index === 2 ? '3' : `${index + 1}`}
               </div>
               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-xl border ${index === 0 ? 'bg-primary/20 text-primary border-primary/50' : 'bg-surface-container-highest text-on-surface-variant border-surface-container-high'}`}>
                 {u.username?.[0]?.toUpperCase()}
               </div>
               <div className="flex-1">
                 <h3 className="font-headline-md text-on-surface">{u.username}</h3>
                 <p className="font-mono-sm text-primary uppercase tracking-widest text-xs mt-1">Level {u.currentLevel} Scholar</p>
               </div>
               <div className="font-display text-headline-md text-primary">
                 {u.xp} <span className="text-sm font-mono-sm uppercase tracking-widest text-on-surface-variant">XP</span>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
