import { AccountBalance, Api, CalendarMonth, CardGiftcard, GridView, Key, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Logout, PeopleAlt } from '@mui/icons-material';
import { Box, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation} from 'react-router-dom';
export default function SideBar() {
  const [isCollapsed,setIsCollapsed]=useState(false);
  const handleToggle=()=>{
    setIsCollapsed(! isCollapsed);
  }
  const location=useLocation();
  const theme=useTheme();

  return <>
<Box sx={{
height:"100vh",
display:"flex",
  "& .ps-sidebar-container":{
    backgroundColor:`${theme.palette.primary.main}`,
    color:"#fff",
    overflow:"hidden",
  },
  "& .ps-menu-button:hover":{

    backgroundColor:"rgba(255,255,255,0.1) !important"
  },
  "& .ps-active":{
    backgroundColor:"rgba(223,207,207,0.2) !important"
  },


}}>
  <Sidebar collapsed={isCollapsed} transitionDuration={500}




  >
    <Box sx={{ p:2, textAlign: isCollapsed? "center":"right"}}>
      <IconButton onClick= {handleToggle} sx={{color:"#fff"}}>
        {isCollapsed ?(
          <KeyboardDoubleArrowRight/>
        ):<KeyboardDoubleArrowLeft/>}

      </IconButton>
    </Box>
  <Menu

  >
    <MenuItem
    component={<Link to="/admin/home" />}
     icon={<AccountBalance/>}
     active={location.pathname.includes("home")}
    >
    Home
    </MenuItem>
    <MenuItem component={<Link to="/admin/users" />} icon ={<PeopleAlt/>}> Users</MenuItem>
    <MenuItem component={<Link to="/admin/rooms" />} icon={<GridView/>}> Rooms</MenuItem>
      <MenuItem component={<Link to="/admin/ads" />} icon={<CardGiftcard/>}> Ads</MenuItem>
        <MenuItem component={<Link to="bookings" />} icon={<Api/>}>Booking</MenuItem>
          <MenuItem component={<Link to="/admin/facilities" />} icon ={<CalendarMonth/>}> Facilites</MenuItem>
            <MenuItem component={<Link to="/auth/change-password" />} icon={<Key/>}> ChangePassword</MenuItem>
              <MenuItem component={<Link to="/" />} icon ={<Logout/>}> LogOut</MenuItem>
  </Menu>
</Sidebar>
</Box>

  </>;
}
