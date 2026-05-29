import {createTheme} from "@mui/material/styles"
 export const theme=createTheme({
    palette:{
        primary:{
            main:"#e42c9d"
        },
        secondary:{
            main:"#8b345d"
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