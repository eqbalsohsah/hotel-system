import { axiosInstance } from "../api/axiosInstance"

export const FetchRoomsList=async(page:number ,size:number)=>{
    const response=await axiosInstance.get(`/admin/rooms`,{
        params:{page,size}
    });
    return response?.data?.data
}