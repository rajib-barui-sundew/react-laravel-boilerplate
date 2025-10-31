import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../backend/store/authStore';

export default function AdminLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password, isAdmin: true });
      navigate('/');
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'Invalid email or password';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
      <div style={{ width: 360, padding: 20, borderRadius: 8, background: '#111827', color: '#e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Admin Login</h1>
        <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Enter admin credentials to continue.</p>

        {error && (
          <div style={{ background: 'rgba(239,68,68,.12)', border: '1px solid #ef4444', color: '#ef4444', padding: 10, borderRadius: 6, fontSize: 12, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #374151', background: '#1f2937', color: '#e5e7eb' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #374151', background: '#1f2937', color: '#e5e7eb' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 6, background: '#3b82f6', color: '#fff', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}