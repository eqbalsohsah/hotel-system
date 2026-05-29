import { AppBar, Box, Container, LinearProgress, TablePagination, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import type { IColumn } from "../../../common/components/CustomTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FetchUserList } from "../../../services/userService";
import CustomTable from "../../../common/components/CustomTable";

export default function Users() {
  const theme=useTheme();
  const [searchParams,setSearchParams]=useSearchParams();
  const page=parseInt(searchParams.get("page")|| "0");
  const rowsPerPage=parseInt(searchParams.get("size")|| "5");
  const columns:IColumn[]=[

    {id:"userName",label:"User Name"},
    {id:"role" ,label:"Role"},
    {id:"phoneNumber",label:"Phone"},
    {id:"email",label:"Email"},
    {id:"country",label:"Country"}
  ];
  const {data,isLoading,isFetching}=useQuery({
    queryKey:["users",page,rowsPerPage],
    queryFn:()=>FetchUserList(page+1,rowsPerPage),
    placeholderData:keepPreviousData,
  });
  const userData = data as {
    users: any[];
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

  return <>
  <Box>
    <AppBar position="static" sx={{
      backgroundColor:"#fff",
      color:theme.palette.primary.main,

      borderBottom:`1px solid ${theme.palette.divider}`,
    }}>
      <Box>
        <Typography variant="h6" sx={{fontWeight:"bold"}}>
          Users  Table Details
        </Typography>
         <Typography variant="body2" color="textSecondary">
         You can check all details
        </Typography>
      </Box>

    </AppBar>

{isFetching && !isLoading &&(
  <LinearProgress sx={{height:"2px" ,backgroundColor:"transparent"}}/>
)}
    <Container sx={{mt:4}}>
   <CustomTable
  columns={columns}
  data={userData?.users || []}
  isloading={isLoading || isFetching}
/>
{!isLoading && userData &&
<TablePagination
  component="div"

  count={userData?.totalCount || 0}

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
