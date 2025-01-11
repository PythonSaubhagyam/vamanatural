import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";

// Initial state for banners
const initialState = {
    banners: [],
    upperSection: {
        ourMissionSection: [],
        ourVissionSection: [],
        newArrivalsSection: [],
        certificateSection: [],
        ourProductSection: [],
    },
    tryOurNewProductSection: [],
    mustTrySection: [],
    allTimeBestSellerSection: [],
    lowerSection1: {
        skinCareSection: [],
        nonGmoSection: [],
    },
    blogs: [],
    statisticsSection: {},
    lowerSection2: {
        awardsSection: [],
        servicesSection: [],
        availableSection: [],
    },
    loader: false,
    error: null,
}

const getResponseData = (res, key) => {
    if (!res || !res.status) return [];
    return res[key] || res.data || [];
};

//1 Async thunk for fetching banners
export const fetchBanner = createAsyncThunk("banners/fetchBanner", async () => {
    const res = await client.get("ecommerce/banners/?sequence=Upper");
    return res.data
}
)

//2 Async thunk for fetching UpperSection
export const fetchUpperSection = createAsyncThunk("home/fetchUpperSection", async () => {
    const response = await client.get("/vamanatural-section/?type=Upper");
    return response.data;
}
);

//3 Async thunk for fetching Try Our New Product Section Section
export const fetchTryOurNewProduct = createAsyncThunk("home/fetchTryOurNewProduct", async () => {
    const response = await client.get("/newarrival/list");
    return response.data;
});

//4 Async thunk for fetching Must Try Section Section
export const fetchMustTry = createAsyncThunk("home/fetchMustTry", async () => {
    const response = await client.get("/musttry/list");
    return response.data;
});

//5 Async thunk for fetching All Time Best Seller Section Section
export const fetchAllTimeBestSeller = createAsyncThunk("home/fetchAllTimeBestSeller", async () => {
    const response = await client.get("/bestofalltime/list");
    return response.data;
});

//6 Async thunk for fetching Lower Section 1 Section
export const fetchLowerSection1 = createAsyncThunk("home/fetchLowerSection1", async () => {
    const response = await client.get("/vamanatural-section/?type=Lower");
    return response.data;
});

//7 Async thunk for fetching Blog Section
export const fetchBlogs = createAsyncThunk("home/fetchBlogs", async () => {
    const response = await client.get("/home/blogs/");
    console.log("first",response)
    return response.data;
});

//8 Async thunk for fetching Statistics Section Section
export const fetchStatisticsSection = createAsyncThunk("home/fetchStatisticsSection", async () => {
    const response = await client.get("/statistics-section/");
    return response.data;
});

//9 Async thunk for fetching Lower Section 2 Section
export const fetchLowerSection2 = createAsyncThunk("home/fetchLowerSection2", async () => {
    const response = await client.get("/lower-section/");
    return response.data;
});


const bannerSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //1 Banners 
            .addCase(fetchBanner.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchBanner.fulfilled, (state, action) => {
                state.loader = false;
                if (action.payload.status === true) {
                    state.banners = getResponseData(action.payload, "banner");
                }
            })
            .addCase(fetchBanner.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //2 Upper Section
            .addCase(fetchUpperSection.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchUpperSection.fulfilled, (state, action) => {
                state.loader = false;
                if (action.payload.status === true) {
                    const data = getResponseData(action.payload, "data");
                    console.log(data)
                    state.upperSection = {
                        ourMissionSection: data.filter((section) => section.id === 1),
                        ourVissionSection: data.filter((section) => section.id === 2),
                        newArrivalsSection: data.filter((section) => section.id === 3),
                        certificateSection: data.filter((section) => section.id === 4),
                        ourProductSection: data.filter((section) => section.id === 5),
                    }
                }
            })
            .addCase(fetchUpperSection.rejected, (state, action) => {
                state.loader = false,
                    state.error = action.error.message;
            })

            //3 Tru Our New Products
            .addCase(fetchTryOurNewProduct.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchTryOurNewProduct.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    state.tryOurNewProductSection = getResponseData(action.payload, "data")
                }
            })
            .addCase(fetchTryOurNewProduct.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //4 Must Try Product
            .addCase(fetchMustTry.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchMustTry.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    state.mustTrySection = getResponseData(action.payload, "data")
                }
            })
            .addCase(fetchMustTry.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //5 All Time Best Seller
            .addCase(fetchAllTimeBestSeller.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchAllTimeBestSeller.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    state.allTimeBestSellerSection = getResponseData(action.payload, "data")
                }
            })
            .addCase(fetchAllTimeBestSeller.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //6 Lower Section 1
            .addCase(fetchLowerSection1.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchLowerSection1.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    const data = getResponseData(action.payload, "data")
                    console.log("ls1", data)
                    state.lowerSection1 = {
                        skinCareSection: data.filter((section) => section.id === 6),
                        nonGmoSection: data.filter((section) => section.id === 7),
                    }
                }
            })
            .addCase(fetchLowerSection1.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //7 Blogs Section
            .addCase(fetchBlogs.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchBlogs.fulfilled, (state,action) => {
                state.loader = false
                if (action.payload.status === true) {
                    state.blogs = getResponseData(action.payload,"blogs")
                    console.log("blogs",state.blogs)

                }
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //8 Statistics Section
            .addCase(fetchStatisticsSection.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchStatisticsSection.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    state.statisticsSection = getResponseData(action.payload, "data")
                }
            })
            .addCase(fetchStatisticsSection.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })

            //9 Lower Section 2
            .addCase(fetchLowerSection2.pending, (state) => {
                state.loader = true
            })
            .addCase(fetchLowerSection2.fulfilled, (state, action) => {
                state.loader = false
                if (action.payload.status === true) {
                    const data = getResponseData(action.payload, "data")
                    console.log("ls2", data)
                    state.lowerSection2 = {
                        awardsSection: data.filter((section) => section.id === 1),
                        servicesSection: data.filter((section) => section.id === 2),
                        availableSection: data.filter((section) => section.id === 3)
                    }
                }
            })
            .addCase(fetchLowerSection2.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message;
            })
    }
});
export default bannerSlice.reducer;