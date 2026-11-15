import { AppBar, Box, Button, Chip, Container, FormControl, FormHelperText, Grid, InputLabel, LinearProgress, MenuItem, Select, TablePagination, TextField, Typography, useTheme } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { IColumn } from "../../../common/components/CustomTable";
import type { IRoom } from "../../../interfaces/roomsInterface";
import { AddCircleOutlineOutlined,  Delete, Edit, Visibility } from "@mui/icons-material";
import CustomTable from "../../../common/components/CustomTable";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRoom, FetchRoomsList, updateRoom } from "../../../services/roomsService";
import ActionMenu, { type IMenuActions } from "../../../common/components/ActionMenu";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../../../common/components/DeleteConfirmationModal";
import DataModal from "../../../common/components/DataModal";
import { Controller, useForm } from "react-hook-form";

import { FetchFacilitesList } from "../../../services/facilitesService";


export default function Rooms() {
    const theme=useTheme();
    const navigate=useNavigate();
    const queryClient = useQueryClient();
    const [open ,setOpen]=useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const{register,handleSubmit,formState:{errors},reset,control}=useForm<IRoom>();

const [mode, setMode] = useState<"view" | "update">("view");
    const [selectedRoom,setSelectedRoom]=useState<IRoom|null>(null);
  const [searchParams,setSearchParams]=useSearchParams();
  const page=parseInt(searchParams.get("page")|| "0");
  const rowsPerPage=parseInt(searchParams.get("size")|| "5");
  // grt all rooms
    const {data,isLoading,isFetching}=useQuery({
    queryKey:["rooms",page,rowsPerPage],
    queryFn:()=>FetchRoomsList(page+1,rowsPerPage),
    placeholderData:keepPreviousData,
  });
  const roomsData = data as {
    rooms: IRoom[];
    totalCount: number;
  } | undefined;


  // delete room
 const { mutate: performDelete } = useMutation({
  mutationFn: (id: string) => deleteRoom(id),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["rooms"],
    });
    toast.success("room deleted");
    setOpen(false)
  },
  onError:(error:any)=>{
    toast.error(error.response?.data?.message || "error deleting room");
  }
});
//update room
 const { mutate: performUpdate ,isPending} = useMutation({
  mutationFn: ({id,data}:{id:string,data:any}) => updateRoom(id,data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["rooms"],
    });
    toast.success("room updated successfully");
    setModalOpen(false)
  },
  onError:(error:any)=>{
    toast.error(error.response?.data?.message || "error updating room");
  }
});

//open model
//update and view modal
const handleOpenView = (room:IRoom) => {
  setSelectedRoom(room);
  setMode("view");
  setModalOpen(true);


};

const handleOpenUpdate = (room:IRoom) => {
  setSelectedRoom(room);
  setMode("update");
  setModalOpen(true);
};


const handleClose = () => {
  setModalOpen(false);
};
//end update view modal
// handel pagination

const handleChangePage = (
  _event: unknown,
  newPage: number
) => {

  setSearchParams({
    page: newPage.toString(),
    size: rowsPerPage.toString(),
  });

};
const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>
) => {

  setSearchParams({
    page: "0",
    size: event.target.value,
  });

};
const onSubmit = (data: IRoom) => {
  if (!selectedRoom) return;

  const formData = new FormData();

  formData.append("roomNumber", data.roomNumber);
  formData.append("price", String(data.price));
  formData.append("capacity", String(data.capacity));
  formData.append("discount", String(data.discount));

  if (data.facilities?.length) {
    data.facilities.forEach((id: string) => {
      formData.append("facilities", id);
    });
  }

  performUpdate({
    id: selectedRoom._id,
    data: formData,
  });
  console.log("selectedRoom", selectedRoom?._id);
console.log("facilities", data.facilities);
console.log([...formData.entries()]);
};
const getAction=(row:IRoom):IMenuActions[]=>[
  {
    label:"view",
    icon:<Visibility fontSize="small"/>,
    color:theme.palette.primary.main,
    onClick:()=>handleOpenView(row),

  },
   {
    label:"Edit",
    icon:<Edit fontSize="small"/>,
    color:theme.palette.secondary.main,
    onClick:()=>handleOpenUpdate(row),

  },
   {
    label:"Delete",
    icon:<Delete fontSize="small"/>,
    color:theme.palette.error.main,

  onClick:()=>handelOpenModal(row),
  }

]
const { data: facilitiesData } = useQuery({
  queryKey: ["facilities"],
  queryFn: () => FetchFacilitesList(1, 100),
});
// open model
const handelOpenModal=(room:IRoom)=>{
  setSelectedRoom(room);
  setOpen(true);

}
// handel delete

