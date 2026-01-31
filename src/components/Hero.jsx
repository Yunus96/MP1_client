import "bootstrap/dist/css/bootstrap.min.css";

const categories = ["Men", "Women", "Kids", "Electronics", "Home"];

function Hero() {
  return (
    <div className="container my-4">
      {/* Top Categories */}
      <div className="row text-center mb-4">
        {categories.map((cat, index) => (
          <div className="col" key={index}>
            <div className="category-card">
              <img
                src="https://via.placeholder.com/200x140"
                alt={cat}
                className="img-fluid"
              />
              <div className="category-label">{cat}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Section */}
      <div className="banner mb-5"></div>

      {/* New Arrivals */}
      <div className="row g-4">
        {[1, 2].map((item) => (
          <div className="col-md-6" key={item}>
            <div className="arrival-card d-flex align-items-center">
              <div className="arrival-image"></div>
              <div className="arrival-content ms-4">
                <small className="text-uppercase text-muted">
                  New Arrivals
                </small>
                <h5 className="fw-bold mt-2">Summer Collection</h5>
                <p className="mb-0">
                  Check out our best winter collection to stay warm in style
                  this season
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
