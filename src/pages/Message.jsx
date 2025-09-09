import Grid from '@mui/material/Grid'
import React from 'react'
import GroupList from '../layouts/GroupList'
import FriendList from '../layouts/FriendList'
import MessageUi from '../layouts/MessageUi'
import { useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue,set, push, remove } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { friendLists } from '../slices/friendListSlice'

function Message() {
let [friendList,setFriendList]=useState([])
let data=useSelector((state)=>((state.activeUser.value)))
const db = getDatabase();
let dispatch=useDispatch()

 useEffect(()=>{
    const userRef = ref(db, 'friendList/');      
      onValue(userRef, (snapshot) => {
        let arr=[]
       snapshot.forEach((item) => {
        if(data.uid==item.val().receiverId||data.uid==item.val().senderId){
          arr.push({...item.val(),key:item.key})          
        }
       })
       setFriendList(arr)
      })
  },[])

let handleMessageReq =(item)=>{
 if(data.uid==item.senderId){
  dispatch(friendLists({
    name:item.receiverName,
    uid:item.receiverId,
    photo:item.photo,
    
 }))
  }else{
  dispatch(friendLists({
    name:item.senderName,
    uid:item.senderId,
    photo:item.photo,
    
  }))
 }
}
  return (
    <div>
      <div className='grid-division'>
    <Grid container spacing={3}>
      <Grid size={4}>
        <GroupList/>
         <div className={`user-box`}>
               <div className='user-search-box'>
                 <LuSearch className='search-icon'/>
                 <input placeholder='Search' type="text" />
                 <BsThreeDotsVertical className='threeDot-icon'/>
               </div>
               <div className="userList-box">
                 <div className='userList-title-box '>
                   <h4 className='userList-title'>Friend List</h4>
                   <BsThreeDotsVertical className='userList-threeDot'/>
                 </div>
                   
                 {
                   friendList.map((item,index)=>(
                     
                    <div onClick={()=>{handleMessageReq(item)}} key={index} className='profile-box'>
                 <div className='profile-img-title-box'>
                   <div className='profile-img-box'>
                   <img className='profile-img' src={item.photo} alt="Profile-image" />
                   </div>
                 <div className='profile-title'>
                  <h4>{data.uid==item.receiverId ? item.senderName :item.receiverName}</h4>
                   <p>Hi Guys, Wassup!</p>
                 </div>
                 </div> 
                 <button onClick={()=>{handleBlock(item)}}>Block</button>
                 </div>
                     
                   ))
                 }
               </div>     
             </div>
      </Grid>
      <Grid className='message-grid' size={8}>
        <MessageUi className='message-main'/>
      </Grid> 
    </Grid>  
    
  </div>
    </div>
  )
}

export default Message