import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{
        return user
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async()=> {
    localStorage.removeItem('user')
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state)=>{
                state.isLoading = false
                state.isError = true
                state.user = null
            })
            .addCase(logout.fulfilled, (state)=>{
                state.user = null
            })
    }
}) 

export const {reset} = authSlice.actions
export default authSlice.reducer
