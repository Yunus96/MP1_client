import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const USER_ID = "user123"; // later from auth

  //Fetch cart from DB on app load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(
          `https://mp-1-server.vercel.app/api/cart/${USER_ID}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await res.json();
        setCartItems(data.data.items || []);
      } catch (err) {
        console.error("Cart fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  //Add to cart (DB + state sync)
  const addToCart = async (productId) => {
    try {
      const res = await fetch("https://mp-1-server.vercel.app/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: USER_ID,
          productId,
        }),
      });

      if (!res.ok) {
        throw new Error("Add to cart failed");
      }
      const data = await res.json();

      //Normalize cart items (productId only)
      const normalizedItems = data.data.cart.items.map((item) => ({
        productId: item.product,
        quantity: item.quantity,
        _id: item._id,
      }));

      // Update state from API response
      setCartItems(normalizedItems);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
