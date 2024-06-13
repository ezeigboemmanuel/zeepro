import React from "react";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import toast from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userId: results.user.uid,
      userEmail: results.user.email,
      name: results.user.displayName,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    toast.success("Signed in successfully");
    navigate("/addproduct");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.log(error, "An error occured while signing out");
    }
  };


  return (
    <header className="w-full">
      <nav className="b g-white border-b border-gray-600 py-6">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="/">LOGO</a>

          {isAuth && (
            <div className="space-x-5">
              <a href="/addproduct" className="font-medium hover:text-blue-600">
                Add Product
              </a>
              <a href="/products" className="font-medium hover:text-blue-600">
                Products
              </a>
            </div>
          )}

          <div>
            <button
              onClick={isAuth ? signUserOut : signInWithGoogle}
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2 font-medium text-sm"
            >
              Sign {isAuth ? "Out" : "In"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
