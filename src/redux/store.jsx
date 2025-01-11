import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import homeReducer from "../redux/slices/homeApi"
import categoryReducer from "../redux/slices/categoryApi"
import shopReducer from "../redux/slices/shopApi"
// import s from "./slices/shopApi";



export const store = configureStore({
    reducer: {
        home: homeReducer,
        category: categoryReducer,
        shop: shopReducer,
    }
})

setupListeners(store.dispatch);