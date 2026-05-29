import { Box } from "@mui/material";

import avatar from "../../assets/images/profile.png"
export default function NavBar() {
  return (
    <>
      <Box sx={{display :"flex",alignItems:"center",justifyContent:"flex-end",gap:2}}>
<span>eqbal</span>
<Box component="img" src={avatar} sx={{width:40,height:40,borderRadius:"50%"}}></Box>
      </Box>
    </>
  )
}
