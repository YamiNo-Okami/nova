import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/app', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      // Registration successful - redirect to login
      navigate('/login?registered=true', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-app-bg)' }}>
      <div className="w-full max-w-md p-8 rounded-xl" style={{ background: 'var(--color-panel-bg)', border: '1px solid var(--color-border-soft)' }}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold playfair-display mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Nova
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Create your workspace account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', border: '1px solid var(--color-danger)' }}>
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg outline-none transition-all"
              style={{ 
                background: 'var(--color-sidebar-bg)', 
                border: '1px solid var(--color-border-soft)',
                color: 'var(--color-text-primary)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border-soft)'}
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg outline-none transition-all"
              style={{ 
                background: 'var(--color-sidebar-bg)', 
                border: '1px solid var(--color-border-soft)',
                color: 'var(--color-text-primary)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border-soft)'}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 pr-11 rounded-lg outline-none transition-all"
                style={{ 
                  background: 'var(--color-sidebar-bg)', 
                  border: '1px solid var(--color-border-soft)',
                  color: 'var(--color-text-primary)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border-soft)'}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 pr-11 rounded-lg outline-none transition-all"
                style={{ 
                  background: 'var(--color-sidebar-bg)', 
                  border: '1px solid var(--color-border-soft)',
                  color: 'var(--color-text-primary)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border-soft)'}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              background: 'var(--color-accent)',
              color: 'white'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = 'var(--color-accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-accent)')}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium transition-colors"
              style={{ color: 'var(--color-accent)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
