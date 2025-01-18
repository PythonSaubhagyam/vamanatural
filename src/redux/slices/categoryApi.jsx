import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";


const mainLinks = [
    {
        name: "Gifting",
        categoryId: 288,
    },
    {
        name: "GIR Gau Products",
        categoryId: 278,
    },
    {
        name: "Health Care",
        categoryId: 281,
    },
    {
        name: "Personal Care",
        categoryId: 344,
    },
    {
        name: "Nutrition",
        categoryId: 788,
    },

    {
        name: "Grocery",
        categoryId: 291,
    },
    {
        name: "Healthy Breakfast",
        categoryId: 775,
    },
    {
        name: "Healthy Snacks",
        categoryId: 317,
    },
    {
        name: "Healthy Powder",
        categoryId: 716,
    },
    {
        name: "Chocolate & Bars",
        categoryId: 773,
    },
    {
        name: "Tea & Coffee",
        categoryId: 769,
    },
    {
        name: "Beverages",
        categoryId: 772,
    },
    {
        name: "Seasonal Foods",
        categoryId: 290,
    },
    {
        name: "World Foods",
        categoryId: 771,
    },
    {
        name: "Home Care",
        categoryId: 347,
    },

    // {
    //   name: "Super Food",
    //   categoryId: 601,
    // },

    // {
    //   name: "Sweetener",
    //   categoryId: 774,
    // },

    ,
];

const mergeArraysById = (array1, array2) =>
  array1.reduce((result, obj) => {
    const matchingObj = array2.find((o) => o.id === obj.categoryId);
    if (matchingObj) result.push({ ...obj, ...matchingObj });
    return result;
  }, []);
// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
    const response = await client.get("/categories/", {
      params: { list: true },
    });
    if (response.data.status === true) {
      return response.data.categories;
    }
    throw new Error("Failed to fetch categories");
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    mergedCategories: [],
    activeCategory: "",
    status: "idle",
    error: null,
    hasFetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
        state.mergedCategories = mergeArraysById(mainLinks, action.payload);
        state.hasFetched = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
