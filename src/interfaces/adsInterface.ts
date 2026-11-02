export interface IAdRoom{
    _id:string;
    roomNumber:string;
    price:number;
    discount:number;
    capacity:number;
    facilities:string[];
    images:string[];

}
export interface IAdCreator{
    _id:string;
    userName:string;
}
export interface IAd{
    _id:string;
    isActive:boolean;
    room:IAdRoom;
    createdBy:IAdCreator;
    createdAt:string;
    updatedBy:string;
}
export interface IAdPayload{
    room:string;
    isActive:boolean;
}
export interface IAdResponse{
    ads:IAd[];
    totalCount:number;
}