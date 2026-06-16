export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="max-w-[800px] mx-auto py-xl animate-slide-up">
      {/* Page Header */}
      <div className="mb-lg">
        <h2 className="font-display text-display text-primary mb-xs">Scholar Profile</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Review your academic identity and progression.</p>
      </div>

      <div className="bg-surface/60 backdrop-blur-xl border border-surface-container-high rounded-xl p-md ambient-glow relative overflow-hidden flex flex-col md:flex-row items-center gap-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="w-32 h-32 bg-surface-container-highest rounded-full flex items-center justify-center font-display text-[64px] text-primary shadow-xl shadow-primary/10 z-10 border-4 border-surface-container-high">
          {user.username?.[0]?.toUpperCase() || 'U'}
        </div>
        
        <div className="z-10 text-center md:text-left flex-1">
          <h1 className="font-display text-[48px] tracking-tighter leading-none text-primary mb-xs">{user.username || 'Guest'}</h1>
          <p className="font-mono-sm text-primary uppercase tracking-widest mb-lg">
            Level {user.currentLevel || 1} Scholar <span className="text-on-surface-variant mx-2">•</span> {user.xp || 0} XP
          </p>
          
          <div className="grid grid-cols-2 gap-sm">
            <div className="bg-[#000000]/40 p-sm rounded-lg border border-[#27272A]/50 flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">monetization_on</span> 
              <div>
                 <span className="block font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Balance</span>
                 <span className="font-body-md text-primary">{user.storeBalance || 0} Coins</span>
              </div>
            </div>
            <div className="bg-[#000000]/40 p-sm rounded-lg border border-[#27272A]/50 flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">smart_toy</span> 
              <div>
                 <span className="block font-label-md text-on-surface-variant uppercase tracking-wider text-xs">AI Quota</span>
                 <span className="font-body-md text-primary">{user.aiQuota || 5} Queries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
