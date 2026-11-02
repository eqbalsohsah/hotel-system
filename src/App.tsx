import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import {ToastContainer} from "react-toastify"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";

function App() {
  return (
    <>
<ThemeProvider  theme={theme}>
  <CssBaseline/>
  <ToastContainer />
    <RouterProvider router={routes} />
</ThemeProvider>

    </>
  );
}
export default App;
