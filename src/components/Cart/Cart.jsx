import React from 'react'
import { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';



function Cart() {


    const {updatCount,deleteProduct ,clearCart, totalCartPrice , allProduct} = useContext(cartContext);

    if ( !allProduct) {
        return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
        <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"/>

        </div> 
        
    }
    async function updatMyProduct(id , newCount) {
        const res = await updatCount(id , newCount);
        console.log(res);

        if (res) {
            toast.success('product update succes' , {position:'top-center'} )
        } else{
            toast.error("Error occured"  , {position:'top-center'})
        }
    }

    async function myDeleteProduct(id) {
        const res = await deleteProduct(id)
        if (res) {
            toast.success('product Deleted' , {position:'top-center'} )
        } else{
            toast.error("Error occured"  , {position:'top-center'})
        }
    }

    return <>
    <Helmet>
        <title>User Cart</title>
    </Helmet>
    <div className="container p-5">
        <div className="d-flex mt-5 justify-content-between align-items-center">
            <div className="">
            <h2>Shop Cart :</h2>
            <h5>Total Card Price : {totalCartPrice} LE</h5>
            <button onClick={()=>clearCart()} className='btn btn-outline-danger'>Clear</button>
            </div>
            <Link to='/payment'>
                <button className='btn btn-outline-primary'>Confirm Payment</button>
            </Link>
        </div>

        { allProduct.map ( (product , idx) => 
            <div key= {idx} className="row align-items-center border-1 border-bottom border-danger py-1 mb-1">
                <div className="col-1">
                    <figure>
                        <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
                    </figure>
                </div>
                <div className="col-9">
                    <article>
                        <h3>{product.product.title}</h3>
                        <h5>Price : {product.price}</h5>
                        <button onClick={()=> myDeleteProduct(product.product.id )} className='btn btn-outline-danger'> Remove </button>
                    </article>
                </div>
                <div className="col-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <button onClick={()=> updatMyProduct(product.product.id  , product.count + 1)} className='btn btn-outline-success'>+</button>
                        <p>{product.count}</p>
                        <button disabled = {product.count == 1} onClick={()=> updatMyProduct(product.product.id  , product.count - 1)} className='btn btn-outline-success'>-</button>
                    </div>
                </div>
            </div>  
        )}

    </div>
    
    
    
    </>
        
    
}

export default Cart
