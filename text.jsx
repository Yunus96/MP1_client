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
        <div className="nav-right">
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
      </nav>
    </header>
  );
}
