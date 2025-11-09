import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    selectedProduct: null,
    UserInfo: null,
}

export const appSlice = createSlice({
    name: "Ecommerce",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(
                (item) => item.id === action.payload.id
            );
            if (item) {
                item.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
        },

        addData: (state, action) => {
            state.selectedProduct = { ...action.payload };
        },
        incrementQuantity: (state, action) => {
            const items = state.products.find((item) => item.id === action.payload)
            items.quantity++
        },
        decrementQuantity: (state, action) => {
            const items = state.products.find((item) => item.id === action.payload)
            if (items.quantity === 1) {
                items.quantity = 1
            } else {
                items.quantity--
            }
        },
        deleteItem: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload)
        },

        deleteِAllItem: (state, action) => {
            state.products = []
        },

        disblayButton: (state, action) => {
            state.disblayButton = action.payload
        },
        setUSer: (state, action) => {
            state.UserInfo = action.payload
        },
        clearUser: (state, action) => {
            state.UserInfo = null
        },
    }
})

export const { addToCart, addData, incrementQuantity, decrementQuantity, deleteItem, deleteِAllItem, setUSer, clearUser } = appSlice.actions
export default appSlice.reducer