import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import noteService from'./noteService';

const initialState={
    notes:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:''
}



// Get notes
export const getNotes = createAsyncThunk("notes/getAll", async (ticketId, thunkAPI) => {
  try {
    // Fetching the user token from the auth
    // and passing along the data with the servers
    const token = thunkAPI.getState().auth.user.token
    // next line mei token as 2nd parameter pass karna bhul gaya  which lead to jwt malformed error
    return await noteService.getNotes(ticketId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// create a Ticket Note
export const createNote = createAsyncThunk("notes/create", async ({ noteText, ticketId }, thunkAPI) => {
  try {
    // Fetching the user token from the auth
    // and passing along the data with the servers
    const token = thunkAPI.getState().auth.user.token
    // next line mei token as 2nd parameter pass karna bhul gaya  which lead to jwt malformed error
    return await noteService.createNote(noteText,ticketId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})




export const noteSlice=createSlice({
    name:'note',
    initialState:initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
          .addCase(getNotes.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
          })
          .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(createNote.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createNote.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes.push(action.payload)  
          })
          .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          
    }


})

export const {reset}=noteSlice.actions;
export default noteSlice.reducer

