import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import NavBar from "./components/NavBar";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("TV/Monitors");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("Black");
  const [isAvailable, setIsAvailable] = useState("Yes");
  const [id, setId] = useState();
  return (
    <div>
      <Toaster position="top-right" />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route
            path="/addproduct"
            element={
              <AddProduct
                productName={productName}
                setProductName={setProductName}
                brand={brand}
                setBrand={setBrand}
                price={price}
                setPrice={setPrice}
                category={category}
                setCategory={setCategory}
                weight={weight}
                setWeight={setWeight}
                color={color}
                setColor={setColor}
                isAvailable={isAvailable}
                setIsAvailable={setIsAvailable}
                id={id}
              />
            }
            exact
          />
          <Route
            path="/products"
            element={
              <Products
                setProductName={setProductName}
                setBrand={setBrand}
                setPrice={setPrice}
                setCategory={setCategory}
                setWeight={setWeight}
                setColor={setColor}
                setIsAvailable={setIsAvailable}
                setId={setId}
              />
            }
            exact
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
