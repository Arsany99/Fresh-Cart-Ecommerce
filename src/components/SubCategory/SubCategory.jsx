import axios from 'axios'
import React from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import {useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'



function SubCategory() {
    const{ id } = useParams()


    function getSubCategory() {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        
        
    }

    const {isLoading,data} = useQuery("getSubCategory" , getSubCategory)

    const CategoryDetail = data?.data.data;
    if (isLoading) {
        return <div className="d-flex vh-100 mt-5 p-5 bg-primary bg-opacity-50 justify-content-center align-items-center">
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"/>

        </div> 
    
    }





    return <>
        <div className="container p-5 shadow">
            <div className="row products  mt-5 bg-body-secondary align-items-center">
                <div className="col-md-6 p-5">
                    <img className='w-100' src={CategoryDetail.image} alt={CategoryDetail.name} />
                </div> 
                <div className="col-md-6">
                    <h1 className='text-main'>
                        {CategoryDetail.name}
                    </h1>
                </div>

            </div>
    </div>


    </>
        
    
}

export default SubCategory
