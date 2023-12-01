import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";
import {  toast } from 'react-toastify';

interface Category {
    _id: string;
    name: string;
}

interface CategoryInput {
    name: string;
}

interface CategoryState {
    categories: Category[];
    status: string;
    error: unknown;
}

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await api.get("/api/v1/categories");
    console.log(response.data);
    return response.data.data;
});

export const addCategories = createAsyncThunk("categories/addCategories", async (category: CategoryInput) => {
    const response = await api.post("/api/v1/categories", category);
    console.log(response.data);
    toast("category added successfully 🤭")
    return response.data.data;
});

const initialState: CategoryState = {
    categories: [],
    status: "idle",
    error: "",
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
           .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
           .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "idle";
                state.categories = action.payload;
            })
           .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.payload;
            })
            .addCase(addCategories.pending,(state)=>{
                state.status = "loading";
            })
            .addCase(addCategories.fulfilled, (state, action) => {
                state.status = "idle";
                state.categories = [...state.categories, action.payload];
            })
            .addCase(addCategories.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.payload;
            })
            ;
    },
});

export default categorySlice.reducer;