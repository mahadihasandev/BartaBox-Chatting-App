import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify';

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

      <Grid container spacing={2}>
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

  <Grid size={4}>
    
  </Grid>
  <Grid size={4}>
  
  </Grid>
  <Grid size={4}>
    
  </Grid>
  
</Grid>

    </>
  )
}

export default Home