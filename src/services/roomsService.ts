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
export const AddRoom=async(data:FormData)=>{
    const response=await axiosInstance.post(`/admin/rooms`,data);
    return response?.data?.data

}
// update room
export const updateRoom=async( id:string,data:FormData)=>{
    const response=await axiosInstance.put(`/admin/rooms/${id}`,data,{
        headers:{
            "Content-Type":"multipart/form-data",
        }
    });
    return response?.data?.data

}