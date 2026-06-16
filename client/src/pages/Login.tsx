import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const url = isRegistering ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegistering ? { email, password, username } : { email, password };
      const res = await axios.post(url, payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || (isRegistering ? 'Registration failed' : 'Login failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 p-md">
      {/* Immersive Auth Card */}
      <div className="bg-surface/60 backdrop-blur-xl p-xl rounded-xl border border-surface-container-high w-full max-w-[480px] ambient-glow animate-slide-up relative overflow-hidden">
        
        {/* Subtle Decorative Gradient */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-lg relative z-10">
          <h1 className="font-display text-[48px] tracking-tighter leading-none text-primary mb-xs">XpeeR</h1>
          <p className="font-mono-sm text-mono-sm text-on-surface-variant uppercase tracking-widest">
            {isRegistering ? 'Join the elite' : 'Initialize session'}
          </p>
        </div>
        
        {error && (
          <div className="mb-md p-sm bg-error-container/20 border border-error/50 rounded-lg text-error text-center font-label-md text-label-md">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-md relative z-10">
          {isRegistering && (
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                className="w-full bg-surface-container-low dark:bg-[#000000]/40 border border-outline-variant dark:border-[#27272A]/50 backdrop-blur-md rounded-lg p-3 font-body-md text-primary placeholder:text-surface-variant transition-colors focus:border-primary/50"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="scholar_01"
                required
              />
            </div>
          )}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              className="w-full bg-surface-container-low dark:bg-[#000000]/40 border border-outline-variant dark:border-[#27272A]/50 backdrop-blur-md rounded-lg p-3 font-body-md text-primary placeholder:text-surface-variant transition-colors focus:border-primary/50"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="neo@matrix.edu"
              required
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              className="w-full bg-surface-container-low dark:bg-[#000000]/40 border border-outline-variant dark:border-[#27272A]/50 backdrop-blur-md rounded-lg p-3 font-body-md text-primary placeholder:text-surface-variant transition-colors focus:border-primary/50"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-surface-dim font-label-md text-label-md py-4 rounded-lg mt-sm hover:opacity-90 transition-opacity active:scale-[0.98] uppercase tracking-widest">
            {isRegistering ? 'Establish Connection' : 'Authenticate'}
          </button>
        </form>

        <div className="mt-lg text-center relative z-10">
          <p className="font-body-md text-on-surface-variant">
            {isRegistering ? 'Access already granted?' : "Don't have credentials?"}{' '}
            <button onClick={() => setIsRegistering(!isRegistering)} className="text-primary hover:text-primary-fixed-dim transition-colors font-label-md border-b border-primary/30 pb-0.5">
              {isRegistering ? 'Sign in' : 'Create profile'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
