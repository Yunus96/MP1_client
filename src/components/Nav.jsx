
export default function Nav() {
  return (
    <header className="nav-wrapper">
      <nav className="nav">
        {/* Left */}
        <div className="nav-left">
          <h2>MyShoppingSite</h2>
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
          <button className="login-btn">Login</button>

          <div className="icon-wrapper">
            ❤️ <span className="badge">0</span>
          </div>

          <div className="icon-wrapper cart">
            🛒 <span className="badge">0</span>
            <span className="cart-text">Cart</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
