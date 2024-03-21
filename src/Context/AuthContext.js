import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { createContext, useState } from "react"

export let authContext = createContext({});

export function AuthContextProvider ({children}){
    const [token , setToken ] = useState(null);
    const [userData , setuserData ] = useState(null);



    useEffect(function () { 
        console.log("refresh");
        const val = localStorage.getItem("tkn")
        if (val !== null) {
            setToken(val)
            getUserData()
        }

     } ,[])

    function getUserData() {
        const userData = jwtDecode(localStorage.getItem("tkn"))
        console.log('userData', userData);
        setuserData(userData)
        
    }



    return <authContext.Provider value={{myToken :token , setToken ,userData, getUserData}}>

        {children} 
        
    </authContext.Provider>




}
export default authContext ;

 







