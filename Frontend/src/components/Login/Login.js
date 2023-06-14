import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Login() {
  let navigate=useNavigate()
  const [open, setOpen] = useState(false);
  let [popMessage, setPopupMessage]=useState('')

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
      return;
      }
      setOpen(false);
  };
  
  const action = (
      <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
          </IconButton>
      </React.Fragment>
  );

  function mobileNumberValidate(){
    const mobile=document.getElementById('mobile')
    const mobileNumberError=document.getElementById('mobileNumberError')
    if(mobile.value===""){
      mobileNumberError.innerText="*Required"
    }
    else{
        mobileNumberError.innerText=""
    }
  }

  function continueClick(){
    const mobile=document.getElementById('mobile')
    const mobileNumberError=document.getElementById('mobileNumberError')
    if(mobile.value===""){
      mobileNumberError.innerText="*Required"
    }
    else{
      if(mobile.value.length<10 || mobile.value.length>10){
        mobileNumberError.innerText="*Invalid"
      }
      else{
        axios.get(`https://creasophere-tech-private-limited.onrender.com/login/${mobile.value}`)
          .then((response) => {
              if(response.data.message==="Login Successful"){
                setPopupMessage('Login Successful')
                setOpen(true)
                setTimeout(() => {
                  navigate('/form')
                }, 3000);
              }
              else if(response.data.message==="Invalid Credentials"){
                setPopupMessage('This mobile number is not registered wit us, signup first')
                setOpen(true)
                setTimeout(() => {
                  navigate('/signup')   
                }, 3000);
              }
          })
          .catch((error)=>{
            console.log(error);
          })
      }
    }
  }

  const res = (res) => {
    var userObject = jwtDecode(res.credential);
    axios.get(`https://creasophere-tech-private-limited.onrender.com/login?email=${userObject.email}`)
      .then((response) => {
          if(response.data.message==="Login Successful"){
            setOpen(true)
            setPopupMessage('Login Successful')
            setTimeout(() => {
              navigate('/form')   
            }, 3000);
          }
          else if(response.data.message==="Invalid Credentials"){
            setOpen(true)
            setPopupMessage('This email Id is not registered wit us, signup first')
            setTimeout(() => {
              navigate('/signup')   
            }, 3000);
          }
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  const err = (error) => {
    console.log(error)
  }
  return (
    <>
      <div className="container shadow rounded-3 position-absolute top-50 start-50 translate-middle" style={{maxWidth:'400px', padding:'20px'}}>
        <div>
          <h5 style={{fontFamily:'Arial'}}>Welcome Login/Signup</h5>
          <h6 style={{fontFamily:'Arial'}}>Please enter details</h6>
          <input type="number" className="form-control" id="mobile" aria-describedby="emailHelp" placeholder='10 digit phone number' onKeyUp={()=>{mobileNumberValidate()}}/>
          <span id="mobileNumberError" className="text-danger"></span>
          <button type="button" className="btn btn-primary mt-3" style={{width:'100%'}} onClick={()=>{continueClick()}}>Continue</button>
        
            <div className='mt-3 d-flex justify-content-center'>
              <GoogleLogin onSuccess={res} onError={err} />
            </div>
            <div className='mt-3 d-flex justify-content-center'> 
              <button type="button" className="btn btn-primary" style={{width:'210px'}}><i className="fa-brands fa-facebook-f"></i> Facebook</button>
            </div>
          <div className='d-flex justify-content-end mt-3'>
            <button className="btn text-danger">Admin Login</button>
          </div>
        </div>
      </div>
      {
        open?<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popMessage} action={action}/>:''
      }
    </>
  )
}

export default Login