import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './signup.css'
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Signup() {
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

    function nameValidate(){
        const name=document.getElementById('name')
        const nameError=document.getElementById('nameError')
        if(name.value===""){
          nameError.innerText="*Required"
        }
        else{
            if(!isNaN(name.value)){
                nameError.innerText="*Invalid"
            }
            else{
                nameError.innerText=""
            }
        }
    }

    function mobileNumberValidate(){
        const mobileNumber=document.getElementById('mobileNumber')
        const mobileNumberError=document.getElementById('mobileNumberError')
        if(mobileNumber.value===""){
          mobileNumberError.innerText="*Required"
        }
        else{
            mobileNumberError.innerText=""
        }
    }

    function registerClick(){
        const name=document.getElementById('name')
        const nameError=document.getElementById('nameError')
        const mobileNumber=document.getElementById('mobileNumber')
        const mobileNumberError=document.getElementById('mobileNumberError')
        
        if(name.value===""){
            nameError.innerText="*Required"
          }
        else{
            if(!isNaN(name.value)){
                nameError.innerText="*Invalid"
            }
            else{
                nameError.innerText=""
            }
        }
        if(mobileNumber.value===""){
            mobileNumberError.innerText="*Required"
          }
        else{
            if(mobileNumber.value.length<10 || mobileNumber.value.length>10){
                mobileNumberError.innerText="*Invalid"
            }
            else{
                mobileNumberError.innerText=""
            }
        }
        if(nameError.innerText==="" && mobileNumberError.innerText===""){
            const signupDetails={
                name:name.value,
                mobile:parseInt(mobileNumber.value)
            }
            axios.post(`https://creasophere-tech-private-limited.onrender.com/signup`, signupDetails)
                .then((response) => {
                    if(response.data.message==="Signup Successful"){
                        setPopupMessage('Signup Successful')
                        setOpen(true)
                        setTimeout(() => {
                            navigate('/login') 
                        }, 4000);
                    }
                    else if(response.data.message==="Mobile number already exist"){
                        mobileNumberError.innerText="*Mobile number already exist"
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }

    const res = (res) => {
        var userObject = jwtDecode(res.credential);
        let signupDetails={
            name: userObject.name,
            email: userObject.email
        }
        axios.post(`https://creasophere-tech-private-limited.onrender.com/signup`, signupDetails)
            .then((response) => {
                if(response.data.message==="Signup Successful"){
                    setPopupMessage('Signup Successful')
                    setOpen(true)
                    setTimeout(() => {
                        navigate('/login') 
                    }, 4000);
                    
                }
                else if(response.data.message==="Mobile number already exist"){
                    setPopupMessage("Email Id already exist")
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
                <h4 style={{fontFamily:'Arial'}}>Signup</h4>
                <h6 style={{fontFamily:'Arial'}}>Please enter details</h6>
                <input type="text" className="form-control mt-3" id="name" aria-describedby="emailHelp" placeholder='Name' onKeyUp={()=>{nameValidate()}}/>
                <span id="nameError" className="text-danger"></span>
                <input type="number" className="form-control mt-3" id="mobileNumber" aria-describedby="emailHelp" placeholder='10 digit mobile number' onKeyUp={()=>{mobileNumberValidate()}}/>
                <span id="mobileNumberError" className="text-danger"></span>
                <button type="button" className="btn btn-primary mt-3" style={{width:'100%'}} onClick={()=>{registerClick()}}>Register</button>
                <div className='mt-3 d-flex justify-content-center'>
                    <GoogleLogin className='' onSuccess={res} onError={err} />
                </div>

                <div className='text-center mt-3 backToLogin'>
                    <span className='text-primary' onClick={()=>{navigate('/login')}}>back to login</span>
                </div>
            </div>
        </div>
        {
            open?<Snackbar open={open} autoHideDuration={4000} onClose={handleClose} message={popMessage} action={action}/>:''
        }
    </>
  )
}

export default Signup