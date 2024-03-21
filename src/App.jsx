import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Notfound from './components/Notfound/Notfound';
import {AuthContextProvider}  from './Context/AuthContext';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import Profile from './components/Profile/Profile';
import { Offline } from 'react-detect-offline';
import SubCategory from './components/SubCategory/SubCategory';
import Brands from './components/Brands/Brands';
import SubBrands from './components/SubBrands/SubBrands';



const myRouter = createBrowserRouter([
  {path:'/'     , element: <Layout/>  , children:[
    {index: true , element: <Register/>   },
    {path:'register'     , element: <Register/>   },
    {path:'Login'     , element:  <Login/>  },
    {path:'Cart'     , element: <ProtectedRoute>
      <Cart/>
    </ProtectedRoute> },
    {path:'Categories'     , element: <ProtectedRoute>
      <Categories/> 
    </ProtectedRoute>  },
      {path:'SubCategory/:id'     , element: <ProtectedRoute>
      <SubCategory/> 
      </ProtectedRoute>  },
    {path:'Brands'     , element: <ProtectedRoute>
      <Brands/>
    </ProtectedRoute> },
      {path:'SubBrands/:id'     , element: <ProtectedRoute>
        <SubBrands/> 
      </ProtectedRoute>  },
    {path:'Profile'     , element: <ProtectedRoute>
      <Profile/>
    </ProtectedRoute>  },
    {path:'payment'  , element: <ProtectedRoute>
      <Payment/>
    </ProtectedRoute>},
    {path:'allorders'  , element: <ProtectedRoute>
        <AllOrders/>
      </ProtectedRoute>},
    
    {path:'products'     , element: <ProtectedRoute>
      <Products/> 
    </ProtectedRoute> },
        {path:'ProductDetails/:id'     , element: <ProtectedRoute>
        <ProductDetails/> 
      </ProtectedRoute> },

    {path:'*'     , element: <Notfound/>   }
  ]  },




])

function App() {
  const myClient = new QueryClient()


  return <>
    <QueryClientProvider client={myClient}>
      <AuthContextProvider>
      <CartContextProvider>
          <RouterProvider router={myRouter}/> 
      </CartContextProvider>
      </AuthContextProvider>
 
    </QueryClientProvider> 
    <Toaster/>


    <Offline>
      <div className="bg-dark text-white fixed-bottom">
        Your Internet Connection Has Been Corrupted....

      </div>
    </Offline>






    
    
    
      
    
    
  
  
  
  </>
}

export default App
