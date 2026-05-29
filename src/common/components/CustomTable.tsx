
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Skeleton, useTheme } from '@mui/material';

  export interface IColumn{
    id:string;
    label:string;
    render?: (row:any)=>React.ReactNode;

 }
 interface IProps{
    columns:IColumn[];
    data:any[];
    isloading?: boolean;

 }

export default function CustomTable({columns,data,isloading}:IProps) {
    const theme=useTheme();
  return (
    <>

  <TableContainer
  component={Paper}
  sx={{
    boxShadow:"0px 4px 20px rgba(0,0,0,0.05)",
    borderRadius:"12px",
    border:"1px solid #eee"
  }}>
      <Table >
        <TableHead sx={{backgroundColor:theme.palette.primary.main}}>
          <TableRow>
            {columns.map((column)=>
              <TableCell key={column.id}
              sx={{fontWeight:"bold",color:"#000"}}>
                {column.label}
            </TableCell>

            )}
          </TableRow>
        </TableHead>
        <TableBody>

  {isloading ? (

    Array.from(new Array(5)).map((_, index) => (
      <TableRow key ={index}

      >

        {columns.map((column) => (
          <TableCell key={column.id}>

            <Skeleton variant='text'
          />

          </TableCell>
        ))}

      </TableRow>
    ))

  ) : (

    data.map((row, index) => (
      <TableRow key={ row._id ||index}
     sx={{
        "&:nth-of-type(even)":{backgroundColor:"#FBFBFB"},
        "&:hover":{backgroundColor:"#F1F1F1"}
      }}>

        {columns.map((column) => (
          <TableCell key={column.id}>

            {column.render
              ? column.render(row)
              : row[column.id]}

          </TableCell>
        ))}

      </TableRow>
    ))

  )}

</TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
