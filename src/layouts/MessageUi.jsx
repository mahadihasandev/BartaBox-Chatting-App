import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuSearch } from 'react-icons/lu'
import chatimg from '../assets/ppic.png'

function MessageUi() {
  return (
    <div>
         
             
              <div className="userList-box-Message">
                <div className='userList-title-box '>
                  <h4 className='message-title-box'>
                    <div className='profile-box'>
        <div className='profile-img-title-box'>
          <div className='profile-img-box'>
          <img className='profile-img' src={chatimg} alt="Profile-image" />
          
          </div>
        <div className='profile-title'>
         Robin
          <p>Online</p>
        </div>
        </div> 
        
        </div>
                  </h4>
                  <BsThreeDotsVertical className='userList-threeDot'/>
                </div>
                <div>
                  <div className='chat-bubble'>
                    <h3 >Hallo whats is</h3>
                  </div>
                  </div>
              
              </div>  
                
            </div>
    
  )
}

export default MessageUi