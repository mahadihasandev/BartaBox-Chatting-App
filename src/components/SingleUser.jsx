
function SingleUser({username,photo}) {

  let handleFriendRequest=()=>{
      
      
  }


  return (
    <>
    <div className='profile-box'>
        <div className='profile-img-title-box'>
          <div className='profile-img-box'>
          <img className='profile-img' src={photo} alt="Profile-image" />
          </div>
        <div className='profile-title'>
          <h4>{username}</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        </div>
        <button onClick={handleFriendRequest}>Join</button>
      </div>
    </>
  )
}

export default SingleUser