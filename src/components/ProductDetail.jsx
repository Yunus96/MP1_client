import "bootstrap/dist/css/bootstrap.min.css";

function ProductDetail() {
  return (
    <div className="container my-4">
      <div className="row">
        {/* LEFT IMAGE */}
        <div className="col-md-4">
          <div className="product-image-box position-relative">
            <span className="wishlist-icon">♡</span>
            <img
              src="https://pngimg.com/uploads/jacket/jacket_PNG8058.png"
              alt="product"
              className="img-fluid"
            />
          </div>

          <button className="btn btn-primary w-100 mt-3">Buy Now</button>
          <button className="btn btn-secondary w-100 mt-2">
            Add to Cart
          </button>
        </div>

        {/* RIGHT DETAILS */}
        <div className="col-md-8">
          <h5>
            Men Premium Jacket Quilted Hooded Winter Jackets for Men & Boys Full
            Sleeve
          </h5>

          {/* Rating */}
          <div className="rating mb-2">
            ⭐⭐⭐⭐☆
            <span className="rating-text ms-2">4.5</span>
          </div>

          {/* Price */}
          <div className="price-section mb-3">
            <span className="price">₹2000</span>
            <span className="old-price ms-2">₹3999</span>
            <span className="discount ms-2">50% off</span>
          </div>

          {/* Quantity */}
          <div className="mb-3">
            <strong>Quantity:</strong>
            <button className="qty-btn ms-2">-</button>
            <span className="qty-number">1</span>
            <button className="qty-btn">+</button>
          </div>

          {/* Size */}
          <div className="mb-4">
            <strong>Size:</strong>
            <div className="d-inline-block ms-3">
              <button className="size-btn">S</button>
              <button className="size-btn active">M</button>
              <button className="size-btn">XL</button>
              <button className="size-btn">XXL</button>
            </div>
          </div>

          {/* Delivery Icons */}
          <div className="delivery-box mb-4">
            <div>
              <span>📦</span>
              <p>10 days Replacement</p>
            </div>
            <div>
              <span>🚚</span>
              <p>Free Delivery</p>
            </div>
            <div>
              <span>🚀</span>
              <p>Express Delivery</p>
            </div>
            <div>
              <span>🔒</span>
              <p>Secure Payment</p>
            </div>
          </div>

          {/* Description */}
          <div className="description">
            <h6>Description:</h6>
            <ul>
              <li>
                STYLISH & FUNCTIONAL: Modern quilted design combining timeless
                style with modern flair.
              </li>
              <li>
                ALL-WEATHER READY: Designed to keep you warm and comfortable.
              </li>
              <li>
                UNPARALLELED COMFORT: Soft lining ensures long-lasting wear.
              </li>
              <li>
                VERSATILE DESIGN: Perfect for casual outings to semi-formal
                events.
              </li>
              <li>
                TRAVEL FRIENDLY: Lightweight and easy to pack.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="mt-5">
        <h6 className="mb-3">More items you may like in apparel</h6>

        <div className="row g-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div className="col-md-3" key={index}>
              <div className="similar-card">
                <span className="wishlist-icon small">♡</span>
                <img
                  src="https://pngimg.com/uploads/jacket/jacket_PNG8058.png"
                  alt="product"
                />
                <p className="mt-2 mb-1">Men Premium Jacket</p>
                <strong>₹2000</strong>
                <button className="btn btn-secondary w-100 mt-2">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
