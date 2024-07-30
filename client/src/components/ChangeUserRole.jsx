import { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";

export default function ChangeUserRole({
  name,
  email,
  role,
  onClose,
  userId,
  callFunc,
}) {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(
      "http://localhost:6001/users/update-user",
      {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: userId, role: userRole }),
      }
    );
    const result = await fetchResponse.json();
    if (result.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User updated successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-zinc-400 bg-opacity-70">
      <div className="w-full max-w-sm p-4 bg-white shadow-md mx-auto">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change user role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex items-center justify-between my-1">
          <div className="flex items-center justify-center">
            <p className="mr-2">Role:</p>
            <select
              className="border px-4 py-1 rounded-lg"
              value={userRole}
              onChange={handleOnChangeSelect}
            >
              {Object.values(ROLE).map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="w-fit mx-auto block px-4 py-1 rounded-lg bg-black text-white"
            onClick={updateUserRole}
          >
            Change role
          </button>
        </div>
      </div>
    </div>
  );
}
