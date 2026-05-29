import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function HeaderAuth({subtitle,title,link,page}:any) {
  return (
    <>
       <Box sx={{mt:5}}>
            <Typography variant="h4" sx={{mb:2}} >{subtitle}</Typography>
            <Typography variant="body1" sx={{lineHeight:1.8,mb:2}}>{title}<br/>You can <Link  to={`/auth/${link}`}style={{color:"#EB5148",textDecoration:"none",fontWeight:"bold"}} > {page}! </Link> </Typography>
            </Box>
    </>
  )
}
