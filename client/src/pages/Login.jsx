import { Link, useNavigate } from "react-router-dom";
import loginIcon from "../assest/signin.jpg";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import Context from "../context";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch("http://localhost:6001/users/login", {
      method: "post",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await dataResponse.json();
    if (result.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged in successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    } else {
      Swal.fire({
        title: "Wrong email or password",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <section className="" id="login">
      <div className="mx-auto container p-4">
        {/* Login card */}
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-2xl">
          {/* login icon */}
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" />
            <p className="flex items-center justify-center font-semibold -mt-2">
              Login
            </p>
          </div>
          {/* login form */}
          <form className="pt-6 m-3" onSubmit={handleSubmit}>
            {/* email div */}
            <div className="grid gap-1 mb-3">
              <label className="ml-2">Email</label>
              <div className="bg-zinc-100 p-2 rounded-2xl border hover:border-black">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  name="email"
                  value={data.email}
                />
              </div>
            </div>
            {/* password div */}
            <div className="grid gap-1">
              <label className="ml-2">Password</label>
              <div className="bg-zinc-100 p-2 rounded-2xl border hover:border-black">
                <input
                  type="password"
                  placeholder="Your Password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  name="password"
                  value={data.password}
                />
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto cursor-pointer text-xs text-gray-400 hover:text-black"
              >
                Forgot password?
              </Link>
            </div>
            {/* login btn */}
            <button className="px-3 bg-black py-1 rounded-full text-neutral-content w-full mx-auto block max-w-[180px] hover:opacity-70 font-semibold mt-5">
              Go to your account
            </button>
          </form>
          <p className="text-xs text-gray-400 ml-3 mt-5">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="hover:text-black cursor-pointer text-gray-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
