import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";
import {  toast } from 'react-toastify';

export interface Expense {
    _id: string;
    name: string;
    amount: number;
    date: Date;
}
export interface ExpenseInput {
    name: string;
    amount: number;
    date: Date;
}

interface ExpenseState {
    expenses: Expense[];
    status: string;
    error: unknown
}

export const fetchExpenses = createAsyncThunk("expenses/fetchExpenses",async () =>{
        const response = await api.get(`/api/v1/expenses`)
        return response.data.data
})

export const addExpenses = createAsyncThunk("expenses/addExpense",async (expense: ExpenseInput) =>{
    const response = await api.post("/api/v1/expenses", expense)
    toast("Expense added successfully 🚀")
    return response.data.data
})

const initialState: ExpenseState  = {
    expenses: [],
    status: "idle",
    error: ""
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchExpenses.pending, (state)=>{
            state.status = "loading"
        })
        .addCase(fetchExpenses.fulfilled, (state, action) => {
            state.status = "idle"
            state.expenses = action.payload
        })
        .addCase(fetchExpenses.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
        .addCase(addExpenses.pending, (state)=>{
            state.status = "loading"
        })
        .addCase(addExpenses.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.expenses = action.payload
        })
        .addCase(addExpenses.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
    }
})

export default expenseSlice.reducer