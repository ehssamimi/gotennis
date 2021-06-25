import React   from "react";
import {NumberSeparatorFunction} from "../../utils/HelperFunction";
import CenterScreenModal from "../Common/Modal/CenterModal";
import SlideAnimation from "./SLideAnimation/SlideAnimation";

const Top = ({user}) => {


    const modal = () => {

        document.getElementById('myModal').style.display = 'block';
        // document.getElementById('modalCenterOpen2').style.display = 'block';
        // document.getElementById('modalCenterOpen2').click();
    }


    return (
        <div className="top_profile">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 profile_right">
                        <img src={ user.profile_preview} alt='img'/>
                        <div>{(user.name != null && user.name!=="")?user.name:"کاربر"}</div>
                        <div>{(user.mobile != null && user.mobile!=="")?user.mobile:"شماره همراه"}</div>
                    </div>
                    <div className="col-lg-6 profile_left">
                        <div className="profile_w">
                            <button id="myBtn" onClick={modal}
                                    style={{background: "none", border: "none"}}>ویرایش پروفایل
                            </button>
                            <i className="fa fa-user"/>
                        </div>

                        <span className="profile_r">{user.balance!==""?NumberSeparatorFunction(user.balance):""} تومان</span>
                         <div className="profile_q">
                            <span>افزایش موجودی</span>
                            <i className="fa fa-dollar"/>
                        </div>
                    </div>
                </div>
            </div>
            <br/>


        </div>
    );
}
export default Top;