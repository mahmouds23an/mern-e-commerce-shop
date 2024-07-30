import { useEffect, useState } from "react";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import { FaUsers } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const dataResponse = await fetch("http://localhost:6001/users/all-users", {
      method: "get",
      credentials: "include",
    });
    const result = await dataResponse.json();
    if (result.success) {
      setAllUsers(result.data);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item.email}</td>
                <td className="capitalize">
                  {item.role === "ADMIN" ? (
                    <div className="flex items-center justify-center gap-2">
                      <RiAdminLine />
                      <span>Admin</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 opacity-60">
                      <FaUsers />
                      <span>Regular user</span>
                    </div>
                  )}
                </td>
                <td>{moment(item.createdAt).format("LL")}</td>
                <td>
                  <button>
                    <MdModeEdit
                      onClick={() => {
                        setUpdateUserDetails(item);
                        setOpenUpdateRole(true);
                      }}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
}
