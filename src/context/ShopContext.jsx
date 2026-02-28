import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const USER_ID = "6989a792d8e13444f432bacd"; // later from auth
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
        //console.log(data)
        // Normalize cart items
        const normalized = (data.data.items || []).map((item) => (
          //console.log(item),
          {
          _id: item._id,
          productId: item.product,
          quantity: item.quantity,
        }));
        //console.log(normalized)
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
    // Optimistic update — add a placeholder so badge count increases instantly
    const previousCart = [...cartItems];
    setCartItems((prev) => [
      ...prev,
      { _id: `temp_${productId}`, productId: { _id: productId }, quantity: 1 },
    ]);

    try {
      const res = await fetch("https://mp-1-server.vercel.app/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          productId,
        }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

      // Re-fetch cart to get fully populated product objects
      const cartRes = await fetch(
        `https://mp-1-server.vercel.app/api/cart/${USER_ID}`
      );
      const cartData = await cartRes.json();

      const normalized = (cartData.data.items || []).map((item) => ({
        _id: item._id,
        productId: item.product,
        quantity: item.quantity,
      }));

      setCartItems(normalized);
    } catch (err) {
      console.error("Add to cart error:", err);
      // Rollback on failure
      setCartItems(previousCart);
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
    const isWishlisted = wishlistItems.some(
      (w) => w.productId === product._id || w._id === product._id
    );

    // Save previous state for rollback
    const previousWishlist = [...wishlistItems];

    // Optimistic update — immediately update count in Nav
    if (isWishlisted) {
      setWishlistItems((prev) =>
        prev.filter((w) => w.productId !== product._id && w._id !== product._id)
      );
    } else {
      setWishlistItems((prev) => [
        ...prev,
        { ...product, _id: product._id, productId: product._id },
      ]);
    }

    try {
      const res = await fetch("https://mp-1-server.vercel.app/api/wishlist", {
        method: isWishlisted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: USER_EMAIL,
          productId: product._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Wishlist toggle failed");
      }

      const data = await res.json();

      // Sync with server response
      const normalized = (data.data.wishlist || []).map((item) => ({
        ...item,
        _id: item._id,
        productId: item._id,
      }));

      setWishlistItems(normalized);
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      // Rollback on failure
      setWishlistItems(previousWishlist);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        /* cart */
        cartItems,
        setCartItems,
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
  console.log(cartItems)
}

export const useShop = () => useContext(ShopContext);