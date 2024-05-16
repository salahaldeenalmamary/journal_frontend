import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  rolesModalState: false,
  permissionsModalState: false,
  currentRole: {},
  currentPermission: {},
};

const slice = createSlice({
  name: "RolesAndPermissionsTable",
  initialState,
  reducers: {
    roleModalShowed: (state, role) => {
      if (role.payload) state.currentRole = role.payload;
      state.rolesModalState = true;
    },
    roleModalClosed: (state) => {
      state.rolesModalState = false;
      state.currentRole = {};
    },
    permissionModalShowed: (state, permission) => {
      if (permission.payload) state.currentPermission = permission.payload;
      state.permissionsModalState = true;
    },
    permissionModalClosed: (state) => {
      state.permissionsModalState = false;
      state.currentPermission = {};
    },
  },
});

export const {
  roleModalClosed,
  roleModalShowed,
  permissionModalClosed,
  permissionModalShowed,
} = slice.actions;

export default slice.reducer;
