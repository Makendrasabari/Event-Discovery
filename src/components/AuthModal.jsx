import React, { useState } from 'react';
import { X, User, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, setUser, addToast } = useApp();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  
  const [loginForm, setLoginForm] = useState({
    email: 'alex.johnson@example.com',
    password: 'password123'
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [error, setError] = useState('');

  if (!authModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in both email and password.');
      return;
    }

    const userName = loginForm.email.split('@')[0].replace('.', ' ');
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    
    setUser({
      name: formattedName || 'Conference Attendee',
      email: loginForm.email,
      phone: '+1 (555) 234-5678',
      role: 'Registered Attendee'
    });

    addToast('success', 'Welcome Back!', `Signed in as ${loginForm.email}`);
    setAuthModalOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setError('Please fill in all required fields.');
      return;
    }

    setUser({
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone || '+1 (555) 987-6543',
      role: 'Registered Attendee'
    });

    addToast('success', 'Account Created!', `Welcome to Stackly, ${registerForm.name}!`);
    setAuthModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setAuthModalOpen(false)}>
      <div className="modal-dialog auth-dialog" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={() => setAuthModalOpen(false)}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="auth-header">
          <img 
            src="/assets/stackly_087.webp" 
            alt="Stackly" 
            className="auth-logo"
          />
          <h3 className="auth-title">
            {tab === 'login' ? 'Welcome to Stackly Events' : 'Join the Global Conference Community'}
          </h3>
          <p className="auth-subtitle">
            {tab === 'login' 
              ? 'Sign in to access your registered workshop passes and bookmarks.' 
              : 'Create your account to unlock instant passes, keynotes & certificates.'}
          </p>

          <div className="auth-tabs">
            <button 
              type="button" 
              className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
              onClick={() => { setTab('login'); setError(''); }}
            >
              Sign In
            </button>
            <button 
              type="button" 
              className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => { setTab('register'); setError(''); }}
            >
              Create Account
            </button>
          </div>
        </div>

        {error && (
          <div className="form-error-banner text-sm mb-3">
            <span>{error}</span>
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form" noValidate>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  value={loginForm.email}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, email: e.target.value });
                    if (error) setError('');
                  }}
                  className={`form-input ${error && !loginForm.email ? 'has-error' : ''}`}
                  placeholder="your.email@domain.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  value={loginForm.password}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, password: e.target.value });
                    if (error) setError('');
                  }}
                  className={`form-input ${error && !loginForm.password ? 'has-error' : ''}`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-2">
              Sign In to Stackly
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form" noValidate>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  value={registerForm.name}
                  onChange={(e) => {
                    setRegisterForm({ ...registerForm, name: e.target.value });
                    if (error) setError('');
                  }}
                  className={`form-input ${error && !registerForm.name ? 'has-error' : ''}`}
                  placeholder="e.g. Jordan Lee"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Work / Personal Email</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  value={registerForm.email}
                  onChange={(e) => {
                    setRegisterForm({ ...registerForm, email: e.target.value });
                    if (error) setError('');
                  }}
                  className={`form-input ${error && !registerForm.email ? 'has-error' : ''}`}
                  placeholder="jordan@company.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  value={registerForm.password}
                  onChange={(e) => {
                    setRegisterForm({ ...registerForm, password: e.target.value });
                    if (error) setError('');
                  }}
                  className={`form-input ${error && !registerForm.password ? 'has-error' : ''}`}
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-2">
              Create Free Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
