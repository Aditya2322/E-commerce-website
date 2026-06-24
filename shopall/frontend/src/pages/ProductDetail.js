import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const inWish = product && wishlist.some(w => w._id === product._id);

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data)).catch(() => navigate('/'));
  }, [id]);

  if (!product) return <p style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem 1.5rem' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>
        ← Back
      </button>
      <div style={{ background: '#f3f4f6', borderRadius: 12, padding: '2.5rem', textAlign: 'center', fontSize: 80, marginBottom: '1rem' }}>
        {product.emoji}
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{product.name}</h2>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 8, textTransform: 'capitalize' }}>
        {product.category} · ⭐ {Number(product.rating).toFixed(1)} ({product.numReviews} reviews)
      </p>
      <p style={{ fontSize: 24, fontWeight: 600, color: '#e94560', marginBottom: 8 }}>₹{product.price.toLocaleString()}</p>
      <p style={{ fontSize: 13, color: '#16a34a', marginBottom: '1rem' }}>{product.stock} in stock · Free delivery</p>
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 12, marginBottom: '1rem', fontSize: 13, color: '#555', lineHeight: 1.7 }}>
        {product.description}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => { addToCart(product); toast(`${product.emoji} Added to cart`); navigate('/cart'); }}
          style={{ flex: 1, background: '#e94560', color: '#fff', border: 'none', padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          Add to cart
        </button>
        <button onClick={() => { toggleWishlist(product); toast(inWish ? 'Removed from wishlist' : 'Saved!'); }}
          style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: inWish ? '#e94560' : '#374151', padding: '12px 16px', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
          {inWish ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}
