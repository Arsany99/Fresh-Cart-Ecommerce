import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';

function Layout() {
    return <>
    <Navbar/>


    <Outlet/>

    <Footer/>



    
    
    </>
}

export default Layout
