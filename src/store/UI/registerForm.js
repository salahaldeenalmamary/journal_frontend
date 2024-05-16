import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  email: "",
  phone: "",
  password: "",
  middleName: "",
  lastName: "",
  nickName: "",
  degree: "",
  university: "",
  country: "",
  userName: "",
};

const slice = createSlice({
  name: "RegisterForm",
  initialState,
  reducers: {
    preRegisterDataUploaded: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
  },
});

export const { preRegisterDataUploaded } = slice.actions;

export default slice.reducer;
