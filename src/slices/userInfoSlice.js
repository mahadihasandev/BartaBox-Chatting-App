import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
  name:'info',
  initialState: {
    value: localStorage.getItem('activeUser')?JSON.parse(localStorage.getItem('activeUser')):null,
  },
  reducers: {
    userDetails: (state,actions) => {
      state.value=actions.payload
   
    },
     
    
  },
})

export const { userDetails } = userInfoSlice.actions

export default userInfoSlice.reducer