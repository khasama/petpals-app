import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import instance from '../../configs/axios.config';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        currentUser: {},
        cart: [],
        total: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.currentUser = action.payload.user;
                state.cart = action.payload.cart;
                let total = 0;
                action.payload.cart.map((e, i) => total += parseInt(e.quantity * e.product.price));
                state.total = total;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.currentUser = {};
                state.cart = [];
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.currentUser = action.payload;
            })
            .addCase(updateInfor.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                let total = 0;
                action.payload.map((e, i) => total += parseInt(e.quantity * e.product.price));
                state.total = total;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                let total = 0;
                action.payload.map((e, i) => total += parseInt(e.quantity * e.product.price));
                state.total = total;
            })
            .addCase(clear.fulfilled, (state, action) => {
                state.cart = [];
                state.total = 0;
            })
    },
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await instance.post(`/auth/login`, { email, password });
        if (res.status == 200) {
            if (res.data.status == 'success') {
                await SecureStore.setItemAsync('access_token', res.data.data.accessToken);
                return {
                    user: {
                        id: res.data.data.id,
                        role: res.data.data.role,
                        fullName: res.data.data.fullName,
                        avatar: res.data.data.avatar,
                        phone: res.data.data.phone,
                        address: res.data.data.address,
                        email: res.data.data.email,
                    },
                    cart: res.data.data.cart
                };
            } else {
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const res = await instance.get(`/auth/logout`);
        if (res.status == 200) {
            if (res.data.status == 'success') {
                await SecureStore.deleteItemAsync('access_token');
            } else {
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
    try {
        const id = await SecureStore.getItemAsync('uid');
        const res = await instance.post(`/auth/refresh-token`, { id });
        if (res.status == 200) {
            if (res.data.status == 'success') {
                await SecureStore.setItemAsync('access_token', res.data.data.access_token);
                return res.data.data.user;
            } else {
                await SecureStore.deleteItemAsync('access_token');
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export const updateInfor = createAsyncThunk('auth/updateInfor', async ({ id, username, email, avatar }, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        if (avatar) {
            formData.append('avatar', avatar.base64);
        }
        formData.append('idUser', id);
        formData.append('username', username);
        formData.append('email', email);
        const res = await instance.post(`/user/update`, formData);
        if (res.status == 200) {
            if (res.data.status == 'success') {
                return res.data.data;
            } else {
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export const addCart = createAsyncThunk('auth/addCart', async ({ idUser, idProduct, quantity }, { rejectWithValue }) => {
    try {
        const res = await instance.post(`/cart/add`, { idUser, idProduct, quantity });
        if (res.status == 200) {
            if (res.data.status == 'success') {
                return res.data.data;
            } else {
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export const updateCart = createAsyncThunk('auth/updateCart', async ({ idUser, idProduct, quantity }, { rejectWithValue }) => {
    try {
        const res = await instance.post(`/cart/update`, { idUser, idProduct, quantity });
        if (res.status == 200) {
            if (res.data.status == 'success') {
                return res.data.data;
            } else {
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export const clear = createAsyncThunk('auth/clear', async (_, { rejectWithValue }) => {
    return null;
});

export default authSlice;