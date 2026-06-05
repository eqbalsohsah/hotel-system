import { axiosInstance } from "../api/axiosInstance"


export const FetchRoomsList=async(page:number ,size:number)=>{
    const response=await axiosInstance.get(`/admin/rooms`,{
        params:{page,size}
    });
    return response?.data?.data
}
export const deleteRoom=async(roomId:string)=>{
    const response=await axiosInstance.delete(`/admin/rooms/${roomId}`);
    return response?.data?.data

}