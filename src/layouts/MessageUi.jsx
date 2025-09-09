import React from "react";
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


function MessageUi({ className }) {
  let data=useSelector((state)=>((state.friendList.value)))
  


  return (
    <div className={`${className}`}>
      <div className="userList-box-Message">
        <div className="userList-title-box">
          <h4 className="message-title-box">
            <div className="profile-img-box">
              <img className="profile-img" src={data.photo} alt="Profile-image" />
            </div>
            <div className="profile-title">
              {data.name}
              <p>Online</p>
            </div>
          </h4>
          <BsThreeDotsVertical className="userList-threeDot" />
        </div>

        <div className="chat-bubble-section">
          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box">
              <div className="chat-bubble">
                <h3 className="chat-bubble-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  nemo explicabo, excepturi, commodi aliquam debitis ipsam eius
                  harum tenetur enim necessitatibus officiis maxime veritatis
                  recusandae optio laboriosam. Maxime minima aut itaque quod
                  pariatur earum dolor aliquam et unde cumque quibusdam,
                  officiis accusantium, saepe consectetur in molestiae iusto,
                  harum qui id doloribus dicta quisquam! Molestias vel esse
                  perferendis asperiores dolorum odit? Incidunt earum officiis
                  voluptates nesciunt, blanditiis ipsum numquam cupiditate
                  adipisci, assumenda dicta, corporis quo officia dolor illo?
                  Libero repudiandae voluptatum provident quidem soluta
                  temporibus praesentium debitis officia, voluptas alias, dolore
                  possimus quas illo error nihil placeat culpa assumenda.
                  Placeat, dolor?
                </h3>
              </div>
            </div>
            <p className="chat-bubble-time">today 02.30pm</p>
          </div>

          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box">
              <div className="chat-bubble">
                <h3 className="chat-bubble-text">Are you online</h3>
              </div>
            </div>
            <p className="chat-bubble-time">today 02.31pm</p>
          </div>

          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box-left">
              <div className="chat-bubble-left">
                <h3 className="chat-bubble-text-left">yes sorry i was busy</h3>
              </div>
            </div>
            <p className="chat-bubble-time-left">today 02.31pm</p>
          </div>

          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box-left">
              <div className="chat-bubble-left">
                <h3 className="chat-bubble-text-left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Libero quos ad dignissimos et non, commodi mollitia cumque
                  nihil ipsa rerum iure excepturi dolores ipsum neque architecto
                  enim aperiam ex saepe consequuntur, amet veniam? Ipsam eaque
                  veritatis iure nam vitae sequi ducimus nulla voluptatem
                  impedit quia? Non fuga modi ducimus voluptatem excepturi alias
                  nisi voluptas eos saepe omnis laboriosam ipsa autem dolores
                  iure deleniti itaque accusantium ipsum facere, cumque laborum
                  eaque incidunt harum earum iste. Illo accusamus impedit eaque
                  ipsam cupiditate qui aperiam! Accusamus asperiores ut
                  repellendus eos aut autem quis consequatur commodi, earum
                  nobis fugiat. Odio facilis voluptates unde quidem!
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
                />;
                
               
              </div>
            </div>
            <p className="chat-bubble-time">today 02.33pm</p>
          </div>

          <div className="chat-bubble-wrapper">
            <div className="chat-bubble-box-left">
              <div className="chat-bubble-left">

                <ModalImage small={registration}
                  large={registration}
                  alt="Hello World!"
                />;
               
              </div>
            </div>
            <p className="chat-bubble-time-left">today 02.31pm</p>
          </div>
        </div>
        <div className="input-box">
          <input type="text" />

          <FaCamera className="camera-btn" />
          <MdOutlineEmojiEmotions className="emoji-btn" />
          <IoIosSend className="send-btn" />
        </div>
      </div>
    </div>
  );
}

export default MessageUi;
