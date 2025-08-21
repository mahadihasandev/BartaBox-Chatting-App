import React, { useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import PP from "../assets/ppic.png"
import { useSelector } from 'react-redux';

function BlockedUsers() {
const [blockUser,setBlockUser]=useState([])

let data=useSelector((state)=>(state.activeUser.value))

  const db = getDatabase();

  //Getting data from firebase block collection.
  
   useEffect(()=>{
      const userRef = ref(db, 'block/');      
        onValue(userRef, (snapshot) => {
          let arr=[]
         snapshot.forEach((item) => {
         if(data.uid==item.val().blockbyid){
            arr.push({
              id:item.key,
              blockName:item.val().blockName,
              blockid:item.val().blockid,
            })
         }else if(data.uid==item.val().blockid){
            arr.push({
              id:item.key,
              blockbyName:item.val().blockbyName,
              blockbyid:item.val().blockbyid,
            })
         }         
         })
         setBlockUser(arr)
        })
    },[])

  //Unblock button function && sending data to firbase friendList/ collection.

  let handleUnBlock=(item)=>{

    set(push(ref(db, 'friendList/')), {
        receiverId:data.uid,
        receiverName:data.displayName,
        senderId:item.blockid,
        senderName:item.blockName,
        
      }).then(()=>{
        remove(ref(db, 'block/'+item.id))
      })   
      }

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
          blockUser.map((item,index)=>(
            
           <div key={index} className='profile-box'>
        <div className='profile-img-title-box'>
          <div className='profile-img-box'>
          <img className='profile-img' src={PP} alt="Profile-image" />
          </div>
        <div className='profile-title'>
         <h4>{item.blockName}</h4>
         <h4>{item.blockbyName}</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        </div>
        {
          item.blockid
          ?
          <button onClick={()=>{handleUnBlock(item)}}>Unblock</button>
          :
          <button>Blocked</button>
        }
        
        </div>
          ))
        }
      </div>     
    </div>
    </>
  )
}

export default BlockedUsers