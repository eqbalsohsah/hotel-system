import { Box, Button, IconButton, InputAdornment, TextField }from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import type { Ilogin, LoginResponse } from "../../../interfaces/authInerface";
import { axiosInstance } from "../../../api/axiosInstance";
import {  toast } from 'react-toastify';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { setLogin } from "../../../redux/slices/authSlice";
import { useAppDispatch} from "../../../redux/store/hook";

import HeaderAuth from "../../../common/components/HeaderAuth";


export default function Login() {
const { register, handleSubmit,formState:{errors} } = useForm<Ilogin>();
//state for togglePassword
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useAppDispatch();

const navigate=useNavigate();
const onSubmit= async(data:Ilogin)=>{
try {

  const response= await axiosInstance.post<LoginResponse>('/portal/users/login',data);
  console.log(response);

  dispatch(
  setLogin({
    user: response.data.data.user,
    token: response.data.data.token,
    role:response.data.data.user.role,
  })
);

const userRole = response.data.data.user.role;
if(userRole === "admin"){
  navigate("/admin/home");
   toast.success(response?.data?.message)
}
else{
  navigate("/")
}


} catch (error:any) {
 toast.error(error?.response?.data?.message);
}

}

  return (
  <Box >
<HeaderAuth subtitle="sign in" title="If you don’t have an account register" link="register" page="Register here"/>
<Box component="form" onSubmit={handleSubmit(onSubmit)} >
  <TextField label ="Email Address" fullWidth type="email" margin="normal"
  {...register("email",{
      required:"email required",
       pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email format",
    },
  }


    )}
    error={!!errors?.email}
    helperText={errors?.email?.message}
/>
   <TextField

      label="Password"
      type={showPassword ? "text" : "password"}
      margin="normal"
      fullWidth
      slotProps={{
        input: {
          endAdornment:(

          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),

        }
      }}
      {...register("password",{
        required:"password is required"
      })}
    />
<Box sx={{my:2,textAlign:"right"}}>
  <Link to="/auth/forget-password" style={{textDecoration:"none",color:"#152C5B",fontSize:"16px"}}>Forget Password ?</Link>
</Box>
<Button  type="submit" variant="contained" fullWidth sx={{my:1,py:1.5}}>Login</Button>

</Box>
  </Box>
  );
}