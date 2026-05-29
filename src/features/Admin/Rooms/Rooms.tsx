import { AppBar, Box, Button, Chip, Container, IconButton, LinearProgress, Stack, TablePagination, Tooltip, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import type { IColumn } from "../../../common/components/CustomTable";
import type { IRoom } from "../../../interfaces/roomsInterface";
import { AddCircleOutlineOutlined, Delete, Edit, Visibility } from "@mui/icons-material";
import CustomTable from "../../../common/components/CustomTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FetchRoomsList } from "../../../services/roomsService";
import ActionMenu, { type IMenuActions, type IProps } from "../../../common/components/ActionMenu";

export default function Rooms() {
    const theme=useTheme();
  const [searchParams,setSearchParams]=useSearchParams();
  const page=parseInt(searchParams.get("page")|| "0");
  const rowsPerPage=parseInt(searchParams.get("size")|| "5");
    const {data,isLoading,isFetching}=useQuery({
    queryKey:["rooms",page,rowsPerPage],
    queryFn:()=>FetchRoomsList(page+1,rowsPerPage),
    placeholderData:keepPreviousData,
  });
  const roomsData = data as {
    rooms: IRoom[];
    totalCount: number;
  } | undefined;


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
const getAction=(row:IRoom):IMenuActions[]=>[
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
    onClick:(id)=>alert("Delete"),

  }

]



  const columns:IColumn[]=[
        {id:"roomNumber",label:"Room Number"},
        {id:"images",label:"Image",render:(row:IRoom)=>(
          <Box
          component="img"
          src={row.images?.[0] || 'placeholder-images-url'}
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



  </>;
}
