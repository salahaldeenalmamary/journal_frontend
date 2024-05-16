import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRoles } from "../../services/rolesService";
const roles = [
  { id: "1", name: "Editor Assistant", permissions: ["3", "2"] },
  { id: "2", name: "Action Editor", permissions: ["1"] },
  { id: "3", name: "Journal Manager", permissions: ["2"] },
  { id: "4", name: "Section Editor", permissions: ["1", "2"] },
  { id: "5", name: "Editor in Chafe", permissions: ["1", "3"] },
  { id: "6", name: "Publisher", permissions: ["3"] },
];
const initialState = {
  roles,
  apiRoles: [],
  loading: false,
  error: false,
  errorMsg: "",
};

const slice = createSlice({
  name: "Roles",
  initialState,
  reducers: {
    roleAdded: (state, role) => {
      const newRole = {
        ...role.payload,
        id: state.roles.length + 1,
        permissions: [],
      };
      state.roles.push(newRole);
    },
    roleUpdated: (state, role) => {
      state.roles = state.roles.map((r) =>
        r.id === role.payload.id ? role.payload : r
      );
    },
    roleDeleted: (state, roleId) => {
      const newRoles = state.roles.filter((r) => r.id !== roleId.payload);
      state.roles = newRoles;
    },
    permissionAddedToRole: (state, { payload }) => {
      const { roleId, permissionId, value } = payload;
      const roleIndex = state.roles.findIndex((r) => r.id === roleId);
      const role = { ...state.roles[roleIndex] };
      const rolePermissions = [...role.permissions];
      if (value) {
        role.permissions.push(permissionId);
      } else {
        const permissionIndex = rolePermissions.indexOf(permissionId);
        role.permissions.splice(permissionIndex, 1);
      }
      const newRole = { ...role };
      state.roles.map((r) => (r.id === roleId ? newRole : r));
    },
    permissionDeletedFromAllRoles: (state, permissionId) => {
      const rolesCopy = [...state.roles];
      const newRoles = [];
      for (const role of rolesCopy) {
        const newRole = {
          ...role,
          permissions: role.permissions.filter(
            (p) => p !== permissionId.payload
          ),
        };
        newRoles.push(newRole);
      }
      state.roles = newRoles;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMsg = "";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorMsg = "";
        state.apiRoles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMsg = action.error.message;
      });
  },
});
export const fetchRoles = createAsyncThunk("Roles/fetchRoles", async () => {
  try {
    const res = await getAllRoles();

    return res.data;
  } catch (ex) {
    throw new Error(ex);
  }
});

export const {
  roleAdded,
  roleUpdated,
  roleDeleted,
  permissionAddedToRole,
  permissionDeletedFromAllRoles,
} = slice.actions;

export default slice.reducer;
