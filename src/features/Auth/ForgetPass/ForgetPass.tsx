import { Box, Button, TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { ForgetResponse, IForget } from "../../../interfaces/authInerface";
import { axiosInstance } from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import HeaderAuth from "../../../common/components/HeaderAuth";

export default function ForgetPass() {
  const {register,handleSubmit,formState:{errors}}=useForm<IForget>();
  const navigate=useNavigate();
  const onSubmit= async(data:IForget)=>{
    try {
const response=await axiosInstance.post<ForgetResponse>('/portal/users/forgot-password',data);
console.log(response);
navigate('/auth/reset-password',{state:{email:data.email}})
toast.success(response?.data?.message || "")


    } catch (error:any) {
toast.error(error?.response?.data?.message || "something went wrong")

    }
  }
  return <>
    <Box >
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

  <Button  type="submit" variant="contained" fullWidth sx={{my:1,py:1.5,borderRadius:2}}>Send Email</Button>

  </Box>
    </Box>

    </>;
}
