import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from "../components/SingleUser";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

function FriendRequest() {
  const db = getDatabase();
  let [friendReq, setFriendReq] = useState([]);

  let data = useSelector((state) => state.activeUser.value);


   let handleAccept = (item) => {
    set(push(ref(db, "friendList/")), {
      ...item,
    }).then(
      remove(ref(db, "friendRequest/"+item.id))
    )
  };
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverId == data.uid) {
          arr.push({ ...item.val(),id:item.key});
        }
      });
      setFriendReq(arr);
    });
  }, []);

 

  return (
    <>
      <div className="user-box">
        <div className="user-search-box">
          <LuSearch className="search-icon" />
          <input placeholder="Search" type="text" />
          <BsThreeDotsVertical className="threeDot-icon" />
        </div>
        <div className="userList-box">
          <div className="userList-title-box ">
            <h4 className="userList-title">Friend Request</h4>
            <BsThreeDotsVertical className="userList-threeDot" />
          </div>

          <>
            {friendReq.map((item) => (
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
                    <h4>{item.senderName}</h4>
                    <p>Hi Guys, Wassup!</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleAccept(item);
                  }}
                >
                  Accept
                </button>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
}

export default FriendRequest;
