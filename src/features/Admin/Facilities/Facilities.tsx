import { AppBar, Box, Button, Container, LinearProgress, TablePagination, TextField, Typography, useTheme } from "@mui/material";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { IFacility } from "../../../interfaces/roomsInterface";
import { useSearchParams } from "react-router-dom";
import { addFacility, deleteFacility, FetchFacilitesList, updateFacilityApi } from "../../../services/facilitesService";
import { toast } from "react-toastify";
import type { IMenuActions } from "../../../common/components/ActionMenu";
import { AddCircleOutlineOutlined, Delete, Edit, Visibility } from "@mui/icons-material";
import type { IColumn } from "../../../common/components/CustomTable";
import CustomTable from "../../../common/components/CustomTable";
import ActionMenu from "../../../common/components/ActionMenu";
import DeleteConfirmationModal from "../../../common/components/DeleteConfirmationModal";
import DataModal from "../../../common/components/DataModal";
import { useForm } from "react-hook-form";

export default function Facilities() {
   const theme=useTheme();
    const queryClient = useQueryClient();
    const [open ,setOpen]=useState(false);
     const [selectedFacility,setSelectedFacility]=useState<IFacility | null>(null);
     const [searchParams,setSearchParams]=useSearchParams();
       const page=parseInt(searchParams.get("page")|| "0");
       const rowsPerPage=parseInt(searchParams.get("size")|| "5");
       const [modalOpen, setModalOpen] = useState(false);
       const [mode, setMode] = useState<"view" | "update" |"add">("view");
       const {register,handleSubmit,formState:{errors},reset}=useForm();
       const handleClose=()=>{
        setModalOpen(false)
       }
      // Add facility
      const handelAddFacility=()=>{
        setModalOpen(true);
        setMode("add");
        reset({name:""});
      }
       const handelViewFacility=(facility:IFacility)=>{
        setModalOpen(true);
        setMode("view");
        setSelectedFacility(facility)

      }
      const updateFacility=(facility:IFacility)=>{
        setSelectedFacility(facility);
           setModalOpen(true);
        setMode("update");
        reset({name:facility.name});

      }
      const {mutate:perfomAdd,isPending}=useMutation({
        mutationFn:(name:string)=>addFacility(name),
        onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:["facilities"]});
          toast.success("facility added successfully");
        setModalOpen(false)
        },
        onError:(error:any)=>{
toast.error(error.response?.data?.data?.message|| "error adding facility")
        }

      })
      const {mutate:perfomUpdateFacility}=useMutation({
        mutationFn: (data: { id: string; name: string })=> updateFacilityApi(data.id, data.name),
        onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:["facilities"]});
          toast.success("facility updated successfully");
        setModalOpen(false)
        },
        onError:(error:any)=>{
toast.error(error.response?.data?.data?.message|| "error update facility")
        }

      })
      const onSave=(formData:any)=>{
        if(mode==="add"){
          perfomAdd(formData.name);
        }
        else if(mode==="update"&& selectedFacility){

         perfomUpdateFacility({
      id: selectedFacility._id,
      name: formData.name,
    });
        }
      }

      //  pagination function
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
      //  get all facilities
         const {data,isLoading,isFetching}=useQuery({
          queryKey:["facilities",page,rowsPerPage],
          queryFn:()=>FetchFacilitesList(page+1,rowsPerPage),
          placeholderData:keepPreviousData,
        });


        // delete facility
         const { mutate: performDelete } = useMutation({
          mutationFn: (id: string) => deleteFacility(id),
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["facilities"],
            });
            toast.success("facility deleted");
            setOpen(false)
          },
          onError:(error:any)=>{
            toast.error(error.response?.data?.message || "error deleting room");
          }
        });
            const facilitesData = data as {
            facilities: IFacility[];
            totalCount: number;
          } |undefined;
          const getAction=(row:IFacility):IMenuActions[]=>[
            {
              label:"view",
              icon:<Visibility fontSize="small"/>,
              color:theme.palette.primary.main,
              onClick:()=>handelViewFacility(row),

            },
             {
              label:"Edit",
              icon:<Edit fontSize="small"/>,
              color:theme.palette.secondary.main,
              onClick:()=>updateFacility(row),

            },
             {
              label:"Delete",
              icon:<Delete fontSize="small"/>,
              color:theme.palette.error.main,

            onClick:()=>handelOpenModal(row),
            }

          ]
          const columns:IColumn[]=[
                  {id:"name",label:"Name"},
           {id:"createdAt",label:"createdAt",render:(row:IFacility)=>new Date (row.createdAt).toLocaleDateString()},
             {id:"createdBy",label:"createdBy",render:(row:IFacility)=>row.createdBy.userName},
              {id:"action",label:"Actions",render:(row:IFacility)=>(
                       <ActionMenu itemId={row._id} actions={getAction(row)}/>
                        )},

            ]

            // open model
            const handelOpenModal=(facility:IFacility)=>{
              setSelectedFacility(facility);
              setOpen(true);

            }
            // handel delete

            const handelConfirmDelete=()=>{
              if(selectedFacility){
                performDelete(selectedFacility._id)
              }


            }
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
          Facilities Table Details
            </Typography>
             <Typography variant="body2" color="textSecondary">
             You can check all details
            </Typography>
          </Box>
          <Button
          variant="contained"
          startIcon={<AddCircleOutlineOutlined/>}
          sx={{textTransform:"none",borderRadius:"8px"}}
          onClick={handelAddFacility}

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
     data={facilitesData?.facilities || []}
    isloading={isLoading || isFetching}
        />
        {!isLoading && facilitesData &&
        <TablePagination
          component="div"

          count={facilitesData?.totalCount || 0}

          page={page}

          onPageChange={handleChangePage}

          rowsPerPage={rowsPerPage}

          onRowsPerPageChange={
            handleChangeRowsPerPage
          }

          rowsPerPageOptions={[5,10,25]}
        />}
        </Container>

        <DeleteConfirmationModal open={open} title="Delete Modal" onClose={()=>setOpen(false) } onConfirm={handelConfirmDelete}/>

  </Box>
  <DataModal
 open={modalOpen}
 onClose={handleClose}
 mode={mode}
 onSave={handleSubmit(onSave)}
 isPending={isPending}
 title={
  mode === "view"
    ? "Faciltiy Details"
    : mode === "update"
    ? "Update Facility"
    : "Add New Facility"
}
  >
{mode === "add" || mode === "update" ? (
  <TextField
    label="Facility name"
    fullWidth
    sx={{ mt: 3 }}
    {...register("name", {
      required: "facility name required",
    })}
    error={!!errors.name}
 helperText={String(errors.name?.message ?? "")}
  />
) : (
  <Typography sx={{mt:3}}>
    Facility Name:{selectedFacility?.name}
  </Typography>
)}



  </DataModal>

  </>;
}
