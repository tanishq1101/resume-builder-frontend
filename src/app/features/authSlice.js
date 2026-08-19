import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token');
let initialUser = null;
try {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    initialUser = JSON.parse(savedUser);
  }
} catch (e) {
  console.error("Error parsing user from localStorage", e);
}

const authSlice = createSlice ({
    name : 'auth',
    initialState : {
        token: initialToken || null,
        user: initialUser || null,
        loading: Boolean(initialToken) && !initialUser
    },
    reducers : {
        login(state, action) { 
            state.token = action.payload.token
            state.user = action.payload.user
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        logout(state) {
            state.token = null
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
        setLoading(state, action) {
            state.loading = action.payload
        }
    
    }
})

export const {login, logout, setLoading} = authSlice.actions

export default authSlice.reducer