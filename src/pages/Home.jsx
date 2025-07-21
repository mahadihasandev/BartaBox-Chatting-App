import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify';
import UserList from '../layouts/UserList';
import Grid from '@mui/material/Grid';
import GroupList from '../layouts/GroupList';

function Home() {
  let navigate=useNavigate()
let data=useSelector((state)=>(state.activeUser.value)
)

  useEffect(
    ()=>{
      if(!data){
        navigate('/login')
        toast.success("Login failed")
      }             
    },[])

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

  <div className='grid-division'>
    <Grid container spacing={3}>
      <Grid size={4}>
        <GroupList/>
      </Grid>
      <Grid size={4}>
        <UserList/>
      </Grid>
      <Grid size={4}>
       <UserList/>
      </Grid>  
    </Grid>
  </div>
    </>
  )
}

export default Home