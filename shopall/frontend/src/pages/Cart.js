import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!cart.length) return (
    <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: '#888' }}>
      <div style={{ fontSize: 60, marginBottom: 12 }}>🛒</div>
      <p style={{ fontSize: 16, marginBottom: 8 }}>Your cart is empty</p>
      <button onClick={() => navigate('/')} style={{ background: '#e94560', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Browse products</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem 1.5rem' }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '1rem' }}>Your cart ({cart.length} items)</h2>
      {cart.map(item => (
        <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '0.5px solid #e5e7eb' }}>
          <span style={{ fontSize: 32 }}>{item.emoji}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</p>
            <p style={{ fontSize: 12, color: '#888' }}>₹{item.price.toLocaleString()} each</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => updateQty(item._id, item.qty - 1)} style={{ width: 28, height: 28, border: '1px solid #e5e7eb', borderRadius: 4, background: '#f9fafb', cursor: 'pointer', fontSize: 16 }}>−</button>
            <span style={{ fontSize: 14, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
            <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ width: 28, height: 28, border: '1px solid #e5e7eb', borderRadius: 4, background: '#f9fafb', cursor: 'pointer', fontSize: 16 }}>+</button>
          </div>
          <p style={{ fontSize: 14, fontWeight: 500, minWidth: 70, textAlign: 'right' }}>₹{(item.price * item.qty).toLocaleString()}</p>
          <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: '#e94560', cursor: 'pointer', fontSize: 16 }}>🗑️</button>
        </div>
      ))}
      <div style={{ paddingTop: '1rem', borderTop: '0.5px solid #e5e7eb', marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14 }}><span style={{ color: '#666' }}>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}><span style={{ color: '#666' }}>Shipping</span><span style={{ color: '#16a34a' }}>Free</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: 17, fontWeight: 600 }}><span>Total</span><span>₹{cartTotal.toLocaleString()}</span></div>
        <button onClick={() => navigate('/checkout')} style={{ width: '100%', background: '#e94560', color: '#fff', border: 'none', padding: 12, borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          Proceed to checkout →
        </button>
      </div>
    </div>
  );
}
