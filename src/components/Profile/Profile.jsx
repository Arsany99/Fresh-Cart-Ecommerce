import React, { useContext } from 'react';
import authContext from '../../Context/AuthContext.js';
import imageProfile from '../../images/ava3.webp';
import { cartContext } from '../../Context/CartContext.js';

function Profile() {
    const { userData } = useContext(authContext);
    const { numOfCartItems } = useContext(cartContext);
    const { totalCartPrice } = useContext(cartContext);

    return (
        <div className="container mb-5 p-5">
            <div className="m-auto mt-5 p-5 text-center shadow bg-body-secondary">
                <h1 className="text-main fst-italic">Details For your Account</h1>
                <div className="row ">
                    <div className="col-md-4">
                        <div className="w-75 m-auto">
                            <img src={imageProfile} alt="Profile" className="img-fluid rounded-circle" />
                        </div>
                    </div>
                    <div className="col-md-8 ">
                        <div className="w-100 p-5">
                            <h2 className="text-main d-inline text-nowrap fw-bolder">Hello {userData?.name}</h2>
                            <p className=" fw-bolder text-nowrap mt-3">Number of Products: {numOfCartItems} item</p>
                            <p className="fw-bolder text-nowrap ">Total Cart Price: {totalCartPrice}$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
