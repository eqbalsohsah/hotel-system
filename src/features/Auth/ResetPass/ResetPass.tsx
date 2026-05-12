import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {  type IReset, type ResetResponse } from "../../../interfaces/authInerface";
import {  useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { axiosInstance } from "../../../api/axiosInstance";

import { toast } from "react-toastify";
import useTogglePassword from "../../../common/Hooks/useTogglePassword";
import HeaderAuth from "../../../common/components/HeaderAuth";

export default function ResetPass() {

  const location=useLocation();
  const userEmail=location.state?.email || "";
  const{showPassword,togglePassword}=useTogglePassword();
    const { register, handleSubmit,formState:{errors,isSubmitting},watch } = useForm<IReset>({defaultValues:{email:userEmail,password:"",confirmPassword:"",seed:""}});
    const password=watch("password");
  const onSubmit=async(data:IReset)=>{
try {
  const response=await axiosInstance.post<ResetResponse>(`/portal/users/reset-password`,data);
 console.log(response);
 toast.success(response.data.message)


} catch (error:any) {
  toast.error(error?.response?.data?.message);

}


  }
  return <>
   <Box>
   <HeaderAuth subtitle="forget password" title="If you already have an account register" link="login" page="login here" />
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField label ="Email Address" fullWidth type="email" margin="normal"
  {...register("email",{
      required:"email required",
       pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email format",
    },
    })}
    error={!!errors?.email}
    helperText={errors?.email?.message}
/>
     <TextField label ="otp" fullWidth type="otp" margin="normal"
      {...register("seed",{
        required:"otp required",
      })}
      error={!!errors?.seed}
      helperText={errors?.seed?.message}
    />
     <TextField
      margin="normal"
          label="Password"
             type={showPassword ? "text" : "password"}
          fullWidth
          slotProps={{
            input: {
              endAdornment:(
              <InputAdornment position="end">
                <IconButton

                  edge="end"
                  onClick={togglePassword}
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
       error={!!errors?.password}
      helperText={errors?.password?.message}
        />
          <TextField

          label="confirmPassword"
           type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          slotProps={{
            input: {
              endAdornment:(

              <InputAdornment position="end">
                <IconButton
onClick={togglePassword}
                  edge="end"
                >
                   {showPassword ? <VisibilityOff /> : <Visibility />}

                </IconButton>
              </InputAdornment>
            ),

            }
          }}
            {...register("confirmPassword",{
        required:"password is required",
         validate: (value) =>
      value === password || "Passwords do not match",
      })}

       error={!!errors?.confirmPassword}
      helperText={errors?.confirmPassword?.message}
        />


    <Button  type="submit" variant="contained" fullWidth sx={{my:1,py:1.5,borderRadius:2}} disabled={isSubmitting}>
reset
    </Button>

    </Box>
      </Box>
      </>;
}
