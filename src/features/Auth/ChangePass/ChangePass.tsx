import { useForm } from "react-hook-form";
import useTogglePassword from "../../../common/Hooks/useTogglePassword";
import { axiosInstance } from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { ChangePassPayload, ChangePassResponse } from "../../../interfaces/authInerface";
import HeaderAuth from "../../../common/components/HeaderAuth";


export default function ChangePass() {
   const{showPassword,togglePassword}=useTogglePassword();
      const { register, handleSubmit,formState:{errors,isSubmitting},watch } = useForm<ChangePassPayload>();
          const password=watch("newPassword");
        const onSubmit=async(data:ChangePassPayload)=>{
      try {
        const response=await axiosInstance.post<ChangePassResponse>(`/portal/users/change-password`,data);
       console.log(response);
       toast.success(response.data.message)


      } catch (error:any) {
        toast.error(error?.response?.data?.message);

      }}
  return (
    <>
<Box component="form" onSubmit={handleSubmit(onSubmit)}>
  <HeaderAuth subtitle="Change password" title="If you already have an account register" link="login" page="login here" />
      <TextField

            label="oldPassword"
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
              {...register("oldPassword",{
          required:"password is required",

        })}

         error={!!errors?.oldPassword}
        helperText={errors?.oldPassword?.message}
          />
    <TextField

            label="newPassword"
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
              {...register("newPassword",{
          required:"password is required",
           validate: (value) =>
        value === password || "Passwords do not match",
        })}

         error={!!errors?.newPassword}
        helperText={errors?.newPassword?.message}
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
              <Button  type="submit" variant="contained" fullWidth sx={{my:1,py:1.5,borderRadius:1}} disabled={isSubmitting}>
          reset
              </Button>

</Box>
    </>
  )
}
