export interface IRoom {
  _id: string;
  roomNumber: string;
  price: number;
  imgs: FileList | string[];
  capacity: number;
  discount: number;
  facilities: IFacility[];
}

export interface IFacility {
  _id: string;
  name: string;
}

// نوع البيانات اللي بنستخدمه في فورم إضافة الغرفة
export interface IAddRoomForm {
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  imgs: FileList;
  facilities: string[];
}