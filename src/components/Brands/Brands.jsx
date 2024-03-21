import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
function Brands() {
    async function getAllBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
    const {isLoading, data} = useQuery("getAllBrands" , getAllBrands)

    if (isLoading) {
        return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"/>

        </div> 
    
    }
    console.log('ADDD' ,data);
    return <>
                <div className="products row gy-3 p-5 mt-5">
                {data?.data.data.map( (product , idx) =>
                                <div key={idx} className="col-md-3 overflow-hidden">
                                    <Link to ={ `/SubBrands/${product._id}`}>
                                        <div>
                                            <img style={{height:"200px"}} src={product.image} className=' w-100' alt="" />
                                            <h3 className='h6 text-main'>{product.name}</h3>
                                        </div>
                                    </Link>

                            </div>

                )}

            </div>

    
    
    
    
    </>
        
    
}

export default Brands
