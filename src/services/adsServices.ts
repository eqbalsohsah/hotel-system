import { axiosInstance } from "../api/axiosInstance";
import type { IAdPayload, IAdResponse } from "../interfaces/adsInterface";

export const FetchAdsList=async(page:number ,size:number):Promise<IAdResponse>=>{
    const response=await axiosInstance.get(`/admin/ads`,{
        params:{page,size}
    });
    return response?.data?.data
}
export const deleteAd=async(adId:string)=>{
    const response=await axiosInstance.delete(`/admin/ads/${adId}`);
    return response?.data?.data

}
export const creatAd=async(payload:IAdPayload):Promise<any>=>{
    const response=await axiosInstance.post(`/admin/ads`,payload);
    return response?.data

}