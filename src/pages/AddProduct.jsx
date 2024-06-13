import React, { useState } from "react";
import { db } from "../config/firebase-config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom"

const AddProduct = ({
  productName,
  setProductName,
  brand,
  setBrand,
  price,
  setPrice,
  category,
  setCategory,
  weight,
  setWeight,
  color,
  setColor,
  isAvailable,
  setIsAvailable,
  id,
}) => {
  const navigate = useNavigate();
  // Get current user information from the custom hook
  const { userEmail, userId, isAuth } = useGetUserInfo();

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "Users", userEmail, "Products"), {
        userId: userId,
        ProductName: productName,
        Brand: brand,
        Price: price,
        Category: category,
        Weight: weight,
        Color: color,
        isAvailable: isAvailable,
      });

      console.log("Data added successfully :)");
    } catch (error) {
      console.log("Error adding to database ", error);
    }
  };

  // For handling updates

  const handleUpdate = async () => {
    try {
      const updateRef = doc(collection(db, "Users", userEmail, "Products"), id);
      await updateDoc(updateRef, {
        userId: userId,
        ProductName: productName,
        Brand: brand,
        Price: price,
        Category: category,
        Weight: weight,
        Color: color,
        isAvailable: isAvailable,
      })
      navigate("/products");
    } catch (error) {
      console.log("An error occurred while updating", error);
    }
  };

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold">
          {id ? "Update product" : "Add a new product"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Your product name"
            />
          </div>

          <div className="w-full">
            <label
              for="brand"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5"
              placeholder="Product brand"
            />
          </div>

          <div className="w-full">
            <label
              for="price"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5"
              placeholder="$2999"
            />
          </div>

          <div>
            <label
              for="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="TV">TV</option>
              <option value="PC">PC</option>
              <option value="Gaming">Gaming</option>
              <option value="Phones">Phones</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              for="item-weight"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Item Weight (kg)
            </label>
            <input
              type="number"
              name="item-weight"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5"
              placeholder="12"
            />
          </div>

          <div>
            <label
              for="color"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Color
            </label>
            <select
              value={color}
              onChange={(event) => setColor(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Silver">Silver</option>
              <option value="Blue">Blue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              for="available"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Available
            </label>
            <select
              value={isAvailable}
              onChange={(event) => setIsAvailable(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          onClick={id ? handleUpdate : handleSubmit}
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          {id ? "Update" : "Add"} product
        </button>
      </div>
    </section>
  );
};

export default AddProduct;
