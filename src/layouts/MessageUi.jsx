import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuSearch } from 'react-icons/lu'
import chatimg from '../assets/ppic.png'
import { IoIosSend } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";

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

            
                <div className='chat-bubble-box'>
                  <div className='chat-bubble'>
                    <h3 className='chat-bubble-text'>Hallo whats is</h3>
                  </div>
                  <p className='chat-bubble-time'>today 02.30pm</p>
                  </div>


                  <div className='chat-bubble-box'>
                  <div className='chat-bubble'>
                    <h3 className='chat-bubble-text'>Nathin just chaking out</h3>
                  </div>
                  <p className='chat-bubble-time'>02.30pm</p>
                  </div>


                  <div className='chat-bubble-box-left'>
                  <div className='chat-bubble-left'>
                    <h3 className='chat-bubble-text-left' >Nathin just chaking out</h3>
                  </div>
                  <p className='chat-bubble-time'>02.30pm</p>
                  </div>
              


                <div className='chat-bubble-box-left'>
                  <div className='chat-bubble-left'>
                    <h3 className='chat-bubble-text-left' >What are you doing</h3>
                  </div>
                  <p className='chat-bubble-time'>02.30pm</p>

                  
                  </div>
                  <div className='input-box'>
                    <input type="text" />
                    
                    <FaCamera className='camera-btn'/>
                    <MdOutlineEmojiEmotions className='emoji-btn'/>
                    <IoIosSend className='send-btn'/>
                    
                  </div>
              </div>  
                
            </div>
    
  )
}

export default MessageUi