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
    <Box sx={{position: "absolute",
      top: "20px",
      left: "20px",


      zIndex: 1000,}}>


    <img src={logo} alt="logo" width="120px" />


</Box>
      <Grid container
 sx={{


       flexDirection: {
    xs: "column-reverse",
    md: "row",
  },

     }}  >

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
mt:4,

          }}
        >

         <Box sx={{width:"75%"}} >
           <Outlet />
         </Box>
        </Grid>
       <Grid
  size={{ xs: 12, md: 6 }}
  sx={{
    display: "flex",
    justifyContent: "center",
    pt:3,
    mt:5









  }}
>
  <Box
    component="img"
    src={image}
    sx={{
      display:"block",
      xs:{
        mt:5,
      },

width:{

  xs: "300px",
  md: "420px",
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
