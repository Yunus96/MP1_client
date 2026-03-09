import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Nav({ setSearchQuery }) {
  const { cartItems, wishlistItems } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-wrapper">
      <nav className="nav">
        {/* Left */}
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <h2>MyShoppingSite</h2>
          </Link>
        </div>

        {/* Center */}
        <div className="nav-center">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
        </div>

        {/* Right */}
        <div className="nav-right nav-desktop">
          <Link to="/profile">
            <button className="login-btn">Profile</button>
          </Link>

          <Link to="/wishlist" className="icon-wrapper">
            ❤️ <span className="badge">{wishlistItems.length}</span>
          </Link>

          <Link to="/cart" className="icon-wrapper cart">
            🛒 <span className="badge">{cartItems.length}</span>
            <span className="cart-text">Cart</span>
          </Link>
        </div>

               {/* Hamburger - Mobile only */}
        <div className="nav-mobile-icons">
          <Link to="/cart" className="icon-wrapper">
            🛒 <span className="badge">{cartItems.length}</span>
          </Link>
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

            {/* Mobile Search */}
      <div className="nav-mobile-search">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" onClick={() => setMenuOpen(false)}>
          <Link to="/profile" className="mobile-menu-item">👤 Profile</Link>
          <Link to="/wishlist" className="mobile-menu-item">
            ❤️ Wishlist <span className="mobile-badge">{wishlistItems.length}</span>
          </Link>
          <Link to="/cart" className="mobile-menu-item">
            🛒 Cart <span className="mobile-badge">{cartItems.length}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
