import {  NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Card, CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {  Link, useNavigate } from "react-router-dom";
import { FetchRoomsList } from "../../../../services/roomsService";
import { creatAd } from "../../../../services/adsServices";
import { toast } from "react-toastify";
import type { IAdPayload } from "../../../../interfaces/adsInterface";



export default function AddNewAd() {
  interface IFormInput{
    room:string;
    isActive:string;
    discount:number;
  }
  const navigate=useNavigate();
  const {control,formState:{errors},handleSubmit}=useForm<IFormInput>({defaultValues:{
    room:"",
    isActive:"false",
    discount:0,
  }});


    const {data:roomData, isLoading:isLoadingRoom}=useQuery({
              queryKey:["rooms"],
            queryFn: ()=> FetchRoomsList(1,100),

            });
  const {mutate:perfomCreate,isPending:isCreatingAd}=useMutation({
    mutationFn:(payload:IAdPayload)=>creatAd(payload),
    onSuccess:(response)=>{
      toast.success(response.data.data.message || "creating ad success");
      navigate("/admin/ads");
    },
    onError:(error:any)=>{
      toast.error(error.response?.data.message || "Error creating add")
      console.log(error.response?.data.message );

    }

  })
           const onSubmit=(data:IFormInput)=>{
            const payload:IAdPayload & {discount:number}={
              room:data.room,
              isActive:data.isActive === "true",
              discount:Number(data.discount),
            };
              console.log(payload);
              perfomCreate(payload)

            }
  return<>
<Box sx={{p:3}}>
  <Breadcrumbs separator={<NavigateNext  fontSize="small"/>} sx={{mb:3}}>
<Link to="/admin/ads" style={{ color: "inherit", textDecoration: "none" }}>
  Ads
</Link>
   <Typography>create Ad</Typography>

  </Breadcrumbs>
  <Card sx={{maxWidth:800,mx:"auto",boxShadow:"6",borderRadius:"12px"}}>
    <CardContent sx={{p:4}}>
      <Typography variant="h5" >
        Create New Advertisment
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{mb:4}}>
   please fill the details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
        <FormControl fullWidth error={!!errors.room}>
          <InputLabel id="room-select-label">Room Number</InputLabel>
          <Controller
          name="room"
          control={control}
rules={{required:"Room Number is required"}}
render={({field})=>(
  <Select
  {...field}
  labelId="room-select-label"
  label="Room Number"
>
    {isLoadingRoom ?(
      <MenuItem disabled> loading rooms ........</MenuItem>
    ):(
     roomData?.rooms?.map((room:any)=>
    <MenuItem key={room._id} value={room._id} >
      {room.roomNumber}
    </MenuItem>)
    )}

  </Select>
)}


          >
            </Controller>

    {errors.room && <FormHelperText> {errors.room.message}</FormHelperText>}

        </FormControl>
        <FormControl fullWidth>
          <InputLabel  id="active-select-label">Active</InputLabel>
          <Controller
          name="isActive"
          control={control}
          render={({field})=>(
            <Select labelId="active-select-label" label="Active" {...field}>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          )}
          />



        </FormControl>
        <Controller
        name="discount"
        control={control}
        rules={
          {
             required: "Discount is required",
    min: {
      value: 1,
      message: "Discount must be greater than 0",
    },
          }
        }
        render={({field})=>(
          <TextField
          {...field}
          label="Discount"
          type="number"
          fullWidth

          error={!!errors.discount}
          helperText={errors.discount?.message}
          />



        )}
        />
        </Stack>
        <Stack direction="row" spacing={2}  sx={{mt:2}}>
          <Button
          variant="outlined"
          color="inherit"
          onClick={()=>navigate("/admin/ads")}

          >
Canceld
          </Button>
                  <Button
          variant="contained"
          color="inherit"
        type="submit"

          >
{isCreatingAd ? "saving ..." :"Add"}
          </Button>

        </Stack>



      </form>

    </CardContent>

  </Card>

</Box>


    </>


}
