import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [user, setUser] = useState<any>({});
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <>
      {/* Welcome Header */}
      <header className="mb-lg animate-slide-up">
        <h2 className="font-display text-display text-primary tracking-tighter">Welcome Back, {user.username || 'Scholar'} 👋</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-unit">Ready to continue your intellectual journey.</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Main Level Card (Spans 8 cols) */}
        <article className="col-span-12 md:col-span-8 bg-surface/60 backdrop-blur-md border border-surface-container-high rounded-xl p-md ambient-glow relative overflow-hidden flex items-center justify-between min-h-[280px] animate-slide-up delay-100">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="flex flex-col justify-between h-full z-10">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Current Status</span>
              <h3 className="font-display text-[64px] leading-none text-primary mt-sm tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                Level {user.currentLevel || 1}
              </h3>
            </div>
            <div className="mt-xl">
              <Link to="/communities" className="bg-primary text-black font-label-md text-label-md px-md py-sm rounded-full hover:opacity-90 transition-opacity flex items-center gap-xs inline-flex">
                <span>Enter Community</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
          
          {/* Circular Progress Ring */}
          <div className="relative w-48 h-48 flex items-center justify-center shrink-0 z-10 hidden sm:flex">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle className="text-surface-container-highest stroke-current" strokeWidth="8" cx="60" cy="60" r="54" fill="transparent"></circle>
              <circle className="text-primary stroke-current progress-ring__circle" strokeWidth="8" strokeLinecap="round" cx="60" cy="60" r="54" fill="transparent" strokeDasharray="339.292" strokeDashoffset={339.292 - (339.292 * ((user.xp || 0) % 1000) / 1000)}></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display text-headline-md text-primary tracking-tighter xp-glow">{user.xp || 0}</span>
              <span className="font-mono-sm text-[10px] text-on-surface-variant uppercase tracking-widest">Total XP</span>
            </div>
          </div>
        </article>

        {/* Quick Actions (Spans 4 cols) */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-gutter animate-slide-up delay-200">
          <Link to="/ai" className="flex-1 bg-surface-container-low/50 hover:bg-surface-container-high/50 transition-colors border border-outline-variant rounded-xl p-md flex flex-col justify-center items-center text-center group cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-[24px]">smart_toy</span>
             </div>
             <h4 className="font-headline-md text-primary mb-unit">AI Tutor</h4>
             <p className="font-body-md text-on-surface-variant text-sm">Generate a study plan</p>
          </Link>
          <Link to="/store" className="flex-1 bg-surface-container-low/50 hover:bg-surface-container-high/50 transition-colors border border-outline-variant rounded-xl p-md flex flex-col justify-center items-center text-center group cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
             </div>
             <h4 className="font-headline-md text-primary mb-unit">Store</h4>
             <p className="font-body-md text-on-surface-variant text-sm">Spend your {user.coins || 0} coins</p>
          </Link>
        </div>

      </div>
    </>
  );
}
