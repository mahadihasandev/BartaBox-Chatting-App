import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import chatimg from "../assets/ppic.png";
import { IoIosSend } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import loginImg1 from "../assets/loginImg1.png";
import registration from "../assets/registration1.png";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
 

function MessageUi({ className }) {
  let currentChat = useSelector((state) => state.friendList.value)
  let currentLogin = useSelector((state) => state.activeUser.value)
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const db = getDatabase();
    
    console.log(messages,"messages")
    
    
    
    
  let handleSend = () => {
    set(push(ref(db, "sendMessage/")), {
      message:input,
      messagesenderId:currentLogin.uid,
      massagesenderName:currentLogin.displayName,
      messagereceiverId:currentChat.uid,
      messagereceiverName:currentChat.name,
      
    }).then(() => {
      setInput("");
    });
  };

  useEffect(() => {
    const userRef = ref(db, "sendMessage/");
    let arr = [];
    onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
          let messageData=item.val()
        if ((messageData?.messagesenderId==currentLogin?.uid&&messageData?.messagereceiverId==currentChat?.uid)||
          (messageData?.messagesenderId==currentChat?.uid&&messageData?.messagereceiverId==currentLogin?.uid))
         {
          arr.push({...item.val()});
        }
      });
      setMessages(arr);

    });
  },[handleSend]);

  return (
    <div className={`${className}`}>
      <div className="userList-box-Message">
        <div className="userList-title-box">
          <h4 className="message-title-box">
            <div className="profile-img-box">
              <img
                className="profile-img"
                src={currentChat?.photo ? currentChat.photo : chatimg}
                alt="Profile-image"
              />
            </div>
            <div className="profile-title">
              {currentChat?.name ? currentChat.name : "Select a friend"}
              <p>Online</p>
            </div>
          </h4>
          <BsThreeDotsVertical className="userList-threeDot" />
        </div>
       
        <div className="chat-bubble-section">
          

          

          

          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box-left">
              <div className="chat-bubble-left">
                <h3 className="chat-bubble-text-left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                 
                </h3>
              </div>
            </div>
            <p className="chat-bubble-time-left">02.30pm</p>
          </div>

          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box">
              <div className="chat-bubble">
                <h3 className="chat-bubble-text">See you soon</h3>
              </div>
            </div>
            <p className="chat-bubble-time">today 02.32pm</p>
          </div>

          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box">
              <div className="chat-bubble">
                <h3 className="chat-bubble-text">Bye</h3>
              </div>
            </div>
            <p className="chat-bubble-time">today 02.33pm</p>
          </div>

          {/* chatting image */}
          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box">
              <div className="chat-bubble">
                <ModalImage
                  small={loginImg1}
                  large={loginImg1}
                  alt="Hello World!"
                />
                ;
              </div>
            </div>
            <p className="chat-bubble-time">today 02.33pm</p>
          </div>

          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box-left">
              <div className="chat-bubble-left">
                <ModalImage
                  small={registration}
                  large={registration}
                  alt="Hello World!"
                />
                ;
              </div>
            </div>
            <p className="chat-bubble-time-left">today 02.31pm</p>
          </div>

          {messages.map((item) => (
            
            currentLogin?.uid==item?.messagesenderId?(<div className="chat-bubble-wrapper">
              <div className="chat-bubble-box">
                <div className="chat-bubble">
                  <h3 className="chat-bubble-text">{item.message}</h3>
                </div>
              </div>
              <p className="chat-bubble-time-left">today 02.31pm</p>
            </div>)
            :
            <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box-left">
              <div className="chat-bubble-left">
                <h3 className="chat-bubble-text-left">
                  {item.message}
                 
                </h3>
              </div>
            </div>
            <p className="chat-bubble-time-left">02.30pm</p>
          </div>
          
          ))}
        </div>
        <div className="input-box">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
          />

          <FaCamera className="camera-btn" />
          <MdOutlineEmojiEmotions className="emoji-btn" />
          <IoIosSend onClick={handleSend} className="send-btn" />
        </div>
      </div>
    </div>
  );
}

export default MessageUi;
