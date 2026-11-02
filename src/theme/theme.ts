import {createTheme} from "@mui/material/styles"
 export const theme=createTheme({
    palette:{
        primary:{
            main:"#e47f2c"
        },
        secondary:{
            main:"#348b38"
        }
    },
    typography:{
        fontFamily:"'Poppins',sans-serif",
        h1:{
            fontWeight:700
        }
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius:"3px"
                }
            }
        }

    }

})