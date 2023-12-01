import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";
import { toast } from 'react-toastify';



interface Product {
    _id: number;
    buying_price: number;
    selling_price: number;
    category: string;
    quantity: number;
    name: string;
    stock: number;
    img: string;
}

interface ProductInput {
    buying_price: number;
    selling_price: number;
    category: string;
    name: string;
    stock: number;
}

interface ProductState {
    products: Product[];
    cart: Product[];
    totalPrice: number;
    totalQuantity: number;
    status: string;
    error: unknown;
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await api.get("/api/v1/products");
    console.log(response.data);
    return response.data.data;
});

export const addProducts = createAsyncThunk("products/addProducts", async (product: ProductInput) => {
    const response = await api.post("/api/v1/products", { ...product, quantinty: 0 });
    console.log(response.data);
    toast("products added successfully 🤭")
    return response.data.data;
});

export const editProduct = createAsyncThunk("products/editProduct", async (product: ProductInput) => {
    const response = await api.put("/api/v1/products", {...product, quantinty: 0 });
    console.log(response.data);
    toast("products edited successfully 🤭")
    return response.data.data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId: string) => {
    const response = await api.delete(`/api/v1/products/${productId}`);
    console.log(response.data);
    toast("products deleted successfully 🤭")
    return response.data.data;
});



const initialState: ProductState = {
    products: [],
    cart: [],
    totalPrice: 0,
    totalQuantity: 0,
    status: "idle",
    error: "",
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const find = state.cart.findIndex((item) => item._id === action.payload._id);
            if (find >= 0) {
                state.cart[find].quantity += 1;
            } else {
                state.cart.push(action.payload);
            }
        },
        getCartTotal: (state) => {
            const { totalQuantity, totalPrice } = state.cart.reduce(
              (cartTotal, cartItem) => {
                console.log("carttotal", cartTotal);
                console.log("cartitem", cartItem);
                const { selling_price, quantity } = cartItem;
                console.log(selling_price, quantity);
                const itemTotal = selling_price * quantity;
                cartTotal.totalPrice += itemTotal;
                cartTotal.totalQuantity += quantity;
                return cartTotal;
              },
              {
                totalPrice: 0,
                totalQuantity: 0,
              }
            );
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQuantity = totalQuantity;
          },
          removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
          },
          increaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
              if (item._id === action.payload) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
          },
          decreaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
              if (item._id === action.payload) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            });
          },
          clearCart: (state) => {
            state.cart = [];
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.payload;
                toast("Error could not find products")
            })
            .addCase(addProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = [...state.products, action.payload];
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.payload;
            })
    },
});

export const { addToCart, getCartTotal, decreaseItemQuantity, increaseItemQuantity, removeItem, clearCart } = productSlice.actions 

export default productSlice.reducer;