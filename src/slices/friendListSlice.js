import { createSlice } from '@reduxjs/toolkit'

export const friendListSlice = createSlice({
  name:'friendList',
  initialState: {
    value: localStorage.getItem('friendLists')?JSON.parse(localStorage.getItem('friendLists')):null,
  },
  reducers: {
    friendLists: (state,actions) => {
      
      state.value=actions.payload
      localStorage.setItem('friendLists',JSON.stringify(state.value))
    
    },
     
    
  },
})

export const { friendLists } = friendListSlice.actions

export default friendListSlice.reducer