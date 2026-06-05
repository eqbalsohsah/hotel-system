import { axiosInstance } from "../api/axiosInstance";
import type { IFacilitiesResponse } from "../interfaces/facilitiesInterface";

export const FetchFacilitesList=async(page:number ,size:number): Promise <IFacilitiesResponse>=>{
    const response=await axiosInstance.get(`/admin/room-facilities`,{
        params:{page,size}
    });
    return response?.data?.data
}
export const deleteFacility=async(id:string)=>{
    const response=await axiosInstance.delete(`/admin/room-facilities/${id}`);
    return response?.data?.data

}