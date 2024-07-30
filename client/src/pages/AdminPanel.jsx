/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ROLE from "../common/role";

export default function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-113px)] rounded md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl flex justify-center items-center gap-2">
            {user?._id ? <FaUserCheck /> : <FaRegCircleUser />}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-xs text-slate-400">{user?.email}</p>
          {user?.role === "ADMIN" ? (
            <p className="text-xs bg-blue-600 text-white rounded-lg mt-2 p-1.5 capitalize">
              {user?.role.toLowerCase()}
            </p>
          ) : (
            ""
          )}
        </div>
        {/* navigation */}
        <div>
          <nav className="grid p-3 gap-2">
            <Link
              to="all-products"
              className={`px-2 py-1 text-black hover:text-white hover:bg-black border rounded-lg ${
                location.pathname === "/admin-panel/all-products"
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              All products
            </Link>
            <Link
              to="all-users"
              className={`px-2 py-1 text-black hover:text-white hover:bg-black border rounded-lg ${
                location.pathname === "/admin-panel/all-users"
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              All users
            </Link>
            <Link
              to="all-users"
              className={`px-2 py-1 text-black hover:text-white hover:bg-black border rounded-lg ${
                location.pathname === "/admin-panel/all-users"
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              Manage orders
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
}
