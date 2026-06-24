import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useCart();
  const navigate = useNavigate();

  if (!wishlist.length) return (
    <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: '#888' }}>
      <div style={{ fontSize: 60, marginBottom: 12 }}>🤍</div>
      <p style={{ fontSize: 16, marginBottom: 8 }}>Your wishlist is empty</p>
      <button onClick={() => navigate('/')} style={{ background: '#e94560', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Explore products</button>
    </div>
  );

  return (
    <div style={{ padding: '1rem 1.5rem' }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '1rem' }}>Wishlist ({wishlist.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
        {wishlist.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
