import React, { useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue,set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

function FriendList() {
let [friendList,setFriendList]=useState([])
let data=useSelector((state)=>((state.activeUser.value)))

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
  },[])

  //Block Button Function sendig data to firebase block collection

  let handleBlock=(item)=>{
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
          friendList.map((item,index)=>(
            
           <div key={index} className='profile-box'>
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
    </>
  )
}

export default FriendList