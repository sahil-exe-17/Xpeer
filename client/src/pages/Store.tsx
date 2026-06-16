import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Store() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    axios.get('/api/store').then(res => setItems(res.data)).catch(console.error);
  }, []);

  const handlePurchase = async (itemId: string, cost: number) => {
    if (user.storeBalance < cost) {
      alert('Insufficient funds.');
      return;
    }
    if (window.confirm('Confirm transaction?')) {
      try {
        await axios.post('/api/store/purchase', { userId: user.id, storeItemId: itemId });
        user.storeBalance -= cost;
        localStorage.setItem('user', JSON.stringify(user));
        alert('Transaction successful.');
        window.location.reload();
      } catch (e) {
        alert('Transaction failed.');
      }
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-xl animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-lg gap-sm">
        <div>
           <h2 className="font-display text-display text-primary mb-xs">Marketplace</h2>
           <p className="font-body-lg text-body-lg text-on-surface-variant">Acquire upgrades, badges, and AI credits.</p>
        </div>
        <div className="bg-surface-container-highest px-md py-xs rounded-lg border border-surface-container-high flex items-center gap-xs">
           <span className="material-symbols-outlined text-primary text-sm">account_balance_wallet</span>
           <span className="font-mono-sm text-primary tracking-widest">{user.storeBalance || 0} COINS</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {items.length === 0 ? (
          <p className="font-body-md text-on-surface-variant col-span-3 text-center py-xl bg-surface/60 backdrop-blur-xl border border-surface-container-high rounded-xl">Marketplace inventory is currently empty.</p>
        ) : (
          items.map((item: any) => (
            <div key={item.id} className="bg-surface/60 backdrop-blur-xl p-md rounded-xl border border-surface-container-high flex flex-col justify-between hover:border-primary/50 transition-colors group relative overflow-hidden ambient-glow">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary opacity-[0.03] blur-[50px] rounded-full pointer-events-none group-hover:opacity-[0.08] transition-opacity"></div>
              <div>
                <h3 className="font-headline-md text-primary mb-xs">{item.name}</h3>
                <p className="font-body-md text-on-surface-variant mb-lg">{item.description}</p>
              </div>
              <button 
                onClick={() => handlePurchase(item.id, item.cost)}
                className="w-full bg-[#000000]/40 border border-[#27272A]/50 hover:bg-primary hover:text-black hover:border-primary text-primary font-label-md py-3 rounded-lg transition-colors flex justify-center items-center gap-xs uppercase tracking-widest z-10 relative"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                <span>{item.cost} Coins</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
