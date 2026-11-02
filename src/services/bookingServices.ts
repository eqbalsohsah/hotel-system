import { axiosInstance } from "../api/axiosInstance";

export const FetchBookingsList=async(page:number ,size:number)=>{
    const response=await axiosInstance.get(`/admin/booking`,{
        params:{page,size}
    });
    return response?.data?.data
}
export const deleteBooking=async(bookingId:string)=>{
    const response=await axiosInstance.delete(`/admin/booking/${bookingId}`);
    return response?.data?.data

}