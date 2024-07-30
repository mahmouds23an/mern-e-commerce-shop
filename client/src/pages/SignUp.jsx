import { Link, useNavigate } from "react-router-dom";
import registerIcon from "../assest/register.jpg";
import { useState } from "react";
import imageTobase64 from "../helpers/imageTobase64";
import Swal from "sweetalert2";

export default function Login() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch("http://localhost:6001/users/register", {
        method: "post",
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
          title: "User created successfully",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/login");
        // console.log(result);
      } else {
        Swal.fire({
          title:
            "It might be you use an existing email or something else wrong",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title:
          "Passwords do not match. Please try again",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <section className="" id="signup">
      <div className="mx-auto container p-4">
        {/* signup card */}
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-2xl">
          {/* signup icon */}
          <div className="w-20 h-20 mx-auto">
            <img src={registerIcon} alt="login icon" />
          </div>
          <p className="flex items-center justify-center font-semibold mt-2">
            Create your own account
          </p>
          {/* signup form */}
          <form className="pt-6 m-3" onSubmit={handleSubmit}>
            {/* username div */}
            <div className=" gap-1 mb-3">
              <label className="ml-2">Username</label>
              <div className="bg-zinc-100 p-2 rounded-2xl border hover:border-black">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  name="name"
                  required
                  value={data.name}
                />
              </div>
            </div>
            {/* email div */}
            <div className=" gap-1 mb-3">
              <label className="ml-2">Email</label>
              <div className="bg-zinc-100 p-2 rounded-2xl border hover:border-black">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  name="email"
                  required
                  value={data.email}
                />
              </div>
            </div>
            {/* password div */}
            <div className="gap-1 mb-3">
              <label className="ml-2">Password</label>
              <div className="bg-zinc-100 p-2 rounded-2xl border hover:border-black">
                <input
                  type="password"
                  placeholder="Your Password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  name="password"
                  required
                  value={data.password}
                />
              </div>
            </div>
            {/* confirm password div */}
            <div className="gap-1">
              <label className="ml-2">Confirm password</label>
              <div className="bg-zinc-100 p-2 rounded-2xl border hover:border-black mb-3">
                <input
                  type="password"
                  placeholder="Rewrite your Password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  name="confirmPassword"
                  required
                  value={data.confirmPassword}
                />
              </div>
            </div>
            {/* upload profile pic */}
            <label className="form-control w-full">
              <div className="label">
                <span className="ml-2">Upload your profile picture</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleUploadPic}
              />
            </label>
            {/* signup btn */}
            <button className="px-3 bg-black py-1 rounded-full text-neutral-content w-full mx-auto block max-w-[100px] hover:opacity-70 font-semibold mt-5">
              Sign up
            </button>
          </form>
          <p className="text-xs text-gray-400 ml-3 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:text-black cursor-pointer text-gray-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
