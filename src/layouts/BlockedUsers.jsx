import React, { useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, onValue, ref } from 'firebase/database';
import PP from "../assets/ppic.png"

function BlockedUsers() {
const [blockUser,setBlockUser]=useState([])


  const db = getDatabase();
   useEffect(()=>{
      const userRef = ref(db, 'block/');      
        onValue(userRef, (snapshot) => {
          let arr=[]
         snapshot.forEach((item) => {
         
         arr.push({...item.val()})
         })
         setBlockUser(arr)
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
          <h4 className='userList-title'>Blocked Users</h4>
          <BsThreeDotsVertical className='userList-threeDot'/>
        </div>
          
        {
          blockUser.map((item)=>(
            <>
           <div className='profile-box'>
        <div className='profile-img-title-box'>
          <div className='profile-img-box'>
          <img className='profile-img' src={PP} alt="Profile-image" />
          </div>
        <div className='profile-title'>
         <h4>{item.blockName}</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        </div> 
        <button>Unblock</button>
        </div>
            </>
          ))
        }
      </div>     
    </div>
    </>
  )
}

export default BlockedUsers