import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer">

        {/* Brand */}
        <div className="footer-brand">
          <h2>MyShoppingSite</h2>
          <p className="text-muted">Your one-stop destination for everything you need.</p>
        </div>

        {/* Categories */}
        <div className="footer-links">
          <h6>Categories</h6>
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/category/fashion">Fashion</Link>
          <Link to="/category/home & kitchen">Home & Kitchen</Link>
          <Link to="/category/fitness">Fitness</Link>
          <Link to="/category/books">Books</Link>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h6>Quick Links</h6>
          <Link to="/">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h6>Contact</h6>
          <p className="text-muted">📧 support@MyshoppingSite.com</p>
          <p className="text-muted">📞 +91 98765 43210</p>
          <p className="text-muted">📍 Bengaluru, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="text-muted">© {new Date().getFullYear()} ShopZone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
