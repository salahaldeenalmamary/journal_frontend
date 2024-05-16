import { createSlice } from "@reduxjs/toolkit";
const permissions = [
  { id: "1", name: "Revisions" },
  { id: "2", name: "Decisions" },
  { id: "3", name: "Assign Reviewer" },
];
const initialState = {
  permissions,
};

const slice = createSlice({
  name: "Permissions",
  initialState,
  reducers: {
    permissionAdded: (state, permission) => {
      const newPermission = {
        ...permission.payload,
        id: state.permissions.length + 1,
        permissions: [],
      };
      state.permissions.push(newPermission);
    },
    permissionUpdated: (state, permission) => {
      state.permissions = state.permissions.map((p) =>
        p.id === permission.payload.id ? permission.payload : p
      );
    },
    permissionDeleted: (state, permissionId) => {
      const newPermissions = state.permissions.filter(
        (p) => p.id !== permissionId.payload
      );
      state.permissions = newPermissions;
    },
  },
});

export const { permissionAdded, permissionUpdated, permissionDeleted } =
  slice.actions;

export default slice.reducer;
