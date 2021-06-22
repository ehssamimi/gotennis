import Top from "./top";
import Footer from "./footer";
import {Modal as ModalComponent, PhoneValidate} from "./modal";
import React, {useState, useEffect} from "react";
import {getUser, showError} from "../../api";
import {Link} from "react-router-dom";
import MainDiv from "../Common/MainDiv/MainDiv";
import {UseProfile} from "../../Hooks/UseProfile/UseProfile";
import TotalLoader from "../Common/IsLoader/LoaderTotal/TotalLoader";
import {gotennisNotif} from "../../utils/Notification";
import {UseModals} from "../../Hooks/UseModals/UseModals";

const Index = () => {
    const {EditUser,User}=UseProfile();
    const { Modal,toggleModal}=UseModals();
    let [isLoading, setisLoading] = useState(true)
    let [ModalISOpen, setModalISOpen] = useState(false)
    let [user, setUser] = useState({
        birthday: null,
        gender: "0",
        mobile: "",
        name: "",
        profile_pic: null,
        profile_preview: "/assets/img/avatar-380-456332.png",
        username: "",
        push_id: '4',
        device_id: '2g',
        imei: '1w',
        mac_address:'3r'

    });


    useEffect(() => {
        let Profile='';
        if (localStorage.getItem("GoTennisInfo")){
            Profile=JSON.parse(localStorage.getItem("GoTennisInfo"))
        }else {
            Profile=User
        }




        if ( Profile.phoneValidate){
            getUser().then(response => {
                console.log(response.data.data)
                response=response.data.data
                // console.log(response.data.data.birthday.splice("-"))

                EditUser(response.balance,'wallet')
                EditUser(true,'isLogin')


                if (response.birthday!==null){
                    // let birthday="3-6-1367"
                    // console.log(response.birthday.split("-"))
                    let userirthday = {
                        year: Number(response.birthday.split("-")[2]>1900?1363:response.birthday.split("-")[2]),
                        month: Number(response.birthday.split("-")[1]),
                        day: Number(response.birthday.split("-")[0]),
                    }



                    setUser((prevState) => ({
                        ...prevState,
                        profile_preview:response.profile_pic!==null?response.profile_pic: "/assets/img/avatar-380-456332.png",
                        profile_pic:null,
                        birthday:userirthday,
                        mobile:response.mobile,
                        gender:response.gender,
                        name:response.name,
                        username:response.name,

                    }));
                }else {
                    setUser((prevState) => ({
                        ...prevState,
                        profile_preview:response.profile_pic!==null?response.profile_pic: "/assets/img/avatar-380-456332.png",
                        profile_pic:null,
                        mobile:response.mobile,
                    }));
                }

                setisLoading(false)


            }).catch(error => {
                showError(error)

                setisLoading(false)
            });
        }



    }, []);

console.log('user')
console.log(user)
    return (
        <MainDiv>
            {
                User.phoneValidate?
                    <TotalLoader isLoading={isLoading}>

                        <Top user={user} />

                        <div className="container">


                            <div className="row w-100  position-relative  mt-4"   style={{Height:'66px'}}>
                                <div   className='position-absolute d-flex align-items-center ProfileStatisticList w-70' style={{top:0,zIndex:-1,right:'-15px'}} >
                                </div>
                                <div className='w-100 h-100  d-flex justify-content-between align-items-center'>
                                    <div className='w-33'>
                                        <Link to='/salon/2'>
                                            <div className="text_pro">رزرو جدید<i className="fa fa-list-alt"
                                                                                  style={{paddingLeft: "5px", fontSize: "12px"}}/>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='w-33'>
                                        <Link to='my-reserve'>
                                            <div className="text_pro">رزروها<i className="fa fa-list-ol"
                                                                               style={{paddingLeft: "5px", fontSize: "12px"}}/></div>
                                        </Link>

                                    </div>
                                    <div className='w-33'>
                                        <div className="text_pro">تراکنش ها<i className="fa fa-clock-o"
                                                                              style={{paddingLeft: "5px", fontSize: "12px"}}/></div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="boxpro">
                                        <p className="boxpro_q">تعداد رزرو ها</p>
                                        <br/>
                                        <p>
                                            {user.total_reserves}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="boxpro">
                                        <p className="boxpro_q">ساعت بازی</p>
                                        <br/>
                                        <p>
                                            {user.total_play_time}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="boxpro">
                                        <p className="boxpro_q">رزرو های فعال</p>
                                        <br/>
                                        <p>
                                            {user.active_reserves}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="boxpro">

                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="boxpro">

                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="boxpro">

                                    </div>
                                </div>

                            </div>
                        </div>

                        <ModalComponent user={user} changeUser={setUser}/>

                        <Footer/>


                    </TotalLoader>    :
                    <div className='w-85 mb-20vh  position-absolute centered-axis-xy '>
                        <div className='w-100 d-flex justify-content-center align-items-center flex-column'>
                            <img src='/assets/img/user-profile.svg' alt="userProfile" className=""/>
                            <p className='text-center mb-0 Fs-16 font-color-base lineHeight28 font-weight-800 mt-20'>برای مشاهده اطلاعات کاربری و استفاده
                                از امکانات اپلیکیشن،
                                <span className="    text-black  " data-toggle="modal" dir='rtl'
                                      // onClick={()=>{ document.getElementById('modalCenterOpen').click()}}
                                      onClick={()=>{toggleModal("profile")}}>
                                      ورود / ثبت نام
                                </span>
                                کنید
                               </p>

                        </div>
                        <ModalComponent  user={user} changeUser={setUser}/>
                    </div>
            }




            <PhoneValidate isOpen={Modal.isOpen} toggle={()=>{toggleModal("profile")}}  finishRequest={()=>{ document.getElementById('myModal').style.display = 'block';}} />


        </MainDiv>
    );
}
export default Index;