/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(
      "http://localhost:6001/users/user-details",
      {
        method: "get",
        credentials: "include",
      }
    );
    const result = await dataResponse.json();
    if (result.success) {
      dispatch(setUserDetails(result.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(
      "http://localhost:6001/carts/count-items",
      {
        method: "get",
        credentials: "include",
      }
    );
    const result = await dataResponse.json();
    setCartProductCount(result?.data?.count);
  };

  useEffect(() => {
    // user details
    fetchUserDetails();
    // cart details
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user details fetch
          cartProductCount, // current user add to cart product count
          fetchUserAddToCart, // count fetch
        }}
      >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-112px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
