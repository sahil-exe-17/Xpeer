import React from 'react';

export default function Settings() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="max-w-[800px] mx-auto py-xl animate-slide-up">
      {/* Page Header */}
      <div className="mb-lg">
        <h2 className="font-display text-display text-primary mb-xs">Settings</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Configure your scholar profile and system preferences.</p>
      </div>

      <div className="bg-surface/60 backdrop-blur-xl border border-surface-container-high rounded-xl p-md ambient-glow relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary opacity-[0.02] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="space-y-lg relative z-10">
          
          <section>
             <h3 className="font-headline-md text-primary mb-md border-b border-surface-container-high pb-sm">Account Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div>
                   <label className="block font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Username</label>
                   <input type="text" disabled value={user.username || ''} className="w-full bg-surface-container-low dark:bg-[#000000]/40 border border-outline-variant dark:border-[#27272A]/50 rounded-lg p-3 font-body-md text-on-surface-variant cursor-not-allowed opacity-70" />
                </div>
                <div>
                   <label className="block font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Email Address</label>
                   <input type="email" disabled value={user.email || ''} className="w-full bg-surface-container-low dark:bg-[#000000]/40 border border-outline-variant dark:border-[#27272A]/50 rounded-lg p-3 font-body-md text-on-surface-variant cursor-not-allowed opacity-70" />
                </div>
             </div>
             <p className="text-sm font-mono-sm text-on-surface-variant mt-sm">Contact administration to change core identity parameters.</p>
          </section>

          <section>
             <h3 className="font-headline-md text-primary mb-md border-b border-surface-container-high pb-sm">Preferences</h3>
             <div className="space-y-sm">
                <div className="flex items-center justify-between p-sm border border-surface-container-high rounded-lg bg-surface-container-lowest/50">
                   <div>
                      <h4 className="font-label-md text-primary">Dark Mode Focus</h4>
                      <p className="font-body-md text-on-surface-variant text-sm mt-1">Keep the interface in dark mode permanently.</p>
                   </div>
                   <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-black rounded-full absolute top-1 right-1"></div>
                   </div>
                </div>
                
                <div className="flex items-center justify-between p-sm border border-surface-container-high rounded-lg bg-surface-container-lowest/50">
                   <div>
                      <h4 className="font-label-md text-primary">WebRTC Audio</h4>
                      <p className="font-body-md text-on-surface-variant text-sm mt-1">Enable voice channels in Study Groups.</p>
                   </div>
                   <div className="w-12 h-6 bg-surface-container-highest rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-on-surface-variant rounded-full absolute top-1 left-1"></div>
                   </div>
                </div>
             </div>
          </section>

          <section className="pt-sm">
             <button className="bg-error/10 text-error border border-error/30 font-label-md px-lg py-3 rounded-lg hover:bg-error/20 transition-colors uppercase tracking-widest flex items-center gap-xs">
                <span className="material-symbols-outlined">delete_forever</span>
                Request Account Deletion
             </button>
          </section>

        </div>
      </div>
    </div>
  );
}
