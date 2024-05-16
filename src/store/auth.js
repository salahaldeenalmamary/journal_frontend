import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import auth from "../services/authService";
const initialState = {
  user: {},
  selectedRole: "",
  errorMsg: "",
  isSuccess: false,
  isLoading: false,
  isError: false,
};
const sliceName = "Auth";
const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    roleChanged: (state, action) => {
      state.selectedRole = action.payload;
    },
    login: (user, action) => {
      user.userName = action.payload.username;
      user.password = action.payload.password;
      user.selectedRole = action.payload.role;
    },
    logout: (state) => {
      state.selectedRole = "";
      state.user = {};
    },
    roleSwitched: (state, role) => {
      if (state.user.roles.includes(role.payload))
        state.user.selectedRole = role.payload;
    },
    userLoggedInWithToken: (state) => {
      const data = auth.getCurrentUser();
      if (!data) {
        state.user = {};
        state.selectedRole = "";
      } else {
        state.user = {
          ...data,
          roles: data.roles.split(","),
        };
        if (!state.user.roles.includes(state.selectedRole)) {
          state.selectedRole = state.user.selectedRole;
        }
        // state.selectedRole = "";
      }
      // state.user = user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.fulfilled, (state, action) => {
        // Handle successful forgot password request
      })
      .addCase(logoutApi.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(loginApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(loginApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload && payload.status === 400) {
          state.isSuccess = false;
          state.isError = true;
          state.errorMsg = payload.data.message;
        } else {
          state.isSuccess = true;
          state.isError = false;
          state.errorMsg = "";
        }
      })
      .addCase(loginApi.rejected, (state, action) => {
        console.log(action.error);
        console.log(action.payload);
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = "error";
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload && payload.status === 400) {
          state.isSuccess = false;
          state.isError = true;
          state.errorMsg = payload.data.message;
        } else {
          state.isSuccess = true;
          state.isError = false;
          state.errorMsg = "";
        }
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.error);
        console.log(action.payload);
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = "error";
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        // Handle successful email confirmation
      })
      .addCase(resetPasswordLink.fulfilled, (state, action) => {
        // Handle successful reset password link request
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        // Handle successful password reset
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        // Handle successful token refresh
      })
      .addMatcher(
        (action) =>
          [
            forgotPassword.pending,
            logoutApi.pending,
            loginApi.pending,
            register.pending,
            confirmEmail.pending,
            resetPasswordLink.pending,
            resetPassword.pending,
            refreshToken.pending,
          ].includes(action.type),
        (state) => {
          state.isError = false;
          state.isLoading = true;
          state.isSuccess = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            forgotPassword.rejected,
            logoutApi.rejected,
            loginApi.rejected,
            register.rejected,
            confirmEmail.rejected,
            resetPasswordLink.rejected,
            resetPassword.rejected,
            refreshToken.rejected,
          ].includes(action.type),
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
        }
      );
  },
});

export const {
  login,
  logout,
  roleChanged,
  userLoggedInWithToken,
  roleSwitched,
} = slice.actions;

export const forgotPassword = createAsyncThunk(
  `${sliceName}/forgotPassword`,
  async (email) => {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
      email,
    });
    return response.data;
  }
);

export const logoutApi = createAsyncThunk(`${sliceName}/logout`, async () => {
  await axios.post(`${API_BASE_URL}/logout`);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});

export const loginApi = createAsyncThunk(
  `${sliceName}/login`,
  async ({ username, password, selectedRole }) => {
    
    try {
      debugger;
      await auth.login(username, password, selectedRole);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex);
        return ex.response;
      }
    }
  }
);

export const register = createAsyncThunk(
  `${sliceName}/Register`,
  async (data) => {
    try {
      const response = await auth.register(data);
      return response.data;
    } catch (ex) {
      console.log(ex);
      return ex.response;
    }
  }
);

export const confirmEmail = createAsyncThunk(
  `${sliceName}/confirmEmail`,
  async (token) => {
    const response = await axios.get(
      `${API_BASE_URL}/ConfirmEmail?token=${token}`
    );
    return response.data;
  }
);

export const resetPasswordLink = createAsyncThunk(
  `${sliceName}/resetPasswordLink`,
  async (email) => {
    const response = await axios.get(
      `${API_BASE_URL}/reset_password?email=${email}`
    );
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  `${sliceName}/resetPassword`,
  async (resetData) => {
    const response = await axios.post(
      `${API_BASE_URL}/resetPassword`,
      resetData
    );
    return response.data;
  }
);

export const refreshToken = createAsyncThunk(
  `${sliceName}/refreshToken`,
  async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("Access or refresh token not found");
    }

    const response = await axios.post(`${API_BASE_URL}/Refresh-Token`, {
      accessToken: { token: accessToken },
      refreshToken: { token: refreshToken },
    });

    localStorage.setItem("accessToken", response.data.accessToken.token);
    localStorage.setItem("refreshToken", response.data.refreshToken.token);

    return response.data;
  }
);
export const getUserBasicInfo = createSelector(
  (state) => state.auth,
  ({ user }) => user.id
);
export default slice.reducer;
const reg = RegExp("^[w-]+(.[w-]+)*@([w-]+.)+[a-zA-Z]{2,7}$");
