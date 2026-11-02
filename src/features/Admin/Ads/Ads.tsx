import { AddCircleOutlineOutlined, Delete, Edit, Visibility } from "@mui/icons-material";
import { AppBar, Box, Button, Container, Grid, LinearProgress, TablePagination, Typography, useTheme } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { IColumn } from "../../../common/components/CustomTable";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAd, FetchAdsList } from "../../../services/adsServices";
import type { IAd, IAdResponse } from "../../../interfaces/adsInterface";
import ActionMenu, { type IMenuActions } from "../../../common/components/ActionMenu";
import CustomTable from "../../../common/components/CustomTable";
import DeleteConfirmationModal from "../../../common/components/DeleteConfirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";
import DataModal from "../../../common/components/DataModal";

export default function Ads() {
  const theme=useTheme();
  const queryClient=useQueryClient();
  const navigate=useNavigate();
  const [searchParams,setSearchParams]=useSearchParams();
  const[openDelete,setOpenDelete]=useState(false);
  const[dataModel,setDataModel]=useState(false);
  const[dataModelMode,setDataModelMode]=useState <"add" | "view" | "update">("view");
  const [selectedAd,setSelectedAd]=useState<IAd | null>(null);
   const page=parseInt(searchParams.get("page") || "0");
  const rowsPerPage=parseInt(searchParams.get("size") || "5");
  const handelOpenDelete=(ad:IAd)=>{
    setOpenDelete(true);
    setSelectedAd(ad)
  }
  // handel close data model
  const handelDataModelOpenView=(ad:IAd,)=>{
    setDataModel(true);
    setSelectedAd(ad)
    setDataModelMode("view");
  }
   const handelDataModelOpenUpdate=(ad:IAd,)=>{
    setDataModel(true);
    setSelectedAd(ad)
    setDataModelMode("update");
  }
  const handelCloseDataModel=()=>{
    setDataModel(false);
  }
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
  // get all ads
  const {data,isLoading,isFetching}=useQuery({
    queryKey:["ads",page,rowsPerPage],
    queryFn:()=>FetchAdsList(page+1,rowsPerPage),
    placeholderData:keepPreviousData,
  });
  const adsData=data as IAdResponse | undefined;
  // delete ad
  const {mutate:performDelete,isPending}=useMutation({
    mutationFn: (id: string) => deleteAd(id),
       onSuccess: () => {
         queryClient.invalidateQueries({
           queryKey: ["ads"],
         });
         toast.success("ad deleted");
         setOpenDelete(false)
       },
       onError:(error:any)=>{
         toast.error(error.response?.data?.message || "error deleting ad");
       }
     });



  const confirmDelete=()=>{
     if(selectedAd){
      performDelete(selectedAd._id)

    }
  }

  //data for table
  const getAction=(row:IAd):IMenuActions[]=>[
      {
        label:"view",
        icon:<Visibility fontSize="small"/>,
        color:theme.palette.primary.main,
        onClick:()=>handelDataModelOpenView(row),

      },

        {
          label:"Edit",
          icon:<Edit fontSize="small"/>,
          color:theme.palette.secondary.main,
          onClick:()=>handelDataModelOpenUpdate(row),

        },

       {
        label:"Delete",
        icon:<Delete fontSize="small"/>,
        color:theme.palette.error.main,

      onClick:()=>handelOpenDelete(row),
      }

    ]
   const columns:IColumn[]=[
          {id:"roomNumber",label:"Room Number",render:(row:IAd)=>row.room?.roomNumber || "-"},
          // {id:"images",label:"Image",render:(row:IRoom)=>(
          //   <Box
          //   component="img"
          //   src={row.images?.[0] || 'placeholder-images-url'}
          //   alt="Room"
          //   sx={{width:80,height:50,borderRadius:"8px",objectFit:"cover"}}
          //   >

          //   </Box>
          // )},
           {id:"price",label:"price", render:(row:IAd)=>`${row.room?.price || 0} EGP`},
            {id:"discount",label:"discount",render:(row:IAd)=>`${row.room?.discount || 0} EGP`},


             {id:"action",label:"Actions",render:(row:IAd)=>(
            <ActionMenu itemId={row._id} actions={getAction(row)}/>
             )},

    ]
  return <>
   <AppBar position="static" sx={{
          backgroundColor:"#fff",
          color:theme.palette.primary.main,
  boxShadow:"none",
          borderBottom:`1px solid ${theme.palette.divider}`,

        }}>
         <Box sx={{p:2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           <Box>
            <Typography variant="h6" sx={{fontWeight:"bold"}}>
              Ads  Table Details
            </Typography>
             <Typography variant="body2" color="textSecondary">
             You can check all details
            </Typography>
          </Box>
          <Button
          variant="contained"
          startIcon={<AddCircleOutlineOutlined/>}
          sx={{textTransform:"none",borderRadius:"8px"}}
     onClick={() => navigate("/admin/ads/add-ad")}

          >
  Add New Ad
          </Button>
         </Box>
        </AppBar>
         {isFetching && !isLoading &&(
                          <LinearProgress sx={{height:"2px" ,backgroundColor:"transparent"}}/>
                        )}
             <Container sx={{mt:4}}>
              <CustomTable
              columns={columns}
           data={adsData?.ads || []}
          isloading={isLoading || isFetching}
              />
              {!isLoading && adsData &&
              <TablePagination
                component="div"

                count={adsData?.totalCount || 0}

                page={page}

                onPageChange={handleChangePage}

                rowsPerPage={rowsPerPage}

                onRowsPerPageChange={
                  handleChangeRowsPerPage
                }

                rowsPerPageOptions={[5,10,25]}
              />}
              </Container>
                 <DeleteConfirmationModal open={openDelete}
                              title="Delete Modal"
                               onClose={()=>setOpenDelete(false) }
                              onConfirm={confirmDelete}
                              loading={isPending}
                              />
                              <DataModal
                              open={dataModel}
                              onClose={handelCloseDataModel}
                              mode={dataModelMode}
                               title={
   dataModelMode === "view"
   ? "ad Details"
   : "Update ad"
 }>
   {dataModelMode === "view" ? (
    <Grid container spacing={2} alignItems="center">

  {/* التفاصيل */}
  <Grid size={{ xs: 12, md:  6}}>

  <Box sx={{p:2}}>
      <Typography variant="h5">
      Room {selectedAd?.room?.roomNumber}
    </Typography>

    <Typography sx={{ mt: 2 }}>
      Price: ${selectedAd?.room?.price}
    </Typography>

    <Typography sx={{ mt: 2 }}>
      Capacity: {selectedAd?.room?.capacity}
    </Typography>

</Box>


  </Grid>



</Grid>


   ): "coming soon "}


                              </DataModal>

        </>;
}
