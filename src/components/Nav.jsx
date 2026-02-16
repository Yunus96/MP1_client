import { Link } from "react-router-dom";

export default function Nav() {
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
            <input type="text" placeholder="Search" />
          </div>
        </div>

        {/* Right */}
        <div className="nav-right">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/wishlist" className="icon-wrapper">
            ❤️ <span className="badge">0</span>
          </Link>

          <Link to="/cart" className="icon-wrapper cart">
            🛒 <span className="badge">0</span>
            <span className="cart-text">Cart</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
