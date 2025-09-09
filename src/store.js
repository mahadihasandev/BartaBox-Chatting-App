import { configureStore } from '@reduxjs/toolkit'
import  userInfoSlice from './slices/userInfoSlice'
import friendListSlice from './slices/friendListSlice'

export default configureStore({
  reducer: {
    activeUser:userInfoSlice,
    friendList:friendListSlice,
  },
})