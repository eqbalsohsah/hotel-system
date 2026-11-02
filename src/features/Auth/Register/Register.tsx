import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {Controller, useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api/axiosInstance";
import type { RegisterPayload, RegisterResponse } from "../../../interfaces/authInerface";
import useTogglePassword from "../../../common/Hooks/useTogglePassword";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HeaderAuth from "../../../common/components/HeaderAuth";

export default function Register() {
    const {register,handleSubmit,formState:{errors,isSubmitting},watch,control}=useForm<RegisterPayload>();
    const navigate=useNavigate();
    const password=watch("password");
    const {showPassword,togglePassword}=useTogglePassword();



    const onSubmit= async(data:RegisterPayload)=>{
      const formData = new FormData();
      formData.append("userName", data.userName);
formData.append("email", data.email);
formData.append("password", data.password);
formData.append("confirmPassword", data.confirmPassword);
formData.append("phoneNumber",String(data.phoneNumber));
formData.append("country", data.country);
formData.append("role", data.role);


  if (data.profileImage?.[0]) {
    formData.append("profileImage", data.profileImage[0]);
  }

// الصورة

      try {
  const response=await axiosInstance.post<RegisterResponse>('/portal/users',formData);
  console.log(response);
  navigate('/auth/login');
  toast.success(response?.data?.message || "")


      } catch (error:any) {
  toast.error(error?.response?.data?.message || "something went wrong")

      }}
  return <Box >
    <HeaderAuth subtitle="sign up" title="If you already have an account register" link="login" page="login "/>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField label ="userName" fullWidth type="text" margin="normal"
    {...register("userName",{
        required:"userName required",

      })}
      error={!!errors?.userName}
      helperText={errors?.userName?.message}
  />
  <Box sx={{display:"flex"}}>
            <TextField label ="phoneNumber" fullWidth type="tel" margin="normal"
            sx={{mr:3}}
    {...register("phoneNumber",{
        required:"phoneNumber required",

      })}
      error={!!errors?.phoneNumber}
      helperText={errors?.phoneNumber?.message}
  />

            <TextField label ="country" fullWidth type="text" margin="normal"
    {...register("country",{
        required:"country required",

      })}
      error={!!errors?.country}
      helperText={errors?.country?.message}
  />
  </Box>
           <TextField label ="Email Address" fullWidth type="email" margin="normal"
    {...register("email",{
        required:"userName required",
            pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email format",
    },

      })}
      error={!!errors?.email}
      helperText={errors?.email?.message}
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
             <Controller
        name="role"
        control={control}
        rules={{ required: "Role is required" }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin="normal" error={!!fieldState.error}>
            <InputLabel>Role</InputLabel>

            <Select
              {...field}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>


  <FormHelperText>
    {fieldState.error?.message}
  </FormHelperText>
          </FormControl>
        )}
      />

<TextField
  type="file"
  fullWidth
  margin="normal"

  {...register("profileImage", {
    required: "Image is required",
  })}
/>


      <Button type="submit" variant="contained" fullWidth sx={{mt:2,py:1.5,borderRadius:1}} disabled={isSubmitting}>
 Sign up
      </Button>

      </Box>
        </Box>;
}
