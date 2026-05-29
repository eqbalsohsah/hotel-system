import { createBrowserRouter, Navigate } from "react-router-dom";
import UserMasterLayout from "../layout/UserMasterLayout/UserMasterLayout";
import NotFound from "../common/components/NotFound";
import UserHome from "../features/User/UserHome/UserHome";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import FavouritesPage from "../pages/FavouritesPage/FavouritesPage";
import Profile from "../features/User/Ui/Profile/Profile";
import BookingDetails from "../features/User/Ui/BookingDetails/BookingDetails";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../features/Auth/Login/Login";
import ForgetPass from "../features/Auth/ForgetPass/ForgetPass";
import ResetPass from "../features/Auth/ResetPass/ResetPass";
import ChangePass from "../features/Auth/ChangePass/ChangePass";
import Register from "../features/Auth/Register/Register";
import MasterLayout from "../layout/MasterLayout/MasterLayout";
import Home from "../features/Admin/Home/Home";
import Users from "../features/Admin/Users/Users";
import Rooms from "../features/Admin/Rooms/Rooms";
import AddNewRoom from "../features/Admin/Rooms/AddNewRoom/AddNewRoom";
import Ads from "../features/Admin/Ads/Ads";
import AddNewAd from "../features/Admin/Ads/AddNewAd/AddNewAd";
import Facilities from "../features/Admin/Facilities/Facilities";
import Bookings from "../features/Admin/Bookings/Bookings";
import ProtectedRoute from "../common/components/ProtectedRoute";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserMasterLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <UserHome /> },
      { path: "home", element: <UserHome /> },
     {element:<ProtectedRoute/>,
      children:[
       { path: "explore", element: <ExplorePage /> },
      { path: "fav", element: <FavouritesPage /> },
      { path: "booking-details/:bookingId", element: <BookingDetails /> },
      { path: "profile", element: <Profile /> },
      ]

     }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <Login /> },
      { path: "forget-password", element: <ForgetPass /> },
      { path: "reset-password", element: <ResetPass /> },
      { path: "change-password", element: <ChangePass /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={['admin']}><MasterLayout/></ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <Home /> },
      { path: "users", element: <Users /> },
      { path: "rooms", element: <Rooms /> },
      { path: "rooms/add-room", element: <AddNewRoom /> },
      { path: "ads", element: <Ads /> },
      { path: "ads/add-ad", element: <AddNewAd /> },
      { path: "facilities", element: <Facilities /> },
      { path: "bookings", element: <Bookings /> },
    ],
  },
]);
