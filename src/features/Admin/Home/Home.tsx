import { useQuery } from "@tanstack/react-query";
import { FetchUserList } from "../../../services/userService";
import { Grid, Skeleton } from "@mui/material";

import { GridView, Group, PendingActions } from "@mui/icons-material";

import { FetchRoomsList } from "../../../services/roomsService";
import { FetchBookingsList } from "../../../services/bookingServices";
import StateCard from "./Components/StateCard";
import PieChartComponent from "./Components/PieChartComponent";
import BarChartComponent from "./Components/BarChartComponent";

export default function Home() {

const {data :userFromApi ,isLoading:isLoadingUser}=useQuery({
  queryKey:["users"],
  queryFn:()=>FetchUserList(1,100),
})
const {data :roomsFromApi ,isLoading:isLoadingRoom}=useQuery({
  queryKey:["rooms"],
  queryFn:()=>FetchRoomsList(1,100),
})
const {data :bookingFromApi ,isLoading:isLoadingBooking}=useQuery({
  queryKey:["booking"],
  queryFn:()=>FetchBookingsList(1,100),
})

const isLoading= isLoadingUser || isLoadingRoom || isLoadingBooking;
const totalUser=(userFromApi as any )?.totalCount ?? 0;
const totalRooms=(roomsFromApi as any )?.totalCount ?? 0;
const totalBooking=(bookingFromApi as any )?.totalCount ??0;
const totalBookingList=(bookingFromApi as any )?.booking?? [];
const  pendingBooking=totalBookingList.filter((booking:any)=>
  booking.status?.toLowerCase() === "pending"
).length;
const completedBooking=totalBooking-pendingBooking;
const bookingData = [
  { name: "Pending", value: pendingBooking },
  { name: "Completed", value: completedBooking },
];
const chartData = [
  {
    name: "Users",
    value: totalUser,
  },
  {
    name: "Rooms",
    value: totalRooms,
  },
  {
    name: "Pending",
    value: pendingBooking,
  },
  {
    name: "Completed",
    value: completedBooking,
  },
];

  return <>
  <Grid container  spacing={3} >
    {isLoading ? (
      Array.from ({length:3}).map((_)=>(
        <Grid size={{xs:12 ,md:4}}>
          <Skeleton variant="rounded" height={140} sx={{borderRadius:3}}/>

        </Grid>

      ))
    ):
    (
      <>
    <Grid size  ={{xs:12,md:4}} >
    <StateCard  label="Users"  icon={<Group fontSize="large"/>}  value={totalUser}/>
    </Grid>
     <Grid size  ={{xs:12,md:4}} >
    <StateCard  label="Rooms"  icon={<GridView fontSize="large"/>}  value={totalRooms}/>
    </Grid>
     <Grid size  ={{xs:12,md:4}} >
    <StateCard label="pengingBooking"  icon={<PendingActions fontSize="large"/>}  value={pendingBooking}/>
    </Grid>
</>

    )



}

     <Grid size={{xs:12,md:4}}>
<PieChartComponent data={bookingData} />
      </Grid>

    <Grid size={{xs:12,md:4}}>
      <BarChartComponent data={chartData} />
    </Grid>
</Grid>




  </>;
}
