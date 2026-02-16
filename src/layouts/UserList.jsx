import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

function UserList() {
  const [userList,setUserList]=useState([])
  const [concatFriendRequest,setFriendConcatReq]=useState([])
  const [concatFriendList,setConcateFriendList]=useState([])
  const [concatBlockId,setConcateBlockId]=useState([])
  const [blockKey,setBlockKey]=useState('')
  const [searchUser,setSearchUser]=useState([])
  const [searchInput,setSearchInput]=useState('')
  const [currentPage, setCurrentPage] = useState(0)
  
  const db = getDatabase();

  //Getting loged-in user data from redux.
  let data=useSelector((state)=>(state.activeUser.value))

  //Getting user data from firebase users collection.
  useEffect(()=>{
    let arr=[];   
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {        
      snapshot.forEach(item=>{
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key})
        }
      })   
      setUserList(arr)
      setSearchUser(arr)
    });
  },[])

  //Getting friendRequest data from firebase for dynamic button.
  useEffect(()=>{      
    const starCountRef = ref(db, 'friendRequest/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        arr.push(item.val().receiverId+item.val().senderId)
      })
      setFriendConcatReq(arr);
    });
  },[])

  //Add button function and sending data to firebase and creating friendRequest/ collection.
  let handleFriendRequest=(item)=>{      
    set(push(ref(db, 'friendRequest/')), {
      receiverId:item.id,
      receiverName:item.username,
      senderId:data.uid,
      senderName:data.displayName,
      photo:data.photoURL,
    });   
  }

  //Getting friendList data from firebase for dynamic button.
  useEffect(()=>{
    const userRef = ref(db, 'friendList/');          
    onValue(userRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item) => {  
        arr.push(item.val().receiverId+item.val().senderId)
      })
      setConcateFriendList(arr)
    })
  },[])

  //Getting block/ collection data from firebase for dynamic button.
  useEffect(()=>{
    const userRef = ref(db, 'block/');          
    onValue(userRef, (snapshot) => {
      let arr=[]
      let arrb=[]
      snapshot.forEach((item) => {
        arr.push(item.val().blockbyid+item.val().blockid);   
        arrb.push({blockid:item.val().blockid,key:item.key})                   
      })
      setConcateBlockId(arr)
      setBlockKey(arrb)
    })
  },[])
  
  //Unblock button function and sending data to firebase and creating friendList/ collection.
  let handleUnblock=(item)=>{
    for(let itemb of blockKey){
      if(item.id==itemb.blockid){
        set(push(ref(db, 'friendList/')), {
          receiverId:item.id,
          receiverName:item.username,
          senderId:data.uid,
          senderName:data.displayName,
          photo:data.photoURL,
        }).then(()=>{
          remove((ref(db, 'block/'+itemb.key)))
        })
      } 
    }
  }

  let handleSearch=(e)=>{
    setSearchInput(e.target.value)
    let search=userList.filter((item)=>(item.username.toLowerCase().includes(e.target.value.toLowerCase())))
    setSearchUser(search);
    setCurrentPage(0); // Reset to first page when searching
  }

  // Get current user to display
  const displayList = searchInput.length > 0 ? searchUser : userList;
  const currentUser = displayList[currentPage] || null;
  const totalPages = displayList.length;

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get button state for current user
  const getButtonState = (item) => {
    if (!item) return null;
    
    if (concatBlockId.includes(data.uid + item.id)) {
      return { text: 'Unblock', action: () => handleUnblock(item), variant: 'unblock' };
    }
    if (concatBlockId.includes(item.id + data.uid)) {
      return { text: 'Blocked', action: null, variant: 'blocked' };
    }
    if (concatFriendList.includes(item.id + data.uid) || concatFriendList.includes(data.uid + item.id)) {
      return { text: 'Friend', action: null, variant: 'friend' };
    }
    if (concatFriendRequest.includes(item.id + data.uid) || concatFriendRequest.includes(data.uid + item.id)) {
      return { text: 'Pending', action: null, variant: 'pending' };
    }
    return { text: 'Add Friend', action: () => handleFriendRequest(item), variant: 'add' };
  };

  const buttonState = getButtonState(currentUser);

  return (
    <>
    <div className='user-box'>
      <div className='user-search-box'>
        <LuSearch className='search-icon'/>
        <input onChange={handleSearch} value={searchInput} placeholder='Search users...' type="text" />
        <BsThreeDotsVertical className='threeDot-icon'/>
      </div>
      <div className="userList-box">
        <div className='userList-title-box'>
          <h4 className='userList-title'>User List</h4>
          <BsThreeDotsVertical className='userList-threeDot'/>
        </div>
        
        {displayList.length === 0 ? (
          <div className='no-user-message'>
            <h3>No users found</h3>
            <p>{searchInput.length > 0 ? 'Try a different search term' : 'No users available'}</p>
          </div>
        ) : currentUser ? (
          <div className='user-card-container'>
            <div className='user-card'>
              <div className='user-card-header'>
                <div className='user-card-avatar'>
                  <img src={currentUser.photo || '/default-avatar.png'} alt={currentUser.username} />
                </div>
                <div className='user-card-info'>
                  <h3 className='user-card-name'>{currentUser.username}</h3>
                  <p className='user-card-status'>Available to chat</p>
                </div>
              </div>
              
              <div className='user-card-body'>
                <div className='user-card-details'>
                  <div className='detail-item'>
                    <span className='detail-label'>Username:</span>
                    <span className='detail-value'>{currentUser.username}</span>
                  </div>
                  {currentUser.email && (
                    <div className='detail-item'>
                      <span className='detail-label'>Email:</span>
                      <span className='detail-value'>{currentUser.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className='user-card-footer'>
                {buttonState && (
                  <button 
                    className={`user-action-btn ${buttonState.variant}`}
                    onClick={buttonState.action || undefined}
                    disabled={!buttonState.action}
                  >
                    {buttonState.text}
                  </button>
                )}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className='pagination-controls'>
              <button 
                className='pagination-btn prev-btn'
                onClick={handlePrevious}
                disabled={currentPage === 0}
              >
                <IoIosArrowBack /> Previous
              </button>
              
              <div className='pagination-info'>
                <span>{currentPage + 1} / {totalPages}</span>
              </div>
              
              <button 
                className='pagination-btn next-btn'
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
              >
                Next <IoIosArrowForward />
              </button>
            </div>
          </div>
        ) : null}
      </div> 
    </div>
    </>
  ); 
};

export default UserList;
