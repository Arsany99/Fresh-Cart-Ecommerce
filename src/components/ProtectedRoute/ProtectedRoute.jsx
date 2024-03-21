import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute(props) {
    if(localStorage.getItem("tkn") == null){
        return <Navigate to="/Login"   />
    }



    return <>

    {props.children}
    
    
    </>
        
    
}

export default ProtectedRoute
