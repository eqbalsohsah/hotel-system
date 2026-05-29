import { Box } from "@mui/material";
import SideBar from "../../features/Admin/SideBar/SideBar";
import NavBar from "../../common/components/NavBar";
import { Outlet } from "react-router-dom";



export default function MasterLayout() {
  return (
    <>
    <Box sx={{
        display: "flex",
        height:"100vh",
        width:"100vw",
        overflow:"hidden"
      }}>
      {/* left side */}
      <Box component ="aside"  sx={{height:"100vh",

        flexShrink:0}}>
        <SideBar/>
      </Box>
      {/* right side */}
      <Box
  component="main"
sx={{display:"flex",
  flexDirection:"column",
  flexGrow:1,
overflow:"hidden",
height:"100vh"
}}
      >
         <Box sx={{
          height:"64px",
display :"flex",alignItems:"center",justifyContent:"flex-end",gap:2,

          px:3,
          borderBottom:"1px solid #ddd",
          flexShrink:0,
         }}>
           <NavBar/>
         </Box>
         <Box sx={{
          p:{xs:2,md:4},
          flexGrow:1,
          overflowY:"auto",
          overflowX:"hidden"
         }}>
           <Outlet/>
         </Box>



      </Box>

    </Box>


    </>
  );
}
