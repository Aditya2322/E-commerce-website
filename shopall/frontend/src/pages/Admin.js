import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'fashion', emoji: '📦', stock: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    loadAll();
  }, [user]);

  const loadAll = async () => {
    const [p, o, u] = await Promise.all([api.get('/products'), api.get('/orders'), api.get('/users')]);
    setProducts(p.data); setOrders(o.data); setUsers(u.data);
  };

  const addProduct = async () => {
    if (!form.name || !form.price) { toast.error('Name and price required'); return; }
    try {
      await api.post('/products', { ...form, price: Number(form.price), stock: Number(form.stock || 10) });
      toast.success('Product added!'); setShowForm(false);
      setForm({ name: '', description: '', price: '', category: 'fashion', emoji: '📦', stock: '' });
      loadAll();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`); toast.success('Deleted'); loadAll();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status }); loadAll();
  };

  const revenue = orders.reduce((s, o) => s + o.totalPrice, 0);

  return (
    <div style={{ padding: '1rem 1.5rem' }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '1rem' }}>Admin dashboard</h2>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginBottom: '1.5rem' }}>
        {[['Products', products.length, '📦'], ['Orders', orders.length, '🛒'], ['Users', users.length, '👥'], ['Revenue', '₹' + revenue.toLocaleString(), '💰']].map(([label, val, icon]) => (
          <div key={label} style={{ background: '#f9fafb', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: 20, marginBottom: 4 }}>{icon}</p>
            <p style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 20, fontWeight: 600 }}>{val}</p>
          </div>
        ))}
      </div>

      {/* Products */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h3 style={{ fontSize: 16, fontWeight: 500 }}>Products</h3>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#e94560', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>+ Add product</button>
      </div>

      {showForm && (
        <div style={{ background: '#f9fafb', borderRadius: 10, padding: '1rem', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input placeholder="Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={{ gridColumn: '1/-1', padding: 8, border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13 }} />
          <input placeholder="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ gridColumn: '1/-1', padding: 8, border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13 }} />
          <input placeholder="Price (₹)" type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13 }} />
          <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13 }}>
            {['fashion', 'electronics', 'food', 'lifestyle'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input placeholder="Emoji (e.g. 👕)" value={form.emoji} onChange={e => setForm(p => ({ ...p, emoji: e.target.value }))} style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13 }} />
          <input placeholder="Stock qty" type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13 }} />
          <div style={{ gridColumn: '1/-1', display: 'flex', gap: 8 }}>
            <button onClick={addProduct} style={{ flex: 1, background: '#1a1a2e', color: '#fff', border: 'none', padding: 8, borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>Add</button>
            <button onClick={() => setShowForm(false)} style={{ border: '1px solid #e5e7eb', background: 'transparent', padding: 8, borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.5rem' }}>
        {products.map(p => (
          <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#f9fafb', borderRadius: 8 }}>
            <span style={{ fontSize: 22 }}>{p.emoji}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</p>
              <p style={{ fontSize: 11, color: '#888', textTransform: 'capitalize' }}>{p.category} · Stock: {p.stock}</p>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>₹{p.price.toLocaleString()}</span>
            <button onClick={() => deleteProduct(p._id)} style={{ background: 'none', border: 'none', color: '#e94560', cursor: 'pointer', fontSize: 16 }}>🗑️</button>
          </div>
        ))}
      </div>

      {/* Orders */}
      <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>Orders</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {orders.length === 0 && <p style={{ fontSize: 13, color: '#888' }}>No orders yet.</p>}
        {orders.map(o => (
          <div key={o._id} style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>#{o._id.slice(-6).toUpperCase()}</span>
            <span style={{ fontSize: 12, color: '#666', flex: 1 }}>{o.user?.name || 'User'}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#e94560' }}>₹{o.totalPrice.toLocaleString()}</span>
            <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)} style={{ fontSize: 12, padding: '3px 6px', borderRadius: 4, border: '1px solid #e5e7eb' }}>
              {['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
