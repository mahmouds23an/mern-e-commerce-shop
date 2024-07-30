// import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setUserDetails } from "../store/userSlice";
import { FaUserCheck } from "react-icons/fa";
import { useContext, useState } from "react";
import ROLE from "../common/role"; 
import Context from "../context";

export default function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1]);

  const handleLogout = async () => {
    const fetchData = await fetch("http://localhost:6001/users/logout", {
      method: "get",
      credentials: "include",
    });
    const result = await fetchData.json();
    if (result.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch(setUserDetails(null));
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        {/* logo */}
        <div>
          <Link to="/" className="">
            <p>Logo</p>
          </Link>
        </div>
        {/* search dev */}
        <div className="hidden md:flex pl-2 items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow focus-within:border-black">
          <input
            className="w-full outline-none ml-2"
            type="text"
            placeholder="Search here...."
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] bg-gray-200 h-8 flex items-center justify-center rounded-r-full text-black cursor-pointer">
            <GrSearch />
          </div>
        </div>
        {/* user icon and card */}
        <div className="flex items-center gap-7">
          {/* user icon and options */}
          <div className="relative flex justify-center">
            {/* user icon */}
            <div
              className="text-3xl cursor-pointer flex justify-center items-center gap-2"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?._id ? <FaUserCheck /> : ""}
              {user?.name ? (
                <span className="text-sm">|| {user.name}</span>
              ) : (
                ""
              )}
            </div>
            {/* options */}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-3 shadow-lg rounded">
                <nav className="flex flex-col items-center">
                  {user.role === ROLE.ADMIN && (
                    <Link
                      onClick={() => setMenuDisplay((prev) => !prev)}
                      to="admin-panel/all-products"
                      className="whitespace-nowrap text-sm text-slate-400 hover:text-black"
                      // md:block hidden
                    >
                      Admin panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {/* cart icon */}
          {user?._id && (
            <Link to="/cart-items" className="text-2xl cursor-pointer relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-3 -right-3">
                <p className="text-sm"> {context?.cartProductCount} </p>
              </div>
            </Link>
          )}

          {/* login btn */}
          <div>
            {user?._id ? (
              <Link
                to="/"
                onClick={handleLogout}
                className="px-3 bg-black py-1 rounded-full text-white hover:opacity-70 font-semibold"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 bg-black py-1 rounded-full text-white hover:opacity-70 font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
