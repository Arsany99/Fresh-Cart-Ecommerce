import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FallingLines } from 'react-loader-spinner'

function AllOrders() {
    const [allOrder , setallOrder] = useState(null)

    function getUserOrder() {
        const userId = localStorage.getItem('userCartID')
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        .then((res)=>{
            setallOrder(res.data)
            console.log('all',allOrder); 
        }).catch((err)=>{
            console.log('err' ,err);

        })
    }

    useEffect(()=>{
        getUserOrder()
    } , [])

    if (!allOrder) {
        return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
            <FallingLines 
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"/>

        </div> 
    
    }



    return <>
    <div className="container mt-5 p-5">
        <div className="row g-5">
            { allOrder?.map ((order , idx)=> 
                <div key={idx} className="col-md-6 overflow-hidden">
                    <div className="order shadow mb-3 mt-3 bg-body-secondary h-100">
                        <div className="container">
                            <div className="row">
                                {order.cartItems.map((item , secIndex)=><div key={secIndex} className="col-md-4">
                                    <div className="montag bg-light shadow mb-4  h-100">
                                        <img className='w-100' src={item.product.imageCover} alt={item.product.title} />
                                        <h5 className='text-center text-main'>{item.product.title.split(" ").slice(0,2).join(" ") } </h5>
                                        <h6>Price: {item.price}</h6>
                                        <h6>Count:{item.count}</h6>
                                    </div>
                                </div>) }

                            </div>
                        </div>
                        <h5 className='fw-bold'>Payment Method :{order.paymentMethodType}</h5>
                        <h5 className='fw-bold'>Order Price :{order.totalOrderPrice}</h5>
                    </div>
            </div>)}

        </div>
    </div>
    
    
    
    
    </>
        
    
}

export default AllOrders

