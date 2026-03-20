import React, { useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue,set, push, remove } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { friendLists } from '../slices/friendListSlice';
import defaultProfileImg from '../assets/profileImg.png';

function FriendList() {
let [friendList,setFriendList]=useState([])
let data=useSelector((state)=>((state.activeUser.value)))
let dispatch = useDispatch()
let navigate = useNavigate()

  const db = getDatabase();

  //Getting fireBase friendList data

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
  },[db, data?.uid])

  //Block Button Function sendig data to firebase block collection

  let handleBlock=(item, e)=>{
    e.stopPropagation(); // Prevent navigation when clicking block button
    if(data.uid==item.senderId){
      set(push(ref(db,'block/')), {
      blockName:item.receiverName,
      blockid: item.receiverId,
      blockbyName:item.senderName,
      blockbyid: item.senderId,    
  }).then(()=>{
    remove(ref(db, 'friendList/'+item.key))
  })
    }else{
         set(push(ref(db,'block/')), {
      blockName:item.senderName,
      blockid: item.senderId,
      blockbyName:item.receiverName,
      blockbyid: item.receiverId,
  }).then(()=>{
    remove(ref(db,'friendList/'+item.key))
  })
  }
  }

  //Handle friend click to open chat
  let handleFriendClick = (item) => {
    if(data.uid==item.senderId){
      dispatch(friendLists({
        name:item.receiverName,
        uid:item.receiverId,
        photo:item.photo,
      }))
    } else {
      dispatch(friendLists({
        name:item.senderName,
        uid:item.senderId,
        photo:item.photo,
      }))
    }
    navigate('/pages/messages')
  }
  
  return (
    <>
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
          friendList.length === 0 ? (
            <div className='no-user-message'>
              <h3>No friends found</h3>
              <p>Add friends to start chatting</p>
            </div>
          ) : (
            friendList.map((item,index)=>(
              
             <div key={index} className='profile-box' onClick={()=>{handleFriendClick(item)}}>
          <div className='profile-img-title-box'>
            <div className='profile-img-box'>
            <img 
              className='profile-img' 
              src={item.photo || defaultProfileImg} 
              alt="Profile-image"
              onError={(e) => {
                e.target.src = defaultProfileImg;
              }}
            />
            </div>
          <div className='profile-title'>
           <h4>{data.uid==item.receiverId ? item.senderName :item.receiverName}</h4>
            <p>Hi Guys, Wassup!</p>
          </div>
          </div> 
          <button onClick={(e)=>{handleBlock(item, e)}}>Block</button>
          </div>
              
            ))
          )
        }
      </div>     
    </div>
    </>
  )
}

export default FriendList