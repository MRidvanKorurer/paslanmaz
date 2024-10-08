import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/anasayfa" element={<HomePage />} />
            <Route path="/ürünler" element={<ProductPage />} />
            <Route path="/ürünDetay/:id" element={<ProductDetail />} />
            <Route path="/iletişim" element={<ContactPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
