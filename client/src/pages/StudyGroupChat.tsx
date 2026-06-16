import React from 'react';
import { useParams } from 'react-router-dom';

export default function StudyGroupChat() {
  const { id } = useParams();

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-slide-up bg-surface dark:bg-[#09090B]/60 backdrop-blur-xl border border-outline-variant dark:border-[#27272A]/50 rounded-[20px] overflow-hidden ambient-glow">
      <div className="bg-surface-container-high border-b border-outline-variant p-md">
        <h2 className="font-display text-primary text-xl">Study Group Channel</h2>
        <p className="font-body-sm text-on-surface-variant">ID: {id}</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-xl text-center relative z-10">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-md" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_off</span>
        <h3 className="font-headline-md text-primary mb-sm">Real-time Chat is Disabled</h3>
        <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
          You are currently running in a serverless environment (Vercel) which does not support persistent WebSockets. 
          To enable real-time chat, please deploy this application to Render or another stateful hosting provider.
        </p>
      </div>
    </div>
  );
}
