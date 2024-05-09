import axios from 'axios'
import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

function ProductDetails() {
    const { addProductToCart}= useContext(cartContext);



    async function addProduct(id) {
        const res = await addProductToCart(id)
        console.log(res);
        if (res) {
            toast.success('Product is add successful' ,{position:'top-right' , duration:1500 })
        } else{
            toast.error("Error occured"  , {position:'top-right' , duration:1500})
        }
        }


    const{ id } = useParams()
    function getProductDetails() {
        console.log(id);
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        
        
    }
    const {isError , isLoading , data} = useQuery("getProductDetails" , getProductDetails)
    if (isLoading) {
        return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"/>

        </div> 
    
    }
    if (isError) {
        return  <Navigate to= "/products" />
        
    }
    const productDtail = data.data.data;
    return <>
    <Helmet>
        <title>{productDtail.title.split(" ").slice(0,2).join(" ")}</title>
    </Helmet>
    <div className="container p-5">
        <div className="row mt-5 align-items-center">
            <div className="col-3">
                <figure>
                    <img className='w-100' src={productDtail.imageCover} alt={productDtail.title} />
                </figure>
            </div>
            <div className="col-9">
                <article>
                    <h1>
                        {productDtail.title}
                    </h1>
                </article>
                <p>
                    {productDtail.description}
                </p>
                <button onClick={()=>{addProduct(productDtail.id)}} className='btn bg-main text-white w-100'> Add To Cart +</button>
            </div>
        </div>
    </div>
    
    
    </>
        
    
}

export default ProductDetails
