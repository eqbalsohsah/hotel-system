import { Outlet } from "react-router-dom";

import UserNavBar from "../../features/User/UserHome/components/UserNavBar";



export default function UserMasterLayout() {
  return (
    <>

  <UserNavBar/>
      <Outlet />

    </>
  );
}
