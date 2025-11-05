import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../../admin/store/authStore';
import type { AuthState } from '../../../admin/store/authStore';
import ThemeTogglerTwo from '../../../admin/components/common/ThemeTogglerTwo';

export default function UserLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state: AuthState) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-96 p-5 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg">
        <h1 className="text-xl font-semibold mb-3">Admin Login</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Enter admin credentials to continue.</p>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400 border border-red-500 rounded-lg mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 py-2 rounded-md bg-blue-600 text-white font-semibold cursor-pointer disabled:cursor-not-allowed hover:bg-blue-700"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
      <div className="fixed bottom-6 right-6">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
