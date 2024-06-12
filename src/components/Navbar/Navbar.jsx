import React, { useContext } from 'react'
import logo from'../../images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import authContext from '../../Context/AuthContext'
import { cartContext } from '../../Context/CartContext'

function Navbar() {
    const{myToken , setToken} = useContext(authContext)
    const navigate = useNavigate()
    const{numOfCartItems}= useContext(cartContext)

    function Logout () {
      setToken(null)
      localStorage.removeItem("tkn")
      navigate("/Login")
      
    }
    return <>
    
  <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/products">
        <img src={logo} alt="Fresh Cart" />

    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {myToken ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Categories">Category</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">All Order</Link>
        </li>
        <li className="nav-item position-relative">
  <Link className="nav-link" to="/Cart">Cart</Link>
  <span className="position-absolute top-0 start-100  mt-1 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.8rem' }}>{numOfCartItems}</span>
</li>

      </ul> : ""}


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <li className="nav-item">
          <ul className="list-unstyled d-flex">
            <li>
                <i class=" me-2 fa-brands fa-facebook-f"></i>
            </li>
            <li>
                <i class=" me-2 fa-brands fa-instagram"></i>
            </li>
            <li>
                <i class=" me-2 fa-brands fa-linkedin"></i>
            </li>
            <li>
                <i class="me-2 fa-brands fa-twitter"></i>
            </li>
          
          </ul>
        </li>
        {myToken ? <>
        <li className="nav-item">
          <Link className="nav-link" to="/Profile">Profile</Link>
        </li>
        <li className="nav-item">
          <span onClick={Logout} role='button' className="nav-link" to="/register">Logout</span>
        </li></>:<>
        <li className="nav-item">
          <Link className="nav-link" to="/Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        
        
        
        
        </>}


      </ul>

    </div>
  </div>
</nav>

    
    
    
    </>
}

export default Navbar
