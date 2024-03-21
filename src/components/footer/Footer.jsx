import React from 'react'
import apple from'../../images/s.png'
import google from'../../images/Google-Play.png'


function Footer() {
    return <>
    <div className='bg-body-secondary p-3'>
        <h5 className='fw-bold'>Get The Fresh Cart App</h5>
        <h6 className='text-muted'>We will send you link , open  it on your phone to download the app </h6>
        <div className="row w-100">
            <div className="col-md-10">
                <input type="email" placeholder='Email'  className='w-100 form-control'/>
            </div>
            <div className="col-md-2">
                <button type='submit' className='w-100 bg-main btn p-2 rounded-3 text-white'>
                    Share App Link
                </button>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 p-3">
                <div className="d-flex align-items-center">
                    <h5>Payment Partners</h5>
                    <div className="d-flex align-items-center ">
                        <i class="fa-brands fa-cc-mastercard fa-2x m-2"></i>
                        <i class="fa-brands fa-paypal fa-2x m-2"></i>
                        <i class="fa-brands fa-cc-amazon-pay fa-2x m-2"></i>
                    </div>
                </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
                <h5>Get Delivred With Fresh Cart</h5>
                <img  className="btn w-25" src={apple} alt="apple store" />
                <img  className="btn w-25" src={google} alt="google store" />

            </div>
        </div>


    </div>
    
    
    
    </>
}

export default Footer
