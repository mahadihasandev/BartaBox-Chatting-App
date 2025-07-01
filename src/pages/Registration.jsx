import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import RegistrationImg from '../assets/registration.png';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye,FiEyeOff } from "react-icons/fi";

const BootstrapButton = styled(Button)({
  width:'55%',
  padding:"19px 0px",
  background:"#5F35F5",
  borderRadius:"86px",
  fontFamily:"Open Sans",
});


const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#11175D',
  },
   '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    
    '&.Mui-focused fieldset': {
      borderColor: '#11175D',
    },
  },
  width:"55%",
  paddingBottom:"33px"
});


function Registration() {

  const [showPass,setShowPass]=useState(false);
  const [email,setEmail]=useState("");
  const [emailError,setEmailError]=useState("");
  const [nameError,setNameError]=useState("");
  const [passError,setPassError]=useState("");
  const [name,setName]=useState("");
  const [pass,setPass]=useState("");
  let navigate=useNavigate()
    

    function handleEmail(e){
      
        setEmail(e.target.value)
        setEmailError("")

    }

    function handleName(e){
        setName(e.target.value)
        setNameError("")
    }

    function handlePass(e){
        setPass(e.target.value)
        setPassError("")
    }

     let handleEyeClick=()=>{     
      setShowPass(!showPass)      
    }

   function handleClick(){
    let hasError = false;

    if(!email){       
        setEmailError("Email does not exist")
        hasError = true;        
      }else{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      setEmailError("Type a valid email")
      hasError = true;
    }}


    if(!name){
      setNameError("name is required")
      hasError = true;
    }else if(!/^.{2,15}$/.test(name)){
      setNameError("Name must be between 2-16 character long")
       hasError = true;
    }else if(!/^[a-zA-Z].*$/.test(name)){
      setNameError("Must be start with a letter") 
      hasError = true;
    }else if(!/^[a-zA-Z0-9_]+$/.test(name)){
      setNameError("only later number & underscore are valid")
      hasError = true;
    }

    if(!pass){
      setPassError("Password is empty")
      hasError = true;
    }else if(!/^.{8,}$/.test(pass)){
        setPassError("at least 8 character")
        hasError = true;
      }else if(!/.*[A-Z]/.test(pass)){
      setPassError("at least one upper case")
      hasError = true;
    }else if (!/^.*[a-z]/.test(pass)){
      setPassError("at least one lower case")
      hasError = true;
    }else if (!/.*\d/.test(pass)){
      setPassError("at least one number")
      hasError = true;
      // (?=.*[@$!%*?&])
      // [A-Za-z\d@$!%*?&]{8,}$
    }

  //    if(email&&!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)&&pass&&name){
  //     console.log(email+name+pass)
  //   }else{
  //     console.log("error")
  //   }
  //  }


    if(!hasError){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
        setEmail('')
        setName('')
        setPass('')
        toast.success("New Account Created")
        setTimeout(()=>{
        navigate("/login")
    },2000)

  })
  .catch((error) => {
    const errorCode=error.code
    toast.error(errorCode)
      setEmail('')
      setName('')
      setPass('')
  
  });
  }}
   
  return (
    <>
      <Grid container>
        <Grid size={{xs:12,md:6}} spacing={20}>
         <div className='reg-box'>
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
           <div className='reg-title'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            {emailError&&<div className='error-screen'>{emailError}</div>}
            <CssTextField value={email} onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" />
            {nameError&&<div className='error-screen'>{nameError}</div>}
            <CssTextField value={name} onChange={handleName} id="outlined-basic" label="Full name" variant="outlined" />
            {passError&&<div className='error-screen'>{passError}</div>}
            <div className='passField'>
              <CssTextField value={pass} onChange={handlePass} type={showPass?"text":"password"} id="outlined-basic" label="Password" variant="outlined" />
              <div onClick={handleEyeClick} className='fa-eye-on'>                          
                {showPass?<FiEye />:<FiEyeOff />}
              </div>
            </div>

            <BootstrapButton onClick={handleClick} variant="contained">Sign up</BootstrapButton>
            <p>Already  have an account ? <Link to='/login'><span>Sign In</span></Link> </p>
          </div>
         </div>
           
  
        </Grid>
        <Grid className='reg-grid' size={{xs:0,md:6}}>
          <img className='regImg' src={RegistrationImg} alt="Image" />
        </Grid>  
      </Grid>
    </>
  )
}

export default Registration