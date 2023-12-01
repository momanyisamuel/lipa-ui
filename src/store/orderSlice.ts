import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";
import {  toast } from 'react-toastify';
import { CartItem } from "@/components/Cart";

export interface OrderInput {
    ref_number: string;
    discount: number;
    customer: string;
    subtotal: number;
    tax: string;
    items: CartItem[];
    date: Date,
    payment_type: string;
    payment_info: string;
    total: number;
    paid: string;
    // user: string;
}

export interface Order {
    _id: string;
    ref_number: string;
    discount: number;
    customer: string;
    subtotal: number;
    tax: string;
    items: CartItem[];
    date: Date,
    payment_type: string;
    payment_info: string;
    total: number;
    paid: string;
    user: string;
}

export const submitOrder = createAsyncThunk("products/submitOrder", async (order: OrderInput)=>{
    const response = await api.post("/api/v1/orders", order);
    console.log(response.data);
    toast("order submitted successfully 🤭")
    return response.data.data;
})

export const fetchOrders = createAsyncThunk("products/fetchOrders", async () => {
    const response = await api.get("/api/v1/orders")
    console.log(response.data.data);
    return response.data.data
})

interface OrderState {
    orders : Order[];
    status: string;
    error: unknown;
}

const initialState: OrderState = {
    orders: [],
    status: "idle",
    error: ""
}

const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrders.pending, (state)=>{
            state.status = "loading"
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.status = "idle"
            state.orders = action.payload
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
        .addCase(submitOrder.pending, (state) => {
            state.status = "loading"
        })
        .addCase(submitOrder.fulfilled, (state, action) => {
            state.status = "idle"
            state.orders = [...state.orders, action.payload]
        })
        .addCase(submitOrder.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
    }
})

export default orderSlice.reducer