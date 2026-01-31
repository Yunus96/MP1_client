import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const products = Array(8).fill({
  title: "Men Premium Jacket",
  price: 2000,
  image:
    "https://pngimg.com/uploads/jacket/jacket_PNG8058.png",
});

function ProductListing() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* FILTERS */}
        <div className="col-md-3 filter-section px-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Filters</h5>
            <span className="clear-text">Clear</span>
          </div>

          {/* Price */}
          <h6>Price</h6>
          <input type="range" className="form-range" />
          <div className="d-flex justify-content-between text-muted mb-4">
            <span>50</span>
            <span>150</span>
            <span>200</span>
          </div>

          {/* Category */}
          <h6>Category</h6>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">Men Clothing</label>
          </div>
          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" defaultChecked />
            <label className="form-check-label">Men Clothing</label>
          </div>

          {/* Rating */}
          <h6>Rating</h6>
          {["4", "3", "2", "1"].map((r, i) => (
            <div className="form-check" key={i}>
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                defaultChecked={r === "4"}
              />
              <label className="form-check-label">
                {r} Stars & above
              </label>
            </div>
          ))}

          {/* Sort */}
          <h6 className="mt-4">Sort by</h6>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              defaultChecked
            />
            <label className="form-check-label">Price - Low to High</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="sort" />
            <label className="form-check-label">Price - High to Low</label>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="col-md-9">
          <h5 className="mb-4">
            Showing All Products{" "}
            <span className="text-muted">( Showing 20 products )</span>
          </h5>

          <div className="row g-4">
            {products.map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="product-card">
                  <div className="image-wrapper">
                    <span
                      className={`wishlist ${
                        index === 0 ? "active" : ""
                      }`}
                    >
                      ♥
                    </span>
                    <img src={item.image} alt="product" />
                  </div>

                  <div className="text-center mt-3">
                    <p className="mb-1">{item.title}</p>
                    <h6 className="fw-bold">₹{item.price}</h6>
                  </div>

                  <button
                    className={`btn w-100 ${
                      index === 0
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                  >
                    {index === 0 ? "Go to Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
