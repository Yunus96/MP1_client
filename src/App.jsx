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
} from "./pages";

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/detail" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:categoryname" element={<ProductListPage />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
