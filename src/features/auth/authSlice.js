import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserfromLocalStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  orderwait: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  orderbyuser: [],
  orderbyId: [],
  message: "",
  admin: [],
  RevenueLast7Days: [],
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getrevenueLast7Days = createAsyncThunk(
  "order/getRevenueLast7Days",
  async (thunkAPI) => {
    try {
      return await authService.getRevenue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOrdersWait = createAsyncThunk(
  "order/getOrdersWait",
  async (thunkAPI) => {
    try {
      return await authService.getOrdersWait();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUser = createAsyncThunk("user/get-user", async (thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateUser = createAsyncThunk("user/update-user", async (user) => {
  try {
    const updatedUser = await authService.updateUser(user);
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
});
export const signUp = createAsyncThunk("user/signUp", async (user) => {
  try {
    const signUp = await authService.signUp(user);
    return signUp;
  } catch (error) {
    throw new Error(error);
  }
});
export const getOrderByUser = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const logout = await authService.logout();
    return logout;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getOrderById = createAsyncThunk(
  "order/get-order-by-id",
  async (id, thunkAPI) => {
    try {
      return await authService.getIdOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (id, thunkAPI) => {
    try {
      return await authService.confirmOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id, thunkAPI) => {
    try {
      return await authService.cancelOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.admin = null;
        state.message = "Logout success";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getrevenueLast7Days.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getrevenueLast7Days.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.RevenueLast7Days = action.payload;
        state.message = "success";
      })
      .addCase(getrevenueLast7Days.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrdersWait.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersWait.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderwait = action.payload;
        state.message = "success";
      })
      .addCase(getOrdersWait.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
        state.message = "success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderbyId = action.payload;
        state.message = "success";
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
        state.message = "User updated successfully";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message; // Capture the error message
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
        state.message = "User signUp successfully";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })

      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
