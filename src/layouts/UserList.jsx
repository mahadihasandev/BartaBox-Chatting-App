import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect, useState } from 'react'
import SingleUser from '../components/SingleUser';
import { useSelector } from "react-redux";

function UserList() {
  const [userList,setUserList]=useState([])

let data=useSelector((state)=>(state.activeUser.value))


   useEffect(()=>{
    let arr=[];
     const db = getDatabase();
    const starCountRef = ref(db, 'users/');
      onValue(starCountRef, (snapshot) => {
        
   snapshot.forEach(item=>{
   if(data.uid != item.key){
    arr.push({...item.val(),id:item.key})
   }
    
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
            <SingleUser key={item.id} photo={item.photo} username={item.username}/>
          </>
            ))
        }
      </div>     
    </div>
    </>
  ); 
};

export default UserList;