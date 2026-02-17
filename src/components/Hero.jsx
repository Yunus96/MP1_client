import { useNavigate } from "react-router-dom";

const categories = ["Fashion", "Fitness", "Books", "Electronics", "Home & Kitchen"];

const categoryImages = {
  Fashion: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
  Fitness: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400",
  Books: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400",
  Electronics:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
  "Home & Kitchen": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400",
};

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      {/* Top Categories */}
      <div className="row text-center mb-4">
        {categories.map((cat) => (
          <div className="col" key={cat}>
            <div
              className="category-card"
              onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
            >
              <img src={categoryImages[cat]} alt={cat} className="img-fluid" />
              <div className="category-label">{cat}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Section */}
      <div
        className="banner mb-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')",
        }}
      ></div>

      {/* New Arrivals */}
      <div className="row g-4">
        {[1, 2].map((item) => (
          <div className="col-md-6" key={item}>
            <div className="arrival-card d-flex align-items-center">
              <div className="arrival-image">
                <img
                  src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=300"
                  alt="arrival"
                />
              </div>

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
