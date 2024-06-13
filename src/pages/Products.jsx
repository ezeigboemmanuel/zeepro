import React, { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Products = ({
  setProductName,
  setBrand,
  setPrice,
  setCategory,
  setWeight,
  setColor,
  setIsAvailable,
  setId,
}) => {
  const navigate = useNavigate();
  const { userEmail, userId, isAuth } = useGetUserInfo(); // user Info
  const [products, setProducts] = useState([]);

  const fetch = async () => {
    const snapshot = await getDocs(
      query(
        collection(db, "Users", userEmail, "Products"),
        where("userId", "==", userId)
      )
    );

    const processedData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(processedData);
    setProducts(processedData);
  };

  useEffect(() => {
    fetch();
  }, []);

  // Edit data
  const editData = (id) => {
    const matchId = products.find((product) => {
      return product.id === id;
    });

    setProductName(matchId.ProductName);
    setBrand(matchId.Brand);
    setPrice(matchId.Price);
    setCategory(matchId.Category);
    setWeight(matchId.Weight);
    setColor(matchId.Color);
    setIsAvailable(matchId.isAvailable);
    setId(matchId.id);

    navigate("/addproduct");
  };

  // Delete data from database
  const deleteData = async (id) => {
    try {
      const delRef = doc(collection(db, "Users", userEmail, "Products"), id);
      await deleteDoc(delRef);

      setTimeout(() => {
        window.location.reload();
      }, "5000");
    } catch (error) {
      console.log("An error occurred while deleting", error);
    }
  };

  //For printing

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <style type="text/css" media="print">
        {
          "\
  @page { size: landscape; }\
"
        }
      </style>
      <div ref={componentRef} className="overflow-x-auto shadow-md mb-20">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Product name</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Color</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Available</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Weight(kg)</th>
              <th className="px-6 py-3 forPrint">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">
                  {product.ProductName}
                </th>
                <td className="px-6 py-4">{product.Brand}</td>
                <td className="px-6 py-4">{product.Color}</td>
                <td className="px-6 py-4">{product.Category}</td>
                <td className="px-6 py-4">{product.isAvailable}</td>
                <td className="px-6 py-4">${product.Price}</td>
                <td className="px-6 py-4">{product.Weight}</td>
                <td className="px-6 py-4 forPrint">
                  <span
                    onClick={() => editData(product.id)}
                    className="text-blue-500 font-medium mr-2 cursor-pointer"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => deleteData(product.id)}
                    className="text-red-500 font-medium cursor-pointer"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handlePrint}
        className="items-center -mt-8 mb-5 ml-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Print
      </button>
    </div>
  );
};

export default Products;
