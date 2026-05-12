//start interface for login interface
export interface Ilogin{
    email:string;
    password:string;
}
export interface  IUser{
    _id:string;
    userName:string;
    role:"admin" | "user"
}
export interface LoginResponse{
    message:string;
    data:{
        user:IUser;
        token:string

    }

}
//end interface for login
// interface for forgetpassword
export interface IForget{
   email:string ;
}
export interface ForgetResponse{

    success:boolean;
    message:string;
    data:null
}
//end interface for forgetpassword
//start interface for resetpassword
export interface IReset{
    email:string,
    password:string,
    confirmPassword:string,
    seed:string,
}
export interface ResetResponse{

    success:boolean;
    message:string;
    data:null

}
//interface for register
export interface RegisterPayload{
    userName:string,
    email:string,
    confirmPassword:string,
    password:string,
    phoneNumber:number,
    country:string,
     role:"admin" | "user",
     profileImage:string,

}
export interface RegisterResponse{
    success:boolean,
    message:string,
    data: null

}