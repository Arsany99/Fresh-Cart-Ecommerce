import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import SimpleSlider from '../HomeSlider/HomeSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'


function Products() {
    const { addProductToCart} = useContext(cartContext)
    async function addProduct(id) {
        const res = await addProductToCart(id)
        console.log(res);
        if (res) {
            toast.success('Product is add successful' ,{position:'bottom-left' , duration:1500 })
        } else{
            toast.error("Error occured"  , {position:'bottom-left' , duration:1500})
        }
    }

    //const [allProduct , setAllProduct] = useState(null)
    async function getAllProduct() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
        //.then( (res) => {
           // setAllProduct(res.data.data)
            //console.log(res);

        //} )
       // .catch((err) => {
           // console.log("error" , err );
       // })//
    }
    const {isLoading , data , error} = useQuery("getAllProduct" , getAllProduct)

   // useEffect( () =>{
       // getAllProduct();
    //}, []  )
    if (isLoading) {
        return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"/>

        </div> 
    
    }


    return <>
    <Helmet>
        <title>Products</title>
    </Helmet>
        <div className="container p-5">
            <div className="row mt-4 mb-4">
                <div className="col-md-9">
                    <SimpleSlider/>

                </div>
                <div className="col-md-3">
                    <div>
                        <img style={{height:"150px"}} className=" w-100 mb-1" src={require("../../images/grocery-banner-2.jpeg")} alt="" />
                    </div>
                    <div>
                        <img style={{height:"150px"}} className=" w-100" src={require("../../images/grocery-banner.png")} alt="" />
                    </div>

                </div>
            </div>
            <CategoriesSlider/>
            
            <div className="products row gy-3 mt-3">
                {data?.data.data.map( (product , idx) =>
                                <div key={idx} className="col-md-2 overflow-hidden">
                                    <Link className="product" to ={ `/ProductDetails/${product.id}`} >
                                        <div>
                                            <img src={product.imageCover} className=' w-100' alt="" />
                                            <h3 className='h6 text-main'>{product.category.name}</h3>
                                            <h2 className='h6 text-center ' >{product.title .split(" ").slice(0,2).join(" ") }</h2>
                                            <div className="d-flex justify-content-between">
                                                {product.priceAfterDiscount ? <p> <span className='text-decoration-line-through text-danger '>{product.price}</span> -{product.priceAfterDiscount}$</p>: <p>{product.price}$</p> }
                                                <p> <i style={{color:"yellowgreen"}} className=' fa-solid fa-star'></i> {product.ratingsAverage}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <button onClick={()=>{addProduct(product.id)}} className='addBtn btn bg-main text-white m-auto d-block'>+</button>

                            </div>

                )}

            </div>
        </div>   

  
    
    
    
    </>
}

export default Products
