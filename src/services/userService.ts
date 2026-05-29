import { axiosInstance } from "../api/axiosInstance"

export const FetchUserList=async(page:number ,size:number)=>{
    const response=await axiosInstance.get(`/admin/users`,{
        params:{page,size}
    });
    return response?.data?.data
}