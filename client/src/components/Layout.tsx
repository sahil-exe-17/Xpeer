import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const navLinks = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Communities', path: '/communities', icon: 'groups' },
    { name: 'Study Groups', path: '/study-group/1', icon: 'school' },
    { name: 'Leaderboard', path: '/leaderboard', icon: 'leaderboard' },
    { name: 'AI Hub', path: '/ai', icon: 'smart_toy' },
    { name: 'Store', path: '/store', icon: 'shopping_bag' },
  ];

  const bottomLinks = [
    { name: 'Profile', path: '/profile', icon: 'person' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <div className="bg-transparent text-on-surface font-body-md antialiased min-h-screen overflow-x-hidden selection:bg-primary selection:text-surface-dim">
      
      {/* TopAppBar */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-md z-40">
        <div className="flex items-center group">
          <div className="flex items-center gap-xs px-sm py-xs bg-black border border-outline-variant rounded-full transition-colors duration-200 group-focus-within:border-primary w-64">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
            <input className="bg-transparent border-none text-body-md font-body-md text-primary w-full p-0 placeholder:text-on-surface-variant focus:ring-0 focus:outline-none" placeholder="Search knowledge base..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="font-label-md text-label-md text-primary bg-surface-container-high px-sm py-xs rounded-full border border-outline-variant hidden md:block">
            Lvl {user.currentLevel || 1} • {user.xp || 0} XP
          </div>
          <div className="flex items-center gap-sm">
            <button className="text-on-surface-variant hover:text-primary transition-opacity scale-95 active:scale-90 p-xs rounded-full hover:bg-surface-container-low duration-200">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-opacity scale-95 active:scale-90 p-xs rounded-full hover:bg-surface-container-low duration-200">
              <span className="material-symbols-outlined">military_tech</span>
            </button>
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-screen w-64 bg-background/90 backdrop-blur-md border-r border-outline-variant flex flex-col py-lg px-md z-50">
        <div className="mb-lg px-sm animate-slide-up">
          <div className="flex items-center gap-sm mb-xs group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center overflow-hidden shrink-0">
               {user.username ? (
                  <span className="text-primary text-xl font-bold">{user.username[0].toUpperCase()}</span>
               ) : (
                  <span className="material-symbols-outlined text-primary text-[20px]">person</span>
               )}
            </div>
            <div>
              <h1 className="font-display text-headline-lg text-primary tracking-tighter leading-none shimmer-text animate-shimmer group-hover:scale-105 transition-transform duration-300">XpeeR</h1>
              <p className="font-mono-sm text-mono-sm text-on-surface-variant uppercase tracking-widest mt-1">Elite Scholar</p>
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-unit flex-grow animate-slide-up delay-100">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <li key={link.name}>
                <Link to={link.path} className={`flex items-center gap-sm px-sm py-[12px] transition-colors duration-200 ease-in-out font-body-md text-body-md rounded-md ${isActive ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-low' : 'text-on-surface-variant font-medium hover:bg-surface-container-low'}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="flex flex-col gap-unit mt-auto border-t border-outline-variant pt-sm animate-slide-up delay-200">
          {bottomLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name}>
                <Link to={link.path} className={`flex items-center gap-sm px-sm py-[12px] transition-colors duration-200 ease-in-out font-body-md text-body-md rounded-md ${isActive ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-low' : 'text-on-surface-variant font-medium hover:bg-surface-container-low'}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="w-full flex items-center gap-sm px-sm py-[12px] transition-colors duration-200 ease-in-out font-body-md text-body-md rounded-md text-error hover:bg-error-container/20">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <main className="ml-64 pt-16 min-h-screen relative z-10 flex justify-center pb-xl">
        <div className="w-full max-w-container-max px-lg py-lg">
           <Outlet />
        </div>
      </main>
    </div>
  );
}
