const wishlistItems = [
  {
    id: 1,
    name: "Men Premium Jacket",
    price: 2000,
    image: "https://pngimg.com/uploads/jacket/jacket_PNG8058.png",
  },
  {
    id: 2,
    name: "Women Premium Jacket",
    price: 1800,
    image: "https://pngimg.com/uploads/jacket/jacket_PNG8060.png",
  },
];

function Wishlist() {
  return (
    <div className="container my-5">
      <h4 className="text-center mb-4">My Wishlist</h4>

      <div className="row justify-content-start">
        {wishlistItems.map((item) => (
          <div className="col-md-3 me-4" key={item.id}>
            <div className="wishlist-card">
              <div className="wishlist-image">
                <span className="wishlist-heart">❤</span>
                <img src={item.image} alt={item.name} />
              </div>

              <div className="wishlist-info text-center">
                <p className="mb-1">{item.name}</p>
                <strong>₹{item.price}</strong>
              </div>

              <button className="btn btn-secondary w-100 mt-2">
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
