import {CenterModal, PhoneValidate} from "../profile/modal";
import {
    Link,
    useHistory,
} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {UseProfile} from "../../Hooks/UseProfile/UseProfile";
import {UseModals} from "../../Hooks/UseModals/UseModals";


const Index = ( props ) => {
    let history = useHistory();
    const {User,initialUser} = UseProfile( );
    const { Modal,toggleModal}=UseModals();

    useEffect(() => {

        // console.log(history.location.pathname)
        // console.log(User.token);

        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    const logOut=()=>{
        initialUser()
        window.location.reload()
    }

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
                                User.token!==""?
                                    <span className='d-flex align-items-center'  onClick={logOut}><i className="fa fa-sign-out fa-2x " aria-hidden="true" style={{marginRight:"0.5em"}}/>  خروج از حساب کاربری</span>:
                                      <div className="  top_left d-flex align-items-center"
                                            onClick={()=>{toggleModal("profile")}}>
                                    <span style={{marginLeft:'1em'}}>ورود </span>
                                    <img src="/assets/img/avatar-380-456332.png" alt=''/>
                                </div>:
                                    history.location.pathname==='/'?
                                     User.token!==""?   <Link to={'/profile'} className="  top_left d-flex align-items-center"  >
                                             <span style={{marginLeft:'1em'}}>{User.name} </span>
                                             <img src={User.img}  alt=''/>
                                         </Link>:
                                    <div className="  top_left d-flex align-items-center" onClick={()=>{toggleModal("profile")}}>
                                        <span style={{marginLeft:'1em'}}>ورود </span>
                                        <img src="/assets/img/avatar-380-456332.png" alt=''/>
                                    </div>

                                     :props.backUrl!==undefined?
                                     <Link to={props.backUrl}><i className="fa fa-long-arrow-left fa-2x text-white" aria-hidden="true"></i>
                                     </Link>:

                                     ""

                        }

                    </div>






                </div>
            </div>
            <PhoneValidate isOpen={Modal.isOpen} toggle={()=>{toggleModal("profile")}} finishRequest={()=>{console.log("end")}} />

        </div>
    );
}

export default Index;