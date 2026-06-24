import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', address: '', pincode: '' });
  const [payment, setPayment] = useState('UPI');
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!cart.length && !done) { navigate('/cart'); return null; }

  const placeOrder = async () => {
    if (!form.name || !form.address || !form.pincode) { toast.error('Fill all fields'); return; }
    if (!user) { toast.error('Please sign in first'); navigate('/auth'); return; }
    setLoading(true);
    try {
      const { data } = await api.post('/orders', {
        items: cart.map(i => ({ product: i._id, name: i.name, emoji: i.emoji, price: i.price, qty: i.qty })),
        shippingAddress: { name: form.name, address: form.address, pincode: form.pincode },
        paymentMethod: payment,
        totalPrice: cartTotal
      });
      clearCart();
      setDone(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    }
    setLoading(false);
  };

  if (done) return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '2.5rem' }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Order placed!</h2>
        <p style={{ fontSize: 14, color: '#666', marginBottom: '1.5rem' }}>Order #{done._id.slice(-6).toUpperCase()} is confirmed.</p>
        <button onClick={() => navigate('/')} style={{ background: '#e94560', color: '#fff', border: 'none', padding: '10px 28px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Continue shopping</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '1rem 1.5rem' }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '1rem' }}>Checkout</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1rem' }}>
        {['name', 'email', 'address', 'pincode'].map(field => (
          <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={form[field]}
            onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
            style={{ padding: 10, border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14 }} />
        ))}
      </div>
      <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Payment method</p>
      <div style={{ display: 'flex', gap: 10, marginBottom: '1rem' }}>
        {['UPI', 'Card', 'COD'].map(m => (
          <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
            <input type="radio" name="pay" checked={payment === m} onChange={() => setPayment(m)} /> {m}
          </label>
        ))}
      </div>
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 12, marginBottom: '1rem', fontSize: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ color: '#666' }}>Total</span><span style={{ fontWeight: 600 }}>₹{cartTotal.toLocaleString()}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>Shipping</span><span style={{ color: '#16a34a' }}>Free</span></div>
      </div>
      <button onClick={placeOrder} disabled={loading}
        style={{ width: '100%', background: '#e94560', color: '#fff', border: 'none', padding: 12, borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Placing order...' : 'Place order'}
      </button>
    </div>
  );
}
