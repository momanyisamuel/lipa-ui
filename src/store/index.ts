import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import orderSlice from "./orderSlice";
import expenseSlice from "./expenseSlice";

const store = configureStore({
    reducer: {
        products: productSlice,
        categories: categorySlice,
        orders: orderSlice,
        expenses: expenseSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;