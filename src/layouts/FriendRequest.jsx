import React from 'react'

function FriendRequest() {
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
          <h4 className='userList-title'>Friend Request</h4>
          <BsThreeDotsVertical className='userList-threeDot'/>
        </div>
          
        <SingleUser/>
        <SingleUser/>
        <SingleUser/>
        <SingleUser/>
        <SingleUser/>

      </div>     
    </div>
    </>
  )
}

export default FriendRequest