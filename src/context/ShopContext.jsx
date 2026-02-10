import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const USER_ID = "user123"; // later from auth
  const USER_EMAIL = "user123@gmail.com"; // later from auth

  /* -------------------- CART -------------------- */

  // Fetch cart on app load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(
          `https://mp-1-server.vercel.app/api/cart/${USER_ID}`
        );

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();

        // Normalize cart items
        const normalized = (data.data.items || []).map((item) => ({
          _id: item._id,
          productId: item.product,
          quantity: item.quantity,
        }));

        setCartItems(normalized);
      } catch (err) {
        console.error("Cart fetch error:", err);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, []);

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

      if (!res.ok) throw new Error("Add to cart failed");

      const data = await res.json();

      const normalized = data.data.cart.items.map((item) => ({
        _id: item._id,
        productId: item.product,
        quantity: item.quantity,
      }));

      setCartItems(normalized);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  /* -------------------- WISHLIST -------------------- */

  // Fetch wishlist on app load
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `https://mp-1-server.vercel.app/api/wishlist/${USER_EMAIL}`
        );

        if (!res.ok) throw new Error("Failed to fetch wishlist");

        const data = await res.json();

        // Wishlist already returns full product objects
        setWishlistItems(data.data.wishlist || []);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
      } finally {
        setLoadingWishlist(false);
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const isWishlisted = wishlistItems.some((w) => w._id === product._id);

  try {
      const res = await fetch("https://mp-1-server.vercel.app/api/wishlist", {
        method: isWishlisted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: "user123@gmail.com",
          productId: product._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Wishlist toggle failed");
      }

      const data = await res.json();

      //Normalize wishlist items
      const normalizedWishlist = (data.data.wishlist || []).map((item) => ({
        productId: typeof item === "string" ? item : item._id,
      }));
      // Backend returns updated wishlist
      setWishlistItems(
        (data.data.wishlist || []).map((item) => ({
          productId: item._id,
        }))
      );
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        /* cart */
        cartItems,
        addToCart,
        loadingCart,

        /* wishlist */
        wishlistItems,
        setWishlistItems,
        toggleWishlist,
        loadingWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
