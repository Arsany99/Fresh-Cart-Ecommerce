import React from 'react'
import err from'../../images/error.svg'


function Notfound() {
    return <>
    <div className="container p-5">
        <div className="d-flex justify-content-center align-items-center p-5">
            <img  className=" w-50 m-auto mb-1" src={err} alt="" />
        </div>
    </div>

    </>
}

export default Notfound
