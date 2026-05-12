import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import {ToastContainer} from "react-toastify"

function App() {
  return (
    <>
<ToastContainer />
      <RouterProvider router={routes} />

    </>
  );
}
export default App;
