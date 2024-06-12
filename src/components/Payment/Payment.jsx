import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const{ cartId ,clearCart ,getUserCart } = useContext(cartContext)
    const nav = useNavigate()
    
    function confirmCashPayment() {
        const datils = document.getElementById('Details').value;
        const Phone = document.getElementById('Phone').value;
        const City = document.getElementById('City').value;


        const shippingObject ={
            'shippingAddress':{
                datils,
                Phone,
                City
            }
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingObject ,{
            headers: {token:  localStorage.getItem('tkn')}
        }).then((res)=>{
            console.log('res'  , res);
            if (res.data.status == 'success') {
                toast.success('Payment Completed Successfully')
                clearCart()
                getUserCart()
                setTimeout(() => {
                    nav('/products')
                }, 1500);
                
            }
        }).catch((err)=>{
            console.log('err' ,err);
            toast.error('Error...')

        })


        
    }
    function confirmOnlinePayment() {
        const datils = document.getElementById('Details').value;
        const Phone = document.getElementById('Phone').value;
        const City = document.getElementById('City').value;


        const shippingObject ={
            'shippingAddress':{
                datils,
                Phone,
                City
            }
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shippingObject ,{
            headers: {token:  localStorage.getItem('tkn')} ,params:{url:'http://localhost:3000'}
        }).then((res)=>{
            console.log('res'  , res);
            if (res.data.status == 'success') {
                //toast.success('Payment Completed Successfully')
                //clearCart()
                //getUserCart()
                window.open(res.data.session.url , '_self')
                
            }
        }).catch((err)=>{
            console.log('err' ,err);
            toast.error('Error...')

        })


        
    }
    return <>
    <div className="w-50 m-auto p-5">
        <label className='mt-5' htmlFor="City">City</label>
        <input type="text"id='City' placeholder='City' className=' form-control mb-4' />
        <label htmlFor="Phone">Phone</label>
        <input type="text"id='Phone' placeholder='Phone' className=' form-control mb-4' />
        <label htmlFor="Details">Details</label>
        <textarea type="text"id='Details' placeholder='Details' className=' form-control mb-4'></textarea>

        <button onClick={()=>confirmCashPayment()} className='btn btn-primary me-5 mb-4'>Confirm Cash Payment</button>
        <button onClick={()=>confirmOnlinePayment()} className='btn btn-primary mb-4'>Confirm Online Payment</button>



    </div>
    
    
    
    </>
        
    
}

export default Payment