const handelConfirmDelete=()=>{
  if(selectedRoom){
    performDelete(selectedRoom._id)
  }


}
  const columns:IColumn[]=[
        {id:"roomNumber",label:"Room Number"},
        {id:"images",label:"Image",render:(row:IRoom)=>(
          <Box
          component="img"
          src={row.imgs?.[0] || 'placeholder-images-url'}
          alt="Room"
          sx={{width:80,height:50,borderRadius:"8px",objectFit:"cover"}}
          >

          </Box>
        )},
         {id:"price",label:"price ($)"},
          {id:"capacity",label:"Capacity"},
           {id:"facilities",label:"Facilities",render:(row:IRoom)=>(
            <Box sx={{display:"flex",flexWrap:"wrap",gap:0.5}}>
             {row.facilities.map((f)=>(
              <Chip key={f._id} label={f.name} size="small" variant="outlined"/>
             ))}

            </Box>
           )},
           {id:"action",label:"Actions",render:(row:IRoom)=>(
          <ActionMenu itemId={row._id} actions={getAction(row)}/>
           )},

  ]

useEffect(() => {
 if (mode === "update" && selectedRoom) {
   reset({
     roomNumber: selectedRoom.roomNumber,
     price: selectedRoom.price,
     capacity: selectedRoom.capacity,
     facilities: selectedRoom.facilities.map(f=>f._id),
     discount: selectedRoom.discount,

   })
 }
}, [selectedRoom, mode])


  return <>
  <Box>
      <AppBar position="static" sx={{
        backgroundColor:"#fff",
        color:theme.palette.primary.main,
boxShadow:"none",
        borderBottom:`1px solid ${theme.palette.divider}`,

      }}>
       <Box sx={{p:2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
         <Box>
          <Typography variant="h6" sx={{fontWeight:"bold"}}>
            Rooms  Table Details
          </Typography>
           <Typography variant="body2" color="textSecondary">
           You can check all details
          </Typography>
        </Box>
        <Button
        variant="contained"
        startIcon={<AddCircleOutlineOutlined/>}
        sx={{textTransform:"none",borderRadius:"8px"}}
   onClick={() => navigate("/admin/rooms/add-room")}

        >
Add New Room
        </Button>
       </Box>

      </AppBar>
      {isFetching && !isLoading &&(
        <LinearProgress sx={{height:"2px" ,backgroundColor:"transparent"}}/>
      )}
          <Container sx={{mt:4}}>
      <CustomTable
      columns={columns}
   data={roomsData?.rooms || []}
  isloading={isLoading || isFetching}
      />
      {!isLoading && roomsData &&
      <TablePagination
        component="div"

        count={roomsData?.totalCount || 0}

        page={page}

        onPageChange={handleChangePage}

        rowsPerPage={rowsPerPage}

        onRowsPerPageChange={
          handleChangeRowsPerPage
        }

        rowsPerPageOptions={[5,10,25]}
      />}
      </Container>

</Box>

<DeleteConfirmationModal open={open}
title="Delete Modal" onClose={()=>setOpen(false) } onConfirm={handelConfirmDelete}/>

<DataModal
 open={modalOpen}
 onClose={handleClose}
 mode={mode}
 onSave={handleSubmit(onSubmit)}
 isPending={isPending}

 title={
   mode === "view"
   ? "Room Details"
   : "Update Room"
 }
>

{mode === "view" ? (

<Grid container spacing={2} sx={{ alignItems: "center" }}>

  {/* التفاصيل */}
  <Grid size={{ xs: 12, md:  6}}>

  <Box sx={{p:2}}>
      <Typography variant="h5">
      Room {selectedRoom?.roomNumber}
    </Typography>

    <Typography sx={{ mt: 2 }}>
      Price: ${selectedRoom?.price}
    </Typography>

    <Typography sx={{ mt: 2 }}>
      Capacity: {selectedRoom?.capacity}
    </Typography>
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mt: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography >
      Facilities:
    </Typography>
      {selectedRoom?.facilities?.map((f) => (
        <Chip
          key={f._id}
          label={f.name}
        />
      ))}
    </Box>
</Box>


  </Grid>

  {/* الصورة */}
  <Grid size={{ xs: 12, md: 6 }}>

    <Box
      component="img"
      src={selectedRoom?.imgs?.[0]}
      alt="room"
      sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
p:2,
        width: "100%",
        height: 200,
        borderRadius:8,
        objectFit: "cover",

      }}
    />

  </Grid>

</Grid>

) : (

<Box sx={{mt:4}} >
<form  >
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
  required: "Please select at least one facility",
  validate: (value) =>
    Array.isArray(value) &&
    value.length > 0 ||
    "Please select at least one facility",
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
       onChange={(e) =>
 field.onChange(e.target.value as string[])
}

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


      </Grid>
   <Box sx={{display:"flex",justifyContent:"flex-end",gap:2 ,mt:2}}>

       {/* <Button variant ="contained" type="submit" size="large" disabled={isPending}>
      {isPending? "saving....":"  update room"}
        </Button> */}
   </Box>

    </form>
</Box>

)}

</DataModal>

</>
}
