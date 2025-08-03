import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect, useState } from 'react'
import SingleUser from '../components/SingleUser';

function UserList() {
  const [userList,setUserList]=useState([])
   useEffect(()=>{
    let arr=[];
     const db = getDatabase();
    const starCountRef = ref(db, 'users/');
      onValue(starCountRef, (snapshot) => {
        
   snapshot.forEach((item)=>{
    arr.push({...item.val()})
   })
    
    setUserList(arr)
  });
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
          <h4 className='userList-title'>User List</h4>
          <BsThreeDotsVertical className='userList-threeDot'/>
        </div>
          
       {  userList.map((item)=>(
          <>
            <SingleUser photo={item.photo} username={item.username}/>
          </>
            ))
        }
      </div>     
    </div>
    </>
  ); 
};

export default UserList;