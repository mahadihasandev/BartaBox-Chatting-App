import React, { use, useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

function FriendList() {
let [friendList,setFriendList]=useState([])

let data=useSelector((state)=>((state.activeUser.value)))
  const db = getDatabase();
  useEffect(()=>{
    const userRef = ref(db, 'friendList/');
      
      onValue(userRef, (snapshot) => {
        let arr=[]
       snapshot.forEach((item) => {
        if(data.uid==item.val().receiverId){
          arr.push({...item.val()})
          setFriendList(arr)
        }
       })
      })
  },[])
  return (
    <>
        <div className='user-box'>
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
          friendList.map((item)=>(
            <>
           <div className='profile-box'>
        <div className='profile-img-title-box'>
          <div className='profile-img-box'>
          <img className='profile-img' src={item.photo} alt="Profile-image" />
          </div>
        <div className='profile-title'>
          <h4>{item.senderName}</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        </div> 
        </div>
            </>
          ))
        }



      </div>     
    </div>
    </>
  )
}

export default FriendList