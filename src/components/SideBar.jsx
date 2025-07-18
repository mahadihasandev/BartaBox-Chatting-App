import pPic from '../assets/ppic.png'
import { TbHomeDown } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { userDetails } from '../slices/userInfoSlice';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";

function SideBar() {
  const [Locations,setLocation]=useState()
   const auth = getAuth();
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let location=useLocation()
  
  useEffect(()=>{
    setLocation(location.pathname.replace("/pages/",""));
  },)
  
  
let data=useSelector((state)=>(state.activeUser.value))

  useEffect(
    ()=>{
      if(!data){
          navigate('/login')
      }
    },[])

let handleLogOut=()=>{
  signOut(auth).then(() => {
    localStorage.removeItem("activeUser")
    dispatch(userDetails(null))
    navigate('/login')
  }).catch((error) => {
      let errorCode=error.code
      toast.error(errorCode)
  });
}
  return (
    <>
        <div className='sidebar-layouts'>
          <div className='profile-layout'>
            <img src={pPic} alt="Img" />
          </div>
          <div className='page-layout'>
            <Link className={Locations=="home"&&"active"} to='/pages/home'>
          <TbHomeDown className='page-icon'/>
          </Link>
            <Link className={Locations=="messages"&&"active"} to='/pages/messages'>
            <AiOutlineMessage className='page-icon'/>
            </Link>
            <Link className={Locations=="notification"&&"active"} to='/pages/notification'>
            <MdOutlineNotificationsActive className='page-icon'/>
            </Link>
            <Link className={Locations=="settings"&&"active"} to='/pages/settings'>
            <MdOutlineSettings className='page-icon'/>
            </Link>
          </div>
          <div className='logout-layout'>
              <HiOutlineLogout onClick={handleLogOut} className='page-icon'/>
          </div>

        </div>
    </>
  )
}

export default SideBar