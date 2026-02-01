

function Cart() {
  return (
    <div className="container my-5">
      <h5 className="text-center mb-4">MY CART (1)</h5>

      <div className="row justify-content-center">
        {/* LEFT: CART ITEM */}
        <div className="col-md-7">
          <div className="cart-item d-flex">
            <div className="cart-image">
              <img
                src="https://pngimg.com/uploads/jacket/jacket_PNG8058.png"
                alt="product"
              />
            </div>

            <div className="cart-details ms-4">
              <h6>Men Premium Jacket</h6>

              <div className="price-row">
                <span className="price">₹2000</span>
                <span className="old-price ms-2">₹3999</span>
              </div>

              <div className="discount">50% off</div>

              <div className="quantity mt-2">
                Quantity :
                <button className="qty-btn ms-2">-</button>
                <span className="qty-number">1</span>
                <button className="qty-btn">+</button>
              </div>

              <button className="btn btn-secondary w-100 mt-3">
                Remove From Cart
              </button>
              <button className="btn btn-outline-secondary w-100 mt-2">
                Move to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: PRICE DETAILS */}
        <div className="col-md-4">
          <div className="price-box">
            <h6>PRICE DETAILS</h6>
            <hr />

            <div className="price-line">
              <span>Price (1 item)</span>
              <span>₹2000</span>
            </div>

            <div className="price-line">
              <span>Discount</span>
              <span className="text-success">- ₹1000</span>
            </div>

            <div className="price-line">
              <span>Delivery Charges</span>
              <span>₹499</span>
            </div>

            <hr />

            <div className="price-line total">
              <span>TOTAL AMOUNT</span>
              <span>₹2499</span>
            </div>

            <p className="save-text mt-2">
              You will save ₹1000 on this order
            </p>

            <button className="btn btn-primary w-100 mt-3">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
