import React, { useContext } from 'react'
import authContext from '../../Context/AuthContext'

function Profile() {


    const { userData } = useContext(authContext)
    console.log('uuu'  , userData);
    return <>

    <div className="container p-5">
        <div className="w-100 m-5 p-5 text-center shadow bg-body-secondary">
            <h1 className='text-main'>Hello {userData?.name}</h1>


        </div>
    </div>
    
    
    
    </>
        
    
}

export default Profile
