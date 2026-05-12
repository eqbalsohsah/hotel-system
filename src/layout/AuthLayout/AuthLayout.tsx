import { Outlet, useLocation } from "react-router-dom";
import loginImg from "../../assets/images/Auth_Img/login.png";
import resetImg from "../../assets/images/Auth_Img/reset.png";
import registerImg from "../../assets/images/Auth_Img/register.png";
import forgetpassImg from "../../assets/images/Auth_Img/forget.png";
import changepassImg from "../../assets/images/Auth_Img/change.jpeg";
import { Box, Grid } from "@mui/material";
import logo from "../../assets/images/logo.png"


export default function AuthLayout() {
  const location = useLocation();

  const key = location.pathname.replace("/auth", "") as
    | "/login"
    | "/register"
    | "/change-password"
    | "/reset-password"
    | "/forget-password";

  const images: Record<typeof key, string> = {
    "/login": loginImg,
    "/register": registerImg,
    "/change-password": changepassImg,
    "/reset-password": resetImg,
    "/forget-password": forgetpassImg,
  };

  const image = images[key] || loginImg;

  return (
    <>
      <Grid container  spacing={5} sx={{minHeight: "100vh"
     ,}}  >

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
alignItems:"center",



          }}
        >
<Box sx={{position:"absolute",top:20,left:20}}>
  <img src={logo} alt="logo"  width="120px"/>

</Box>
         <Box sx={{width:"75%",height:"80%"}} >
           <Outlet />
         </Box>
        </Grid>
       <Grid
  size={{ xs: 12, md: 6 }}
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    p: 4,
  }}
>
  <Box
    component="img"
    src={image}
    sx={{

width:{
  md:"450px",
  xs:"350px",
},

  height:"auto",


      borderRadius: "20px",

      animation: "float 3s ease-in-out infinite",

      "@keyframes float": {
        "0%": {
          transform: "translateY(0px)",
        },
        "50%": {
          transform: "translateY(-15px)",
        },
        "100%": {
          transform: "translateY(0px)",
        },
      },
    }}
  />
</Grid>
      </Grid>
    </>
  );
}
