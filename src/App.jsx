import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter>
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
  );
}

export default App;
