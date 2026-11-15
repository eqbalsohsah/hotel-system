import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type {  IAddRoomForm } from "../../../../interfaces/roomsInterface";
import { FetchFacilitesList } from "../../../../services/facilitesService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AddRoom } from "../../../../services/roomsService";
import { useNavigate } from "react-router-dom";
import { CloudUpload } from "@mui/icons-material";
import { toast } from "react-toastify";

export default function AddNewRoom() {
  const {register,handleSubmit,formState:{errors},control,setValue}=useForm<IAddRoomForm>();
  const navigate=useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

const { mutate: addRoom, isPending } = useMutation({
  mutationFn: AddRoom,

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
   toast.success("Room added successfully");
    navigate("/admin/rooms"); // 👈 الصفحة اللي عايزة تروحيها

  },

  onError: (error:any) => {
    console.log("Error:", error);
    toast.error(error.response?.data.message)
  },
});

  const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = e.target.files;

  if (!files || files.length === 0) return;

  setValue("imgs", Array.from(files));

  const reader = new FileReader();
  reader.onloadend = () => {
    setImage(reader.result as string);
  };
  reader.readAsDataURL(files[0]);
};
  const {data :facilitiesData}=useQuery({
            queryKey:["facilities"],
          queryFn: ()=> FetchFacilitesList(1,100),

          });
console.log(facilitiesData);


  const onSubmit=(data:IAddRoomForm)=>{
    const formData=new FormData();
    formData.append("roomNumber",data.roomNumber);
     formData.append("price",String(data.price));
    formData.append("capacity",String(data.capacity));
     formData.append("discount",String(data.discount));

if (data.facilities?.length) {
  data.facilities.forEach((id) => {
    formData.append("facilities", id);
  });
}

if (data.imgs?.length) {
  data.imgs.forEach((file) => {
    formData.append("imgs", file);
  });
}

    console.log( "roooooooooooooooooooooom",data);
      addRoom(formData);


  }
  return <>
  <Container maxWidth="lg" sx={{mt:4,mb:4}} >
    <Paper
  sx={{

   p:5,
   borderRadius:"16px",
   boxShadow:3
  }}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{xs:12}}>
          <TextField
          fullWidth
          label="Room Number"
          {...register ("roomNumber",{
            required:"roomNumber is required"
          })}
          error={!! errors.roomNumber}
          helperText={errors.roomNumber?.message}
          />
        </Grid>
         <Grid size={{xs:12,md:6}}>
          <TextField
          fullWidth
          label="Price"
          {...register ("price",{
            required:"price is required"
          })}
          error={!! errors.price}
          helperText={errors.price?.message}
          />
        </Grid>
         <Grid size={{xs:12,md:6}}>
          <TextField
          fullWidth
          label="capacity"
          {...register ("capacity",{
            required:"capacity is required"
          })}
          error={!! errors.capacity}
          helperText={errors.capacity?.message}
          />
        </Grid>
         <Grid size={{xs:12,md:6}}>
          <TextField
          fullWidth
          label="discount"
          {...register ("discount",{
            required:"capacity is required"
          })}
          error={!! errors.discount}
          helperText={errors.discount?.message}
          />


        </Grid>
          <Grid size={{xs:12,md:6}}>
      <Controller
       rules={{
    required: "Please select at least two facility",
    validate: (value) =>
      value.length > 0 || "Please select at least one facility",
  }}
  name="facilities"
  control={control}
  defaultValue={[]}
  render={({ field }) => (
    <FormControl fullWidth error={!! errors.facilities}>

      <InputLabel id="facilities-label">Facilities</InputLabel>

      <Select
        labelId="facilities-label"
        id="facilities-select"
        multiple
        value={field.value || []}
        onChange={(e) => field.onChange(e.target.value)}

        label="Facilities"
        MenuProps={{
          disableAutoFocusItem: true,
        }}
      >
        {facilitiesData?.facilities?.map((f: any) => (
          <MenuItem key={f._id} value={f._id}>
            {f.name}
          </MenuItem>
        ))}
      </Select>
<FormHelperText> {errors.facilities?.message}

</FormHelperText>
    </FormControl>
  )}
/>
      </Grid>

<Grid size={{xs:12}}>
     <Box>
      <Button variant="outlined"
      component="label"
      startIcon={<CloudUpload/>}
      sx={{width:"100%",borderStyle:"dashed",backgroundColor:"#f8f9fa",py:3}}

      >
        Upload Room Image
        <input
          hidden
          type="file"
          accept="image/*"
    onChange={handleImageChange}

        />
      </Button>

      {image && (
        <Box >
          <Typography variant="body2">Preview:</Typography>
          <Box
            component="img"
            src={image}
            alt="preview"
            sx={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 2,
              mt: 1,
            }}
          />
        </Box>

      )}
    </Box>
  </Grid>
      </Grid>
   <Box sx={{display:"flex",justifyContent:"flex-end",gap:2 ,mt:2}}>
       <Button variant ="outlined"  size="large"  onClick={()=>navigate("/admin/rooms")}>Cancel</Button>
       <Button variant ="contained" type="submit" size="large" disabled={isPending}>
      {isPending? "saving....":"  Add New Room"}
        </Button>
   </Box>

    </form>

  </Paper>

  </Container>
    </>;
}
