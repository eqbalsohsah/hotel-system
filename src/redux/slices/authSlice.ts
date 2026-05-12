import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '../../interfaces/authInerface'


export interface AuthState{
 user:IUser | null;
 token:string | null;
 role:string | null,

}

const initialState: AuthState = {
   user: JSON.parse(localStorage.getItem("user") || "null"),
    token:localStorage.getItem("token"),
    role:localStorage.getItem("role"),


}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
        setLogin: (state, action: PayloadAction<{user:IUser,token:string,role:string}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
     state.role = action.payload.role;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);


  },
     logout: (state) => {
      state.user = null;
      state.token = null;
     state.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },}
})

// Action creators are generated for each case reducer function
export const {setLogin ,logout} = authSlice.actions

export default authSlice.reducer