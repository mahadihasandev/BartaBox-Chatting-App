import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSend, IoMdCall, IoMdVideocam } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import defaultProfileImg from "../assets/profileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { friendLists } from "../slices/friendListSlice";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { toast } from "react-toastify";

function MessageUi({ className }) {
  const currentChat = useSelector((state) => state.friendList.value);
  const currentLogin = useSelector((state) => state.activeUser.value);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const chatScrollRef = useRef(null);
  const db = getDatabase();

  const currentChatKey = useMemo(() => {
    if (!currentChat?.uid || !currentLogin?.uid) return null;
    return [currentLogin.uid, currentChat.uid].sort().join("-");
  }, [currentChat?.uid, currentLogin?.uid]);

  const filteredFriends = useMemo(() => {
    if (!search.trim()) return friends;
    return friends.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [friends, search]);

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just now";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pickConversation = (item) => {
    dispatch(friendLists(item));
  };

  const handleSend = () => {
    if (!input.trim() || !currentChat?.uid || !currentLogin?.uid) return;

    set(push(ref(db, "sendMessage/")), {
      message: input.trim(),
      messageType: "text",
      messagesenderId: currentLogin.uid,
      massagesenderName: currentLogin.displayName,
      messagereceiverId: currentChat.uid,
      messagereceiverName: currentChat.name,
      chatKey: currentChatKey,
      timestamp: Date.now(),
    }).then(() => setInput(""));
  };

  const handleSendImage = () => {
    if (!currentChat?.uid || !currentLogin?.uid) return;

    const imageUrl = window.prompt("Paste image URL");
    if (!imageUrl) return;

    set(push(ref(db, "sendMessage/")), {
      message: "Sent an image",
      messageType: "image",
      imageUrl,
      messagesenderId: currentLogin.uid,
      massagesenderName: currentLogin.displayName,
      messagereceiverId: currentChat.uid,
      messagereceiverName: currentChat.name,
      chatKey: currentChatKey,
      timestamp: Date.now(),
    });
  };

  const handleMessageKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const startCall = (callType) => {
    if (!currentChatKey || !currentChat?.name) {
      toast.info("Select a conversation first");
      return;
    }

    const roomName = `bartabox-${currentChatKey}`;
    const config =
      callType === "audio"
        ? "#config.startWithAudioMuted=false&config.startWithVideoMuted=true"
        : "#config.startWithVideoMuted=false&config.startWithAudioMuted=false";

    const url = `https://meet.jit.si/${roomName}${config}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(`${callType === "audio" ? "Audio" : "Video"} call started`);
  };

  useEffect(() => {
    if (!currentLogin?.uid) return undefined;

    const friendRef = ref(db, "friendList/");
    const unsubscribe = onValue(friendRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        const value = item.val();
        if (value.receiverId === currentLogin.uid || value.senderId === currentLogin.uid) {
          const friend =
            value.receiverId === currentLogin.uid
              ? {
                  uid: value.senderId,
                  name: value.senderName,
                  photo: value.photo || defaultProfileImg,
                }
              : {
                  uid: value.receiverId,
                  name: value.receiverName,
                  photo: value.photo || defaultProfileImg,
                };

          if (!arr.find((x) => x.uid === friend.uid)) {
            arr.push(friend);
          }
        }
      });
      setFriends(arr);
    });

    return () => unsubscribe();
  }, [db, currentLogin?.uid]);

  useEffect(() => {
    const userRef = ref(db, "sendMessage/");
    const unsubscribe = onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        const messageData = item.val();
        const isCurrentChat =
          messageData?.chatKey === currentChatKey ||
          ((messageData?.messagesenderId === currentLogin?.uid &&
            messageData?.messagereceiverId === currentChat?.uid) ||
            (messageData?.messagesenderId === currentChat?.uid &&
              messageData?.messagereceiverId === currentLogin?.uid));

        if (isCurrentChat) {
          arr.push({ ...messageData, id: item.key });
        }
      });

      setMessages(arr.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0)));
    });

    return () => {
      unsubscribe();
      setMessages([]);
    };
  }, [db, currentLogin?.uid, currentChat?.uid, currentChatKey]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, currentChat?.uid]);

  return (
    <div className={className}>
      <div className={`messenger-layout ${currentChat?.uid ? "chat-active" : ""}`}>
        <aside className="conversation-sidebar">
          <div className="conversation-sidebar-head">
            <h3>Chats</h3>
            <BsThreeDotsVertical />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="conversation-search"
            placeholder="Search chats"
            type="text"
          />

          <div className="conversation-list">
            {filteredFriends.length === 0 && (
              <div className="empty-state">
                <p>No conversations yet.</p>
              </div>
            )}
            {filteredFriends.map((friend) => (
              <button
                key={friend.uid}
                className={`conversation-item ${currentChat?.uid === friend.uid ? "active" : ""}`}
                onClick={() => pickConversation(friend)}
              >
                <img src={friend.photo || defaultProfileImg} alt={friend.name} />
                <div>
                  <h4>{friend.name}</h4>
                  <p>Tap to continue chat</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="userList-box-Message">
          <div className="userList-title-box message-topbar">
            <button 
              onClick={() => dispatch(friendLists(null))}
              className="back-btn-mobile"
              title="Back to conversations"
            >
              <MdArrowBack />
              <span>Back</span>
            </button>
            <h4 className="message-title-box">
              <div className="profile-img-box">
                <img
                  className="profile-img"
                  src={currentChat?.photo || defaultProfileImg}
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = defaultProfileImg;
                  }}
                />
              </div>
              <div className="profile-title">
                {currentChat?.name ? currentChat.name : "Select a friend"}
                <p>{currentChat?.isGroup ? "Group chat" : "Active now"}</p>
              </div>
            </h4>

            <div className="message-action-buttons">
              <button onClick={() => startCall("audio")} className="icon-action-btn" type="button">
                <IoMdCall />
              </button>
              <button onClick={() => startCall("video")} className="icon-action-btn" type="button">
                <IoMdVideocam />
              </button>
              <button className="icon-action-btn" type="button">
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>

          <div ref={chatScrollRef} className="chat-bubble-section">
            {!currentChat?.name ? (
              <div className="no-chat-selected">
                <div className="no-chat-icon">💬</div>
                <h3>Select a friend to start chatting</h3>
                <p>Messenger style chat now supports image messages and voice/video call links.</p>
              </div>
            ) : (
              <div className="chat-message-stack">
                {messages.length === 0 && (
                  <div className="empty-state message-empty">
                    <h3>No messages yet</h3>
                    <p>Start the conversation now.</p>
                  </div>
                )}

                {messages.map((item) => {
                  const mine = currentLogin?.uid === item.messagesenderId;
                  return (
                    <div key={item.id} className="chat-bubble-wrapper">
                      <div className={mine ? "chat-bubble-box" : "chat-bubble-box-left"}>
                        <div className={mine ? "chat-bubble" : "chat-bubble-left"}>
                          {item.messageType === "image" && item.imageUrl ? (
                            <img className="chat-image" src={item.imageUrl} alt="Shared media" />
                          ) : (
                            <h3 className={mine ? "chat-bubble-text" : "chat-bubble-text-left"}>
                              {item.message}
                            </h3>
                          )}
                        </div>
                      </div>
                      <p className={mine ? "chat-bubble-time" : "chat-bubble-time-left"}>
                        {formatTime(item.timestamp)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {currentChat?.name && (
            <div className="input-box">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleMessageKeyDown}
                type="text"
                placeholder="Aa"
              />

              <FaImage onClick={handleSendImage} className="camera-btn" />
              <MdOutlineEmojiEmotions className="emoji-btn" />
              <IoIosSend onClick={handleSend} className="send-btn" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MessageUi;
