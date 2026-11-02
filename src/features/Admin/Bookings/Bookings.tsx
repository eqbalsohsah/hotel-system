import { AppBar, Box, Chip, Container, LinearProgress, TablePagination, Typography, useTheme } from "@mui/material";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { deleteBooking, FetchBookingsList } from "../../../services/bookingServices";
import type { IBooking, IBookingResponse } from "../../../interfaces/bookingInterface";
import CustomTable, { type IColumn } from "../../../common/components/CustomTable";
import ActionMenu, { type IMenuActions } from "../../../common/components/ActionMenu";
import { Delete,  Visibility } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../../common/components/DeleteConfirmationModal";

export default function Bookings() {
  const theme=useTheme();
   const queryClient = useQueryClient();
  const [openDelete,setOpenDelete]=useState(false);
  const [selectedBooking,setSelectedBooking]=useState<IBooking | null>(null)
  const [searchParams,setSearchParams]=useSearchParams();
  const page=parseInt(searchParams.get("page") || "0");
  const rowsPerPage=parseInt(searchParams.get("size") || "5");
  //get all bookings
  const {data,isLoading,isFetching}=useQuery({
   queryKey:["bookings",page,rowsPerPage],
   queryFn:()=>FetchBookingsList(page+1,rowsPerPage),
   placeholderData: keepPreviousData,
  });
  //delete booking
   const { mutate: performDelete } = useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("booking deleted");
      setOpenDelete(false)
    },
    onError:(error:any)=>{
      toast.error(error.response?.data?.message || "error deleting Booking");
    }
  });
  // open delete model
  const handelOpenDelete=(booking:IBooking)=>{
    setSelectedBooking(booking);
    setOpenDelete(true);
  }
  const confirmDelete=()=>{
    if(selectedBooking){
      performDelete(selectedBooking._id)

    }
  }

  // handel pagination

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
// end pagination
  const bookingsData=data as IBookingResponse | undefined;
  const getAction=(row:IBooking):IMenuActions[]=>[
    {
      label:"view",
      icon:<Visibility fontSize="small"/>,
      color:theme.palette.primary.main,
      onClick:()=>alert("hhhhhhhhhh"),

    },


     {
      label:"Delete",
      icon:<Delete fontSize="small"/>,
      color:theme.palette.error.main,

    onClick:()=>handelOpenDelete(row),
    }

  ]
   const columns:IColumn[]=[
          {id:"roomNumber",
            label:"Room Number",
            render:(row:IBooking)=>(row.room ? row.room.roomNumber :"-")
          },
          {id:"userName",
            label:"User Name",
            render:(row:IBooking)=>(row.room ? row.user.userName :"-")
          },
           {id:" totalPrice",
            label:"total Price",
            render:(row:IBooking)=> `${row.totalPrice} EGP`
          },
            {id:" startDate",
            label:"start Date",
            render:(row:IBooking)=> new Date (row.startDate).toLocaleDateString(),
          },
            {id:" endDate",
            label:"end Date",
            render:(row:IBooking)=> new Date (row.endDate).toLocaleDateString(),
          },
           {id:" status",
            label:"Status",

            render:(row:IBooking)=> {
              const statusColors: Record <string ,"warning" |"success"| "error">={
                pending:"warning",
                completed:"success",
                cancalled:"error",

              };
              return(
                <Chip label={row.status}
                 color={statusColors[row.status] || "default"}
                  size="small"
                  variant="outlined"



/>

              );
            }
          },
           {id:"action",label:"Actions",render:(row:IBooking)=>(
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
                Bookings Table Details
              </Typography>
               <Typography variant="body2" color="textSecondary">
               You can check all details
              </Typography>
            </Box>

           </Box>

          </AppBar>
           {isFetching && !isLoading &&(
                  <LinearProgress sx={{height:"2px" ,backgroundColor:"transparent"}}/>
                )}
            <Container sx={{mt:4}}>
            <CustomTable
                columns={columns}
             data={bookingsData?.booking || []}
            isloading={isLoading || isFetching}
                />
                 {!isLoading && bookingsData &&
                      <TablePagination
                        component="div"

                        count={bookingsData?.totalCount || 0}

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
                title="Delete Modal" onClose={()=>setOpenDelete(false) } onConfirm={confirmDelete}/>
  </>;
}
