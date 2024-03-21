import axios from 'axios'
import React, { Children, createContext } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import authContext from './AuthContext';


export const cartContext = createContext();

function CartContextProvider(  {children}) {
    const{myToken} = useContext(authContext)
    const [numOfCartItems , setnumOfCartItems] = useState(0)
    const [totalCartPrice , settotalCartPrice] = useState(0)
    const [allProduct , setallProduct] = useState(null)
    const [cartId , setcartId] = useState(null)






    async function addProductToCart(id) {
        try {
            const{data} = await axios.post( "https://ecommerce.routemisr.com/api/v1/cart"  ,{
                "productId" : id
            },{
                headers:{ token :localStorage.getItem('tkn') }
            } )
            getUserCart()
            return data
        } catch (error) {
            console.log('err..' ,error);
        }
    }

    function getUserCart () { 
        axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
            headers:{token:localStorage.getItem('tkn')}
        }).then((res)=>{
            console.log('usercart' , res.data.data._id , res.data.data.cartOwner );
            setcartId(res.data.data._id)
            setallProduct(res.data.data.products);
            setnumOfCartItems(res.data.numOfCartItems)
            settotalCartPrice(res.data.data.totalCartPrice)
            localStorage.setItem('userCartID' ,res.data.data.cartOwner )

        }).catch((err)=>{
            console.log('err' ,err);
        })
     }


     useEffect(()=>{
        console.log('getting user data');
        getUserCart()
     } , [myToken])


     async function updatCount (id , newCount) { 
        const boolenFlag = await axios.put (`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            'count': newCount },{
                headers: {token:  localStorage.getItem('tkn')}
            }
        ).then((res)=>{
            setallProduct(res.data.data.products);
            setnumOfCartItems(res.data.numOfCartItems)
            settotalCartPrice(res.data.data.totalCartPrice)
            return true

        }).catch((err)=>{
            console.log('err' ,err);
            return false

        })
        return boolenFlag

        
      }
      async function deleteProduct (id) { 
        const res = await axios.delete (`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
                headers: {token:  localStorage.getItem('tkn')}
            }
        ).then((res)=>{
            setallProduct(res.data.data.products);
            setnumOfCartItems(res.data.numOfCartItems)
            settotalCartPrice(res.data.data.totalCartPrice)
            return true

        }).catch((err)=>{
            console.log('err' ,err);
            return false

        })
        return res

        
      }

      async function clearCart () { 
        const res = await axios.delete (`https://ecommerce.routemisr.com/api/v1/cart` ,{
                headers: {token:  localStorage.getItem('tkn')}
            }
        ).then((res)=>{
            setallProduct([]);
            setnumOfCartItems(null)
            settotalCartPrice(0)
            return true

        }).catch((err)=>{
            console.log('err' ,err);
            return false

        })
        return res

        
      }





    return <cartContext.Provider value={{addProductToCart , getUserCart ,updatCount,deleteProduct, clearCart, cartId ,numOfCartItems , totalCartPrice , allProduct}}>
        {children}
    </cartContext.Provider>
        
    
    
    
    
        
    
}

export default CartContextProvider
