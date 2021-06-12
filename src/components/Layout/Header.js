import {CenterModal} from "../profile/modal";
import {
    Link,
    useHistory,
} from "react-router-dom";
import React, {useState, useEffect} from 'react';


const Index = ( props ) => {
    let history = useHistory();



    useEffect(() => {

        console.log(history.location.pathname)

        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);

    return (
        <div className="top_header">
            <div className="container h-100">
                <div className="d-flex  justify-content-between align-items-center  text-white w-100 h-100"  style={{    flexDirection: 'row-reverse' }}>
                    <div className="  ">
                        <span dir='rtl'>{props.header!==undefined?props.header:"رزرو مجموعه های ورزشی"}</span>
                    </div>


                    <div >
                        {
                            history.location.pathname==='/profile'?
                                <span className='d-flex align-items-center'><i className="fa fa-sign-out fa-2x " aria-hidden="true" style={{marginRight:"0.5em"}}/>  خروج از حساب کاربری</span>:

                                 history.location.pathname==='/'?
                                    <div className="  top_left d-flex align-items-center" data-toggle="modal"
                                         data-target="#exampleModalCenter" id='modalCenterOpen'>
                                        <span style={{marginLeft:'1em'}}>ورود </span>
                                        <img src="/assets/img/avatar-380-456332.png" alt=''/>
                                    </div>:props.backUrl!==undefined?
                                     <Link to={props.backUrl}><i className="fa fa-long-arrow-left fa-2x text-white" aria-hidden="true"></i>
                                     </Link>:

                                     ""

                        }

                    </div>






                </div>
            </div>
            <CenterModal/>

        </div>
    );
}

export default Index;