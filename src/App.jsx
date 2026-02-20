import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShopProvider } from "./context/ShopContext";

import "./App.css";

import Nav from "./components/Nav";
import {
  HomePage,
  CartPage,
  ProductDetailPage,
  ProductListPage,
  WishlistPage,
  CheckoutPage,
  ProfilePage
} from "./pages";


function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ShopProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} />
        <Nav setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage searchQuery={searchQuery} />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:categoryname" element={<ProductListPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
