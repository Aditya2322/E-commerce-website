import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Auth() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handle = async () => {
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(form.email, form.password);
        toast.success('Welcome back!');
      } else {
        await register(form.name, form.email, form.password);
        toast.success('Account created!');
      }
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '0 1.5rem' }}>
      <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 12, padding: '1.5rem' }}>
        <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', marginBottom: '1.5rem' }}>
          {['login', 'signup'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, padding: 9, border: 'none', background: tab === t ? '#1a1a2e' : '#f9fafb', color: tab === t ? '#fff' : '#374151', fontSize: 13, fontWeight: tab === t ? 500 : 400, cursor: 'pointer' }}>
              {t === 'login' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tab === 'signup' && <input placeholder="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={{ padding: 10, border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14 }} />}
          <input placeholder="Email address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={{ padding: 10, border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14 }} />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handle()} style={{ padding: 10, border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14 }} />
          <button onClick={handle} disabled={loading} style={{ background: '#e94560', color: '#fff', border: 'none', padding: 10, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign in' : 'Create account'}
          </button>
          <p style={{ fontSize: 12, color: '#888', textAlign: 'center' }}>Demo admin: admin@shop.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
