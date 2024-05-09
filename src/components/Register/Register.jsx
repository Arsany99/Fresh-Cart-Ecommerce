import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Hourglass } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function Register() {
    const userData ={
        name:"",
        email:"",
        phone:"",
        password:"",
        rePassword:""


    }

    const navigate = useNavigate()
    

    async function onSubmit (values) {    
        console.log('test',values);
        setIsLoading(true)
        const res = await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signup` , values )
        .then((x)=>{
            console.log("success"  , x );
            setIsSucess(true) ;
            setTimeout(() => {
               setIsSucess(false) 
               navigate('/login')
            }, 2000);



        }).catch((x)=>{
            console.log("error"  , x.response.data.message);
            setErrorMessage(x.response.data.message) ;
            setTimeout(() => {
                setErrorMessage(undefined) 
            }, 2000);
            setIsLoading(false)


        }) 
    } 
 

    const myFormik = useFormik({
        initialValues:userData,
        onSubmit: onSubmit ,
        validate: function (values) {
            const errors ={}
            const nameRegex =/^[A-Z][a-z]{3,7}$/;
            const phoneRegex =/^01[0125][0-9]{8}$/
            if (nameRegex.test(values.name)=== false) {
                errors.name ="Name must be from 4 o 8 characters start with capital letter  ";
                
            }
            if (values.email.includes("@") !== true || values.email.includes(".") !== true) {
                errors.email = "Email must be in format";
                
            }
            if (phoneRegex.test(values.phone)=== false) {
                errors.phone ="Phone must be an Egyptian number";
                
            }
            if (values.password.length < 6 || values.password.length >12) {
                errors.password = "Password must be from 6 o 12 character";
                
            }
            if (values.rePassword !== values.password) {
                errors.rePassword = "Password and rePassword don't match";
                
            }
            console.log("errors" , errors);


            return errors
        }
    })

    const[isSucces ,setIsSucess ] = useState(false)
    const[isLoading ,setIsLoading ] = useState(false)
    const[errorMessage ,setErrorMessage ] = useState(undefined)

    return <>
    <div className="w-75 mt-5 mx-auto p-5 p-5">
        {isSucces? <div className='alert alert-success text-center '> congratlotuions you have been created account</div> : ""}
        {errorMessage? <div className='alert alert-danger text-center '> {errorMessage}</div> : ""}
        <h2>Register Now:</h2>
        <form onSubmit={myFormik.handleSubmit}>
            <label htmlFor="name">name:</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} id='name' type="text" className='form-control mb-3' placeholder='name' />
            {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger">{myFormik.errors.name}</div> : ""}   
            <label htmlFor="email">email:</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' type="email" className='form-control mb-3' placeholder='email' />
            {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ""}   
            <label htmlFor="phone">phone:</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' type="text" className='form-control mb-3' placeholder='phone'/>
            {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger">{myFormik.errors.phone}</div> : ""}   
            <label htmlFor="password">Password:</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' type="password" className='form-control mb-3' placeholder='password' />
            {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ""}   
            <label htmlFor="rePassword">rePassword:</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} id='rePassword' type="password" className='form-control mb-3' placeholder='rePassword' />
            {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger">{myFormik.errors.rePassword}</div> : ""}   
            <button type='submit' className='bg-main btn p-2 rounded-3 text-white'>
                {isLoading ?<Hourglass
                visible={true}
                height="35"
                width="35"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
                /> : "Register" }

            </button> 
        </form>
    </div>

    
     
    </>
}

export default Register
