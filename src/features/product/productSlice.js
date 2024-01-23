import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";
export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTopProducts = createAsyncThunk(
  "product/get-Top-products",
  async (thunkAPI) => {
    try {
      return await productService.getTopProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAProduct = createAsyncThunk(
  "product/delete-product",
  async (_id, thunkAPI) => {
    try {
      return await productService.deleteProduct(_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAProduct = createAsyncThunk(
  "product/get-product",
  async (_id, thunkAPI) => {
    try {
      return await productService.getProduct(_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAProduct = createAsyncThunk(
  "product/update-product",
  async (product, thunkAPI) => {
    console.log(product);
    try {
      return await productService.updateProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const exportProductsAction = createAsyncThunk(
  "products/export",
  async (thunkAPI) => {
    try {
      const response = await productService.exportProducts();
      toast.success("Xuất Excel thành công!");
      return response;
    } catch (error) {
      toast.error("Xuất Excel thất bại. Vui lòng thử lại!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const exportOrdersAction = createAsyncThunk(
  "products/exportOrder",
  async (id, thunkAPI) => {
    try {
      const response = await productService.exportOrder(id);
      toast.success("Xuất Excel thành công!");
      return response;
    } catch (error) {
      toast.error("Xuất Excel thất bại. Vui lòng thử lại!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createProducts = createAsyncThunk(
  "product/create-product",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  topProduct: [],
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTopProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.topProduct = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
      })
      .addCase(deleteAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productName = action.payload.name;
        state.productDescription = action.payload.description;
        state.productPrice = action.payload.price;
        state.productCategory = action.payload.category;
        state.productImages = action.payload.images;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productName = action.payload[0].name;
        state.productDescription = action.payload[0].description;
        state.productPrice = action.payload[0].price;
        state.productCategory = action.payload[0].category;
        state.productImages = action.payload[0].images;
      })
      .addCase(updateAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(exportProductsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportProductsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.exportPath = action.payload.path;
      })
      .addCase(exportProductsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(exportOrdersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportOrdersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.exportPath = action.payload.path;
      })
      .addCase(exportOrdersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
