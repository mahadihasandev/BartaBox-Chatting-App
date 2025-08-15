import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";


function UserList() {
  const [userList,setUserList]=useState([])
  const [concatFriendRequest,setFriendConcatReq]=useState([])
  const [concatFriendList,setConcateFriendList]=useState([])
  const [concatBlockId,setConcateBlockId]=useState([])
  
  
  
  const db = getDatabase();

  //Getting loged-in user data from redux.

let data=useSelector((state)=>(state.activeUser.value))

//Add button function and sending data to firebase and creating friendRequest/ collection.

let handleFriendRequest=(item)=>{      
       set(push(ref(db, 'friendRequest/')), {
    receiverId:item.id,
    receiverName:item.username,
    senderId:data.uid,
    senderName:data.displayName,
    photo:data.photoURL,
  });   
  }

  //Getting user data from firebase users collection.

   useEffect(()=>{
    let arr=[];   
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

    //Getting friendRequest data from firebase for dynamyc button.

    useEffect(()=>{      
      const starCountRef = ref(db, 'friendRequest/');
  onValue(starCountRef, (snapshot) => {
    let arr=[]
    snapshot.forEach((item)=>{
      arr.push(item.val().receiverId+item.val().senderId)
    })
    setFriendConcatReq(arr);
  });
    },[])

    //Getting friendList data from firebase for dynamyc button.

    useEffect(()=>{
        const userRef = ref(db, 'friendList/');          
          onValue(userRef, (snapshot) => {
            let arr=[]
           snapshot.forEach((item) => {  
              arr.push(item.val().receiverId+item.val().senderId)          
           })
           setConcateFriendList(arr)
          })
      },[])

      //Getting block/ collection data from firebase for dynamyc button.

      useEffect(()=>{
        const userRef = ref(db, 'block/');          
          onValue(userRef, (snapshot) => {
           let arr=[]
           snapshot.forEach((item) => {
           arr.push(item.val().blockbyid+item.val().blockid);                        
           })
           setConcateBlockId(arr)
          })
      },[])

      let handleUnBlocked=(item)=>{
        set(push(ref(db, 'friendList/')), {
                receiverId:data.uid,
                receiverName:data.displayName,
                senderId:item.id,
                senderName:item.username, 
              }).then(()=>{
          //       const userRef = ref(db, 'block/');          
          // onValue(userRef, (snapshot) => {
          //  snapshot.forEach((itemb) => {
          //   console.log(itemb.val());
            
          //  if(item.id==itemb.val().blockid){
          //   remove(ref(db,'block/'+itemb.key))
          //  }                    
          //  })
          // })
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
          <h4 className='userList-title'>User List</h4>
          <BsThreeDotsVertical className='userList-threeDot'/>
        </div>
          
       {  userList.map((item)=>(
          <>            
    <div className='profile-box'>
        <div className='profile-img-title-box'>
          <div className='profile-img-box'>
          <img className='profile-img' src={item.photo} alt="Profile-image" />
          </div>
        <div className='profile-title'>
          <h4>{item.username}</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        </div>
       {        concatBlockId.includes(data.uid+item.id)
                ?
                <button onClick={()=>{handleUnBlocked(item)}}>Unblock</button>
                :
                concatBlockId.includes(item.id+data.uid)
                ?
                <button>Blocked</button>
                :
                concatFriendList.includes(item.id+data.uid)||
                concatFriendList.includes(data.uid+item.id)
                ?
                <button>Friend</button>
                :
                 concatFriendRequest.includes(item.id+data.uid)||
                 concatFriendRequest.includes(data.uid+item.id) 
                ? 
                <button>panding</button>               
                :
                <button onClick={() => handleFriendRequest(item)}>Add</button>

              }
      </div>
    </>          
            ))
        }
      </div>     
    </div>
    </>
  ); 
};

export default UserList;