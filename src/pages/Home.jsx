import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify';
import UserList from '../layouts/UserList';
import GroupList from '../layouts/GroupList';
import FriendList from '../layouts/FriendList';
import FriendRequest from '../layouts/FriendRequest';
import MyGroups from '../layouts/MyGroups';
import BlockedUsers from '../layouts/BlockedUsers';

function Home() {
  const [activeTab, setActiveTab] = useState('userList');
  let navigate=useNavigate()
  let data=useSelector((state)=>(state.activeUser.value))

  useEffect(() => {
    if (!data) {
      navigate('/login')
      toast.error('Login required')
    }
  }, [data, navigate])

  const tabs = [
    { id: 'groupList', label: 'Group List' },
    { id: 'friendList', label: 'Friend List' },
    { id: 'userList', label: 'User List' },
    { id: 'friendRequest', label: 'Friend Request' },
    { id: 'myGroups', label: 'My Groups' },
    { id: 'blockedUsers', label: 'Blocked Users' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'groupList':
        return <GroupList />;
      case 'friendList':
        return <FriendList />;
      case 'userList':
        return <UserList />;
      case 'friendRequest':
        return <FriendRequest />;
      case 'myGroups':
        return <MyGroups />;
      case 'blockedUsers':
        return <BlockedUsers />;
      default:
        return <UserList />;
    }
  };

  return (
    <>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />

    <section className='home-container'>
      <div className='home-header'>
        <h1>Discover And Connect</h1>
        <p>Manage friends, groups, requests, and blocked profiles from one dashboard.</p>
      </div>

      <div className='tabs-container'>
        <div className='tabs-wrapper'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className='tab-content'>
        {renderContent()}
      </div>
    </section>

    </>
  )
}

export default Home