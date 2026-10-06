import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import SareeHome from "@/pages/SareeHome";
import CategoryProducts from "@/pages/CategoryProducts";
import Admin from "@/pages/Admin";
import ScrollToTop from "./components/ScrollToTop";
import CartDrawer from "./components/CartDrawer";
import FloatingCartButton from "./components/FloatingCartButton";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { Toaster } from "@/components/ui/sonner";
import "@/App.css";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <CartDrawer />
            <FloatingCartButton />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sarees" element={<SareeHome />} />
              <Route path="/category/:categoryId" element={<CategoryProducts />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-right" richColors />
        </CartProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
