export interface IRoom{
    _id:string;
    roomNumber:string;
    price:number;
    images:string[];
    capacity:number;
    discount:number;
    facilities: IFacility[];

}
export interface IFacility{
    _id:string;
    name:string;
}