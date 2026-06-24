import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const CATS = ['all', 'fashion', 'electronics', 'food', 'lifestyle'];
const CAT_EMOJI = { all: '🏪', fashion: '👗', electronics: '📱', food: '🥗', lifestyle: '🏠' };

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [priceFilter, setPriceFilter] = useState(100000);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetchProducts();
  }, [category, sort, search]);

  const fetchProducts = async () => {
  setLoading(true);

  try {
    const params = { sort };

    if (category !== 'all') params.category = category;
    if (search) params.search = search;

    const { data } = await api.get('/products', { params });

    console.log("Products API Response:", data);

    if (Array.isArray(data)) {
      setProducts(data);

      if (data.length) {
        setMaxPrice(Math.max(...data.map(p => p.price)));
      }
    } else {
      console.error("Expected array but got:", data);
      setProducts([]);
    }
  } catch (err) {
    console.error(err);
    setProducts([]);
  }

  setLoading(false);
};

const filtered = Array.isArray(products)
  ? products.filter(p => p.price <= priceFilter)
  : [];
  
  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#0f3460 60%,#e94560 100%)', padding: '2.5rem 1.5rem', textAlign: 'center', color: '#fff' }}>
        <p style={{ fontSize: 12, letterSpacing: 2, color: 'rgba(233,69,96,0.8)', marginBottom: 8, textTransform: 'uppercase' }}>New arrivals every week</p>
        <h1 style={{ fontSize: 28, fontWeight: 500, marginBottom: 10, lineHeight: 1.2 }}>Everything you need,<br />one place to find it.</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Fashion • Electronics • Food • Lifestyle</p>
      </div>

      {/* Filters */}
      <div style={{ padding: '1rem 1.5rem 0', overflowX: 'auto', display: 'flex', gap: 8, scrollbarWidth: 'none' }}>
        {CATS.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{ whiteSpace: 'nowrap', padding: '6px 16px', borderRadius: 20, fontSize: 13, border: '1px solid #e5e7eb', background: category === cat ? '#1a1a2e' : '#f9fafb', color: category === cat ? '#fff' : '#374151', cursor: 'pointer', fontWeight: category === cat ? 500 : 400 }}
          >
            {CAT_EMOJI[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#666' }}>Price:</span>
        <input type="range" min="0" max={maxPrice} value={priceFilter} step="100" onChange={e => setPriceFilter(Number(e.target.value))} style={{ flex: 1, minWidth: 100 }} />
        <span style={{ fontSize: 13, fontWeight: 500, minWidth: 80 }}>₹{priceFilter.toLocaleString()}</span>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ fontSize: 13, padding: '4px 8px', borderRadius: 6, border: '1px solid #e5e7eb' }}>
          <option value="default">Newest</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ padding: '0 1rem 2rem' }}>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Loading products...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No products found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {filtered.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
