import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";

// Async Thunk for fetching filters
export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async (_, { rejectWithValue }) => {
    try {
      const [tagsResponse, foamsResponse, brandResponse] = await Promise.all([
        client.get("/web/product-tags/list/"),
        client.get("/web/product-foams/list/"),
        client.get("/web/brand/list/"),
      ]);

      // Helper function to transform array for Select component
      const transformArray = (data) =>
        data.map((item) => ({
          label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          value: item.id,
        }));

      return {
        tags: transformArray(tagsResponse?.data?.data || []),
        foams: transformArray(foamsResponse?.data?.data || []),
        brands: transformArray(brandResponse?.data?.data || []),
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Filter Slice
const shopSlice = createSlice({
  name: "filters",
  initialState: {
    tagsArray: [],
    productFoamsArray: [],
    brandArray: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.tagsArray = action.payload.tags;
        state.productFoamsArray = action.payload.foams;
        state.brandArray = action.payload.brands;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;
