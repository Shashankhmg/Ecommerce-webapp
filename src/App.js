import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/register";
import Login from "./components/Login";
import ProductPage from "./components/ProductPage";
import BuyProductPage from "./components/BuyProductPage";
import Details from "./components/Details";
import Errror from "./components/Errror";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<Errror />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/buyproduct" element={<BuyProductPage />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
