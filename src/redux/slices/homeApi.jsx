import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";

export const initializeAppData = createAsyncThunk("app/initializeData", async (_, { rejectWithValue }) => {
    try {
        const [
            bannersResponse,
            upperSectionResponse, 
            tryOurNewProductResponse, 
            mustTryResponse, 
            allTimeBestSellerResponse, 
            lowerSectionResponse1, 
            blogsResponse, 
            statisticsResponse, 
            lowerSectionResponse2
        ] = await Promise.all([
            client.get("/ecommerce/banners/?sequence=Upper"),
            client.get("/vamanatural-section/?type=Upper"),
            client.get("/newarrival/list"),
            client.get("/musttry/list"),
            client.get("/bestofalltime/list"),
            client.get("/vamanatural-section/?type=Lower"),
            client.get("/home/blogs/"),
            client.get("/statistics-section/"),
            client.get("/lower-section/"),
        ]);

        return {
            banners: bannersResponse.data.banner || [],
            upperSection: upperSectionResponse.data.data || [],
            tryOurNewProductSection: tryOurNewProductResponse.data.data || [],
            mustTrySection: mustTryResponse.data.data || [],
            allTimeBestSellerSection: allTimeBestSellerResponse.data.data || [],
            lowerSection1: lowerSectionResponse1.data.data || [],
            blogs: blogsResponse.data.blogs || [],
            statisticsSection: statisticsResponse.data.data || {},
            lowerSection2: lowerSectionResponse2.data.data || [],
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const bannerSlice = createSlice({
    name: "home",
    initialState: {
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
            nonGMOSection: [],
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
        hasFetched: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeAppData.pending, (state) => {
                state.loader = true
            })
            .addCase(initializeAppData.fulfilled, (state, action) => {
                state.loader = false;
                const { 
                    banners, 
                    upperSection, 
                    tryOurNewProductSection, 
                    mustTrySection, 
                    allTimeBestSellerSection, 
                    lowerSection1, 
                    blogs, 
                    statisticsSection, 
                    lowerSection2 
                } = action.payload;
                state.hasFetched = true;
                state.banners = banners;
                state.tryOurNewProductSection = tryOurNewProductSection;
                state.mustTrySection = mustTrySection;
                state.allTimeBestSellerSection = allTimeBestSellerSection;
                state.blogs = blogs;
                state.statisticsSection = statisticsSection;
                
                state.upperSection = {
                    ourMissionSection: upperSection.filter((section) => section.id === 1),
                    ourVissionSection: upperSection.filter((section) => section.id === 2),
                    newArrivalsSection: upperSection.filter((section) => section.id === 3),
                    certificateSection: upperSection.filter((section) => section.id === 4),
                    ourProductSection: upperSection.filter((section) => section.id === 5),
                }

                
                state.lowerSection1 = {
                    skinCareSection: lowerSection1.filter((section) => section.id === 6),
                    nonGMOSection: lowerSection1.filter((section) => section.id === 7),
                }
                
                state.lowerSection2 = {
                    awardsSection: lowerSection2.filter((section) => section.id === 1),
                    servicesSection: lowerSection2.filter((section) => section.id === 2),
                    availableSection: lowerSection2.filter((section) => section.id === 3)
                }
                
            })
            .addCase(initializeAppData.rejected, (state, action) => {
                state.loader = false;
                state.error = action.payload;
            })

    }
})

export default bannerSlice.reducer;