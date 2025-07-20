import React from 'react'
import ProfileImg from '../assets/profileImg.png'

function SingleUser() {
  return (
    <>
    <div className='profile-box'>
        <div className='profile-img-title-box'>
          <div className='profile-img-box'>
          <img className='profile-img' src={ProfileImg} alt="Profile-image" />
          </div>
        <div className='profile-title'>
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        </div>
        <button>Join</button>
      </div>
    </>
  )
}

export default SingleUser