import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const inWish = wishlist.some(w => w._id === product._id);

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s', boxShadow: 'none' }}
      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseOut={e => e.currentTarget.style.transform = ''}
    >
      <div style={{ background: '#f3f4f6', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, position: 'relative' }}>
        {product.emoji}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product); toast(inWish ? 'Removed from wishlist' : 'Saved to wishlist'); }}
          style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: inWish ? '#e94560' : '#888' }}
          aria-label="Toggle wishlist"
        >
          {inWish ? '❤️' : '🤍'}
        </button>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2, lineHeight: 1.3, color: '#111' }}>{product.name}</p>
        <p style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>⭐ {Number(product.rating).toFixed(1)} · {product.numReviews} reviews</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#e94560' }}>₹{product.price.toLocaleString()}</span>
          <button
            onClick={e => { e.stopPropagation(); addToCart(product); toast(`${product.emoji} Added to cart`); }}
            style={{ background: '#1a1a2e', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 500 }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
