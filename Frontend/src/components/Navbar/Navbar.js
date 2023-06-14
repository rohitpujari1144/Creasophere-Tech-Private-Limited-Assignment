import React from 'react'
import { useNavigate } from 'react-router-dom'
import './navbar.css'

function Navbar() {
    let navigate=useNavigate()
  return (
    <>
        <nav className="navbar navbar-expand-lg shadow sticky-top" style={{backgroundColor:'#a1b3cc', }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link active text-white" aria-current="page">Home</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link active text-white" aria-current="page">Our Products</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link active text-white"  aria-current="page">About Us</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link active text-white" aria-current="page">Contact Us</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <button className="btn btn-outline-danger" style={{borderRadius:'200px', paddingLeft:'20px', paddingRight:'20px', paddingBottom:'10px'}} onClick={()=>{navigate('/login')}}>Log In</button>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar