import { Card, Typography, useTheme } from '@mui/material';
import React from 'react'

 interface ICardProps{
        icon:React.ReactNode;
        label:string;
        value:string | number
    }
export default function StateCard({icon ,label,value}:ICardProps) {

const theme=useTheme();

  return (
    <>

  <Card
  sx={{
background:theme.palette.primary.main,
   color:"#fff",
   borderRadius:3,

   display:"flex",
   flexDirection:"column",
alignItems:"center",
   width:"350px",
   p:3






  }}
>
        {icon}

    <Typography   variant="h6"  > {label}</Typography>
     <Typography  > {Number(value).toLocaleString()}</Typography>

    </Card>

    </>
  )
}
