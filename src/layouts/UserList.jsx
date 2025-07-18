import React from 'react'
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";

function UserList() {
  return (
    <>
    <div className='user-box'>
      <div className='user-search-box'>
        <LuSearch className='search-icon'/>
        <input placeholder='Search' type="text" />
        <BsThreeDotsVertical className='threeDot-icon'/>
      </div>
      <div></div>
    </div>
    </>
  )
}

export default UserList