import React, { useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, onValue, ref } from 'firebase/database';

function GroupList() {

const [allGroupdata, setAllGroupdata]=useState([])
const db = getDatabase();
//reding group data from firebase

  useEffect(()=>{
const starCountRef = ref(db, 'Mygroup/');
let array = [];
onValue(starCountRef, (snapshot) => {
  snapshot.forEach((item)=>{
   if(data.uid!=item.val().adminId){
    array.push(item.val());
      setAllGroupdata(array);
   }
  })
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
          <h4 className='userList-title'>Group List</h4>
          <BsThreeDotsVertical className='userList-threeDot'/>
        </div>
          
       {
          allGroupdata.map((item)=>(
            
            
            <>
             <div className="profile-box">
                <div className="profile-img-title-box">
                  <div className="profile-img-box">
                    <img
                      className="profile-img"
                      src={item.photo}
                      alt="Profile-image"
                    />
                  </div>
                  <div className="profile-title">
                    <h4>{item.groupName}</h4>
                     <h4>{item.adminName}</h4>
                    <p>Hi Guys, Wassup!</p>
                  </div>
                </div>
                <button>
                  Accept
                </button>
              </div>
            </>
            
          ))
        }



      </div>     
    </div>
    </>
  )
}

export default GroupList