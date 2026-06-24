import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount, wishlist } = useCart();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/?search=${search}`);
  };

  return (
    <nav style={{ background: '#1a1a2e', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', height: 54, position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" style={{ color: '#fff', fontSize: 18, fontWeight: 500, textDecoration: 'none', flexShrink: 0 }}>ShopAll</Link>

      <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '0 10px', gap: 6 }}>
        <span style={{ color: '#aaa', fontSize: 16 }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 14, width: '100%', outline: 'none' }}
        />
      </form>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link to="/wishlist" style={{ color: '#fff', textDecoration: 'none', position: 'relative', padding: '6px 8px' }}>
          🤍 {wishlist.length > 0 && <span style={{ position: 'absolute', top: 0, right: 0, background: '#e94560', color: '#fff', fontSize: 9, borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wishlist.length}</span>}
        </Link>
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', position: 'relative', padding: '6px 8px' }}>
          🛒 {cartCount > 0 && <span style={{ position: 'absolute', top: 0, right: 0, background: '#e94560', color: '#fff', fontSize: 9, borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
        </Link>
        {user ? (
          <>
            <Link to="/orders" style={{ color: '#fff', fontSize: 13, textDecoration: 'none' }}>Hi, {user.name}</Link>
            {user.role === 'admin' && <Link to="/admin" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 12, padding: '5px 10px', borderRadius: 6, textDecoration: 'none' }}>Admin</Link>}
            <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: 12, padding: '5px 10px', borderRadius: 6, cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/auth" style={{ background: '#e94560', color: '#fff', fontSize: 13, padding: '6px 14px', borderRadius: 6, textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
        )}
      </div>
    </nav>
  );
}
