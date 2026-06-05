import { AppBar, Box, Button, Container, LinearProgress, TablePagination, Typography, useTheme } from "@mui/material";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { IFacility } from "../../../interfaces/roomsInterface";
import { useSearchParams } from "react-router-dom";
import { deleteFacility, FetchFacilitesList } from "../../../services/facilitesService";
import { toast } from "react-toastify";
import type { IMenuActions } from "../../../common/components/ActionMenu";
import { AddCircleOutlineOutlined, Delete, Edit, Visibility } from "@mui/icons-material";
import type { IColumn } from "../../../common/components/CustomTable";
import CustomTable from "../../../common/components/CustomTable";
import ActionMenu from "../../../common/components/ActionMenu";
import DeleteConfirmationModal from "../../../common/components/DeleteConfirmationModal";

export default function Facilities() {
   const theme=useTheme();
    const queryClient = useQueryClient();
    const [open ,setOpen]=useState(false);
     const [selectedFacility,setSelectedFacility]=useState<IFacility|null>(null);
     const [searchParams,setSearchParams]=useSearchParams();
       const page=parseInt(searchParams.get("page")|| "0");
       const rowsPerPage=parseInt(searchParams.get("size")|| "5");
      //  pagination function
      const handleChangePage = (
  event: unknown,
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
              onClick:(id)=>alert("view"),

            },
             {
              label:"Edit",
              icon:<Edit fontSize="small"/>,
              color:theme.palette.secondary.main,
              onClick:(id)=>alert("Edit"),

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

  </>;
}
