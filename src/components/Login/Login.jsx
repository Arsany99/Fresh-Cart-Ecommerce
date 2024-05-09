import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useContext } from 'react';
import { Hourglass } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContextProvider, authContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast'



function Login() {
    const userData ={
        email:"",
        password:""

    }
    const[isSucces ,setIsSucess ] = useState(false)
    const[isLoading ,setIsLoading ] = useState(false)
    const[errorMessage ,setErrorMessage ] = useState(undefined)

    const navigate = useNavigate()
    const {setToken , getUserData}= useContext(authContext)
    

    async function onSubmit (values) {    
        console.log('test',values);
        setIsLoading(true)
        const res = await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signin` , values )
        .then((x)=>{
            if (x.data.message == "success") {
                console.log("token:", x.data.message );
                localStorage.setItem("tkn", x.data.token)
                setToken(x.data.token)
                console.log(x.data.token);
                getUserData()
                setIsSucess(true) ;
                setTimeout(() => {
                   setIsSucess(false) 
                   navigate('/products')
                }, 2000);
            }
            console.log("success"  , x );
            setIsLoading(false)




        }).catch((x)=>{
            toast.error("Your Email Or Your Password Is Incorrect"  , {position:'bottom-left' , duration:1500})
            console.log("error"  , x.data.message);
            setErrorMessage(x.data.message) ;
            setTimeout(() => {
                setErrorMessage(undefined) 
            }, 2000);
        }) 


    }  

 

    const myFormik = useFormik({
        initialValues:userData,
        onSubmit: onSubmit ,
        validate: function (values) {
            const errors ={}
            if (values.email.includes("@") !== true || values.email.includes(".") !== true) {
                errors.email = "Email must be in format";
                
            }
            if (values.password.length < 6 || values.password.length >12) {
                errors.password = "Password must be from 6 o 12 character";
                
            }
            console.log("errors" , errors);


            return errors
        }
    })



    return <>
    <div className="w-75 p-5 mt-5 m-auto p-5">
        {isSucces? <div className='alert alert-success text-center '> welcome</div> : ""}
        {errorMessage? <div className='alert alert-danger text-center '> {errorMessage}</div> : ""}
        <h2>Login Now:</h2>
        <form onSubmit={myFormik.handleSubmit}>
            
            <label htmlFor="email">email:</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' type="email" className='form-control mb-3' placeholder='email' />
            {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ""}   
            <label htmlFor="password">Password:</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' type="password" className='form-control mb-3' placeholder='password' />
            {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ""}   
            <button type='submit' className='bg-main btn p-2 rounded-3 text-white'>
                {isLoading ?<Hourglass
                visible={true}
                height="35"
                width="35"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
                /> : "Login" }

            </button> 
        </form>
    </div>

    
     
    </>
}

export default Login
