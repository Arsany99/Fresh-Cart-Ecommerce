import React, { useContext } from 'react'
import authContext from '../../Context/AuthContext.js'
import imageProfile from '../../images/ava3.webp'
import { cartContext } from '../../Context/CartContext.js'
import welcomeImage from '../../images/w.webp'


function Profile() {


    const { userData } = useContext(authContext)
    const{numOfCartItems}= useContext(cartContext)
    const{totalCartPrice}= useContext(cartContext)


    console.log('uuu'  , userData);
    return <>
    

    <div className="container p-5">
        <div className="w-100 m-5 p-5 text-center shadow bg-body-secondary">
            <h1 className='text-main fst-italic'>Details For your Account</h1>
            <div className="row h-75">
                <div className="col-4">
                        <div className="w-100">
                            <img src={imageProfile} alt="imageProfile" className='w-100' />
                        </div>  
                </div>
                <div className="col-8">
                    <div className="w-100 p-5">
                        <h1 className='text-main fw-bolder'>Hello {userData?.name}</h1>
                        <h5 className='fw-bolder'>Number of Product : {numOfCartItems} item</h5>
                        <h5 className='fw-bolder'>Total Card Price : {totalCartPrice}$</h5>
                    </div>

                </div>
            </div>




        </div>
    </div>
    
    
    
    </>
        
    
}

export default Profile
