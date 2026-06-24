import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const STATUS_COLOR = { Confirmed: '#2563eb', Shipped: '#d97706', Delivered: '#16a34a', Cancelled: '#dc2626', Pending: '#888' };

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    api.get('/orders/my').then(r => setOrders(r.data)).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading orders...</p>;

  if (!orders.length) return (
    <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: '#888' }}>
      <div style={{ fontSize: 60, marginBottom: 12 }}>📦</div>
      <p style={{ fontSize: 16, marginBottom: 8 }}>No orders yet</p>
      <button onClick={() => navigate('/')} style={{ background: '#e94560', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Start shopping</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem 1.5rem' }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '1rem' }}>Your orders</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {orders.map(o => (
          <div key={o._id} style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 10, padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>#{o._id.slice(-6).toUpperCase()}</span>
              <span style={{ fontSize: 12, color: STATUS_COLOR[o.status] || '#888', fontWeight: 500 }}>{o.status}</span>
            </div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>
              {o.items.map(i => `${i.emoji} ${i.name} ×${i.qty}`).join(' · ')}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#888' }}>{new Date(o.createdAt).toLocaleDateString()}</span>
              <span style={{ fontWeight: 600, color: '#e94560' }}>₹{o.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
