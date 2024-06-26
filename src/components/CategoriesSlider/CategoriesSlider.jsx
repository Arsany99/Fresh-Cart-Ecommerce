import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    
  }
  const{data , isLoading}= useQuery("CategoriesSlider" , getCategories )
  if (isLoading) {
    return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
        <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"/>

    </div> 

}
  return (
    <Slider {...settings}>
    {data.data.data.map((category , idx)=> <div key={idx} >
          <img style={{height:"200px"}} className=" w-100" src={category.image} alt={category.name} />
          <h4 className="fs-5 text-truncate p-3">{category.name}</h4> 
    </div> )}
    </Slider>
  );
}