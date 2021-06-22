import React, {useState, useEffect} from "react";
 import {paymentRequest, showError, updateUser, userLogin, verifyMobile} from "../../api";
import {gotennisNotif} from "../../utils/Notification";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
 import SlideAnimation from "./SLideAnimation/SlideAnimation";
import {UseSideAnimate} from "../../Hooks/UseSideAnimate/UseSideAnimate";
import {NumberSeparatorFunction, validatephoneNumber} from "../../utils/HelperFunction";
import {UseProfile} from "../../Hooks/UseProfile/UseProfile";
import CenterScreenModal from "../Common/Modal/CenterModal";
 import {UseModals} from "../../Hooks/UseModals/UseModals";
import {useHistory} from "react-router-dom";

export const Modal = ({user,changeUser}) => {
    const { Modal,toggleModal}=UseModals();
    let[PhoneNumber,setPhoneNumber]=useState('');
    const {User,EditUser}=UseProfile();
    let history = useHistory();
    let [error, setError] = useState( {name:false,mobile:false})
    let [isLoading, setisLoading] = useState( false)
    let [userInfo, setUserInfo] = useState( {
        birthday: null,
        gender: "1",
        mobile:User.phoneNumber,
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

        if (user!==undefined) setUserInfo(user);
     }, [user]);

    useEffect(() => {
        setUserInfo((prevState) => ({
            ...prevState,
            mobile:User.phoneNumber,
        }));

        // if (user!==undefined) setUserInfo(user);
     }, [User.phoneNumber]);

    const submitHandler = () => {
        let validate=true

        if (userInfo.name.length<2){
            setError((prevState) => ({
                ...prevState,
                name:true,
            }));
            // setError({...error,name: true})
            validate=false
        }

        if (!validatephoneNumber(userInfo.mobile)){
            setError((prevState) => ({
                ...prevState,
                mobile: true
            }));
            // setError({...error,mobile: true})
            validate=false
        }
        if (validate){
            setisLoading(true)
            // document.getElementById('myModal').style.display = 'none'
            // if (!User.phoneValidate){
            //     document.getElementById('modalCenterOpen').click()
            // }




            // gotennisNotif(2);
            // const ext_info = {mac_address: user, push_id: '4', device_id: '2g', imei: '1w'};
            //
            // setUserInfo(old => {
            //     return {old, ...ext_info}
            // });
            // console.log(userInfo)
             let formData = new FormData();
            // let PhoneNumber='98'+ userInfo.mobile.slice(1,11)
            let PhoneNumber=userInfo.mobile
            console.log(PhoneNumber)
            setPhoneNumber(PhoneNumber)
           // let PhoneNumber= userInfo.mobile.replace("0", "98");
            formData.append("name", userInfo.name);
            formData.append("push_id", userInfo.push_id);
            formData.append("push_id", userInfo.push_id);
            formData.append("device_id", userInfo.device_id);
            formData.append("imei", userInfo.imei);
            formData.append("mac_address", userInfo.mac_address);
            formData.append("mobile", PhoneNumber);
            formData.append("gender", userInfo.gender);
            formData.append("username", userInfo.name);
            console.log(userInfo.profile_pic)
            if (userInfo.profile_pic!==null){
                formData.append("profile_pic", userInfo.profile_pic);
            }

             if (userInfo.birthday!==null){
                formData.append("birthday",userInfo.birthday['day']+'-'+userInfo.birthday['month']+'-'+userInfo.birthday['year'] );
                // formData.append("birthday",userInfo.birthday['year']+'-'+userInfo.birthday['month']+'-'+userInfo.birthday['day'] );
                console.log(userInfo.birthday['day']+'-'+userInfo.birthday['month']+'-'+userInfo.birthday['year'])
            }else {
                formData.append("birthday",null );

            }
            // if (User.phoneValidate){
            //
            // }else {
            //     formData.append("mobile", userInfo.mobile);
            // }
            //
            // console.log(userInfo)
            // console.log(userInfo.birthday['day']+'-'+userInfo.birthday['month']+'-'+userInfo.birthday['year'])




            // 16-03-1993







            //
            // active_reserves: 49
            // balance: 895800
            // birthday: {year: 1363, month: 3, day: 16}
            // gender: "0"
            // mobile: "09125416874"
            // name: "mehrdad"
            // profile_pic: null
            // profile_preview: "https://panel.gotennis.ir/profilePic/2"
            // push_id: "4"
            // score: 10
            // total_messages: 0
            // total_play_time: 24
            // total_reserves: 73
            // unread_messages: 0

            //
            updateUser(formData).then(   response => {
                console.log(response)
                let {data: {code , data , message }}=response
                if (code===200){
                    EditUser(PhoneNumber,'phoneNumber')
                    gotennisNotif(4,"اطلاعات کاربر به روز رسانی شد ")

                   if (history.location.pathname==='/profile') {
                       window.location.reload()
                   }

                }else  if (code===403){

                    toggleModal("profile");

                }else {
                    gotennisNotif(4,message)
                }
                    document.getElementById('myModal').style.display = 'none'

                setisLoading(false)
                }


            ).catch(error => {
                showError(error)
                setisLoading(false)
            });
        }



    }

    const closeModal = (e) => {
        if (e.target !== e.currentTarget) return true
        else document.getElementById('myModal').style.display = 'none'
    }
    const handelChangeImg = (e) => {
        setUserInfo({...userInfo,profile_pic:e.target.files[0],profile_preview:URL.createObjectURL(e.target.files[0])})
    }

    return (
        <div id="myModal" className="modal"  onClick={closeModal}>

            <div className="modal-content" style={{bottom: 0}}>
                <div className="modal-header">

                        <img className="modal-img" src={ userInfo.profile_preview} alt='profile_pic' onClick={()=>{document.getElementById('selectedFile').click()}} />

                        <input type="file" id="selectedFile" style={{display: 'none'}} onChange={handelChangeImg} />

                    <span className="close"
                          onClick={() => document.getElementById('myModal').style.display = 'none'}>&times;</span>
                </div>
                <div className="modal-body">
                    <div className="modal-form">
                        <div className={["group ",error.name?"errorInput":""].join(" ")}>
                            <input id="name"
                                   name="name"
                                   type="text"
                                   onChange={e =>{ setUserInfo({...userInfo,name: e.target.value});setError({...error,name:false})}}
                                   value={userInfo.name}
                                   required=""/>
                            <span className="highlight"/>
                            <span className="bar"/>
                            <label>نام و نام خانوادگی</label>
                        </div>
                        {
                            error.name?
                                <div className=" errorColor">
                                    نام و نام خوانوادگی اجباری است
                                </div>:""
                        }


                        <div className="group">

                            <DatePicker
                                value={userInfo.birthday}
                                onChange= {( value ) => setUserInfo({...userInfo,birthday: value })}
                                shouldHighlightWeekends
                                locale="fa"
                            />


                            <span className="highlight"/>
                            <span className="bar"/>
                            <label>تاریخ تولد (اختیاری)</label>
                        </div>
                        <div className={["group ",error.mobile?"errorInput":""].join(" ")}>
                            <input id="mobile"
                                   name="mobile"
                                   type="text"
                                   disabled={User.phoneValidate===true}
                                   value={userInfo.mobile}
                                   onChange={e => {setUserInfo({...userInfo,mobile: e.target.value});setError({...error,mobile:false})}}
                                   required=""/>
                            <span className="highlight"/>
                            <span className="bar"/>
                            <label>شماره همراه</label>
                        </div>
                        {
                            error.mobile?
                                <div className=" errorColor">
                                    شماره تماس معتبر نیست
                                </div>:""
                        }

                        <div className="" style={{direction: "rtl"}}>
                            <label htmlFor="male" style={{display: 'inline-block', width: '25%'}}>جنسیت: </label>

                            <input type="radio"
                                   id="male"
                                   name="gender"
                                   defaultValue="0"
                                   value="0"
                                   checked={userInfo.gender === "0"}
                                   onChange={e => setUserInfo({...userInfo,gender: "0"})}
                                   style={{marginRight: "10px"}}/>
                            <label htmlFor="male" style={{
                                marginRight: '5px',
                                verticalAlign: 'middle'
                            }}>مرد</label>

                            <input type="radio" id="female"
                                   name="gender"
                                   defaultValue="1"
                                   value="1"
                                   checked={userInfo.gender === "1"}
                                   onChange={e => setUserInfo({...userInfo,gender: "1"})}
                                   style={{marginRight: "10px"}}/>
                            <label htmlFor="female" style={{
                                marginRight: '5px',
                                verticalAlign: 'middle'
                            }}>زن</label>

                            <br/>
                        </div>
                        <div className="" style={{direction: "rtl", textAlign: "center", marginTop: '25px'}}>
                            {
                                isLoading?
                                    <span   className=' '
                                            style={{
                                        background: "#20d35e",
                                        color: "white",
                                        padding: "5px",
                                        border: "none",
                                        borderRadius: "5px",
                                        paddingRight: "20px",
                                        paddingLeft: "20px",
                                        marginLeft: "10px"
                                    }}>
                                   <i className="fa fa-spinner fa-spin   fa-fw" aria-hidden="true"></i>
                                </span>:
                                    <input type="submit" value="ذخیره اطلاعات"
                                           onClick={() => submitHandler()}
                                           style={{
                                               background: "#20d35e",
                                               color: "white",
                                               padding: "5px",
                                               border: "none",
                                               borderRadius: "5px",
                                               paddingRight: "10px",
                                               paddingLeft: "10px",
                                               marginLeft: "10px"
                                           }}/>
                            }

                            <button onClick={() => document.getElementById('myModal').style.display = 'none'}
                                    style={{
                                        background: "#b2b2b1",
                                        color: "white",
                                        padding: "5px",
                                        border: "none",
                                        borderRadius: "5px",
                                        paddingRight: "10px",
                                        paddingLeft: "10px"
                                    }}>انصراف
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <ValidateCode isOpen={Modal.isOpen} toggle={()=>{toggleModal("profile")}} PhoneNumber={PhoneNumber}/>
         </div>
    );
}


export const CenterModal = (props) => {
    const [phone, setphone] = useState('');
    const [code, setcode] = useState('');
    const {EditUser} = UseProfile( );
    useEffect(() => {
        if (props.compState!==undefined){
            ChangePage( props.compState,'fadeExit')
        }

    }, [props.compState]);
    let { mode,state,ChangePage}= UseSideAnimate()
    const resetStats =(type=1)=>{
        if (type===1){
            document.getElementById('close').click()
        }else {
             setphone("")
            setcode("")
            ChangePage( 1,'fadeEnter')
            setTimeout(function(){    document.getElementById('close').click() }, 500);
        }


    }
    const submitPhone=()=>{
        let validate=true

            console.log(phone)
            console.log(validatephoneNumber(phone))
        if (!validatephoneNumber(phone)){
            gotennisNotif(4,'شماره تلفن وارده صحیح نمی باشد ')

            validate=false
        }
        if (validate){

            userLogin(phone).then(response => {
                console.log(response)
                 ChangePage( 2,'fadeEnter')

                }
            ).catch(error =>{
                showError(error)
                document.getElementById('myModal').style.display = 'none'
            });
        }

    }
    const submitcode=async ()=>{

        await verifyMobile(code,phone).then  ( async response => {
            console.log(response)
            console.log(response.data.data.access_token)
            let userName="کاربر"
               await EditUser('Bearer'+' '+response.data.data.access_token,'token')
            if (  response.data.data.profile_pic!==null){
                await EditUser( response.data.data.profile_pic,'img')
            }  if (  response.data.data.name!==null){
                    userName=response.data.data.name
                await EditUser( response.data.data.name,'name')
            }


                resetStats();
                gotennisNotif(4,'خوش آمدید '+userName)

window.location.reload()

                    // ChangePage( 2,'fadeExit')
                     // document.getElementById('exampleModalCenter').style.display = 'none'
                }
            ).catch(error => showError(error));


    }


    return (
        <div>
            <div style={{display:"none"}}   data-toggle="modal"
                 data-target="#exampleModalCenter" id='modalCenterOpen'>
            </div>


            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content w-100">
                        <span data-dismiss="modal" aria-label="Close" id='close' style={{display:"none"}}>a</span>

                        <div className="modal-body">
                            <SlideAnimation mode={"fadeEnter"} state={state}>
                                <div className='mainContent  '>

                                    <p className='text-center ' style={{color:"#353535",fontWeight:'bold'}}>جهت ادامه شماره موبایل خود را وارد کنید </p>
                                    <div className='w-100' style={{position:"relative",height:"44px"}}>
                                        <input type="number" value={phone} className='inputPhone text-center' placeholder='شماره موبایل'   onChange={e => setphone( e.target.value)}  />


                                        <span style={{position:"absolute",right:"8px",top:'3px'}} >  <i className="fa fa-mobile fa-2x text-danger" aria-hidden="true"></i></span>

                                    </div>
                                    <div className='w-100 d-flex justify-content-between'  >

                                         <span
                                               onClick={resetStats}
                                               style={{
                                                 background: "#fff",
                                                 color: "#000",
                                                 padding: "5px",
                                                 border: "1px solid #000",
                                                 borderRadius: "5px",
                                                 paddingRight: "10px",
                                                 paddingLeft: "10px",
                                                 marginTop: "1em",
                                                 width:"45%"
                                             }} className='text-center'>بستن</span>

                                        <input type="submit" value="تایید"
                                               onClick={submitPhone}
                                               style={{
                                                   background: "#20d35e",
                                                   color: "white",
                                                   padding: "5px",
                                                   border: "none",
                                                   borderRadius: "5px",
                                                   paddingRight: "10px",
                                                   paddingLeft: "10px",
                                                   marginTop: "1em",
                                                   width:"45%"
                                               }}/>




                                    </div>

                                    {/*<button  onClick={()=>{ChangePage( 2,'fadeExit')}}>next</button>*/}
                                </div>

                                <div className='mainContent  '>

                                    <p className='text-center ' style={{color:"#353535",fontWeight:'bold'}}>جهت ادامه کد فعال سازی پیامک شده را وارد کنید </p>
                                    <div className='w-100' style={{position:"relative",height:"44px"}}>
                                        <input type="number" value={code} className='inputPhone text-center' placeholder='کد فعال سازی'   onChange={e => setcode( e.target.value)}  />


                                        <span style={{position:"absolute",right:"8px",top:'3px'}} >  <i className="fa fa-mobile fa-2x text-danger" aria-hidden="true"></i></span>

                                    </div>
                                    <div className='w-100 d-flex justify-content-between'  >

                                         <span
                                             onClick={()=>{resetStats(2)}}
                                               style={{
                                                   background: "#fff",
                                                   color: "#000",
                                                   padding: "5px",
                                                   border: "1px solid #000",
                                                   borderRadius: "5px",
                                                   paddingRight: "10px",
                                                   paddingLeft: "10px",
                                                   marginTop: "1em",
                                                   width:"45%"
                                               }} className='text-center'>بستن</span>

                                        <input type="submit" value="تایید"
                                               onClick={submitcode}
                                               style={{
                                                   background: "#20d35e",
                                                   color: "white",
                                                   padding: "5px",
                                                   border: "none",
                                                   borderRadius: "5px",
                                                   paddingRight: "10px",
                                                   paddingLeft: "10px",
                                                   marginTop: "1em",
                                                   width:"45%"
                                               }}/>




                                    </div>



                                    {/*<button  onClick={()=>{ChangePage( 2,'fadeExit')}}>next</button>*/}
                                </div>

                            </SlideAnimation>

                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
};
export const ValidateCode = (props) => {

    const [code, setcode] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const {EditUser} = UseProfile();





    const submitcode=async ()=>{
        setIsloading(true)
        await verifyMobile(code,props.PhoneNumber).then  ( async response => {
                console.log(response)
                if (response.data.code===200){
                    console.log(response.data.data.access_token)
                    let userName="کاربر"
                    let Token='Bearer'+' '+response.data.data.access_token
                    await EditUser(Token,'token')
                    if (  response.data.data.profile_pic!==null){
                        await EditUser( response.data.data.profile_pic,'img')
                    }  if (  response.data.data.name!==null && response.data.data.name!=="")  {
                        userName=response.data.data.name
                        await EditUser( response.data.data.name,'name')
                    }

                    await EditUser(true,'phoneValidate')
                    await EditUser(response.data.data.mobile,'phoneNumber')

                    props.toggle()
                    gotennisNotif(4,'خوش آمدید '+userName)
                    props.finishRequest()
                }else {
                    gotennisNotif(4,response.data.message )
                    props.toggle()
                }




                // ChangePage( 2,'fadeExit')
                // document.getElementById('exampleModalCenter').style.display = 'none'
            }
        ).catch(error => {
            showError(error) ;   props.toggle();
            setIsloading(false)
        });


    }


    return (
        <CenterScreenModal {...props}>
            <div className=" position-relative">
                <div className='mainContent  modal-body bg-white br-5px'>

                    <p className='text-center ' style={{color: "#353535", fontWeight: 'bold'}}>جهت ادامه کد فعال
                        سازی پیامک شده را وارد کنید </p>
                    <div className='w-100' style={{position: "relative", height: "44px"}}>
                        <input type="number" value={code} className='inputPhone text-center'
                               placeholder='کد فعال سازی' onChange={e => setcode(e.target.value)}/>


                        <span style={{position: "absolute", right: "8px", top: '3px'}}>  <i
                            className="fa fa-mobile fa-2x text-danger" aria-hidden="true"></i></span>

                    </div>
                    <div className='w-100 d-flex justify-content-between'>

                                         <span
                                             onClick={() => {
                                                 props.toggle()
                                             }}
                                             style={{
                                                 background: "#fff",
                                                 color: "#000",
                                                 padding: "5px",
                                                 border: "1px solid #000",
                                                 borderRadius: "5px",
                                                 paddingRight: "10px",
                                                 paddingLeft: "10px",
                                                 marginTop: "1em",
                                                 width: "45%"
                                             }} className='text-center'>بستن</span>

                        <input type="submit" value="تایید"
                               onClick={submitcode}
                               style={{
                                   background: "#20d35e",
                                   color: "white",
                                   padding: "5px",
                                   border: "none",
                                   borderRadius: "5px",
                                   paddingRight: "10px",
                                   paddingLeft: "10px",
                                   marginTop: "1em",
                                   width: "45%"
                               }}/>


                    </div>


                </div>
            </div>
        </CenterScreenModal>
    );
};

export const SelectPay = ({wallet ,total , notMenu,preOrderList,getSans}) => {

     let [walletCount, setwallet] = useState( 0)
    let [payType, setpayType] = useState( null)


    useEffect(() => {

        if (wallet!==undefined) setwallet(wallet);
    }, [wallet]);

    const submitHandler = async () => {
         if (payType===null){
            gotennisNotif(4,'نوع پرداخت را انتخاب کنید')
        }else {
            document.getElementById('payModal').style.display = 'none'
            if (payType===2){
                 // console.log(preOrderList.url)
                window.location.href = preOrderList.url;

            }else {
                let {data: {code , data , message }}= await paymentRequest( payType,preOrderList.credit_id,'0')
                // console.log(code , data , message)
                closeModal()
                if (code===200){
                    gotennisNotif(4,message)

                }else {
                    gotennisNotif(4,message)
                }
            if (getSans!==undefined){
                getSans()
            }

            }


        }


    }


    const closeModal = (e) => {
        if (e.target !== e.currentTarget) return true
        else document.getElementById('payModal').style.display = 'none'
    }


    return (
        <div id="payModal" className="modal"  onClick={closeModal}>

            <div className="modal-content" style={{bottom: 0,paddingBottom:notMenu?0:'50px'}}>

                <div className="position-relative">
                    <p className='text-right Fs-14 text-GrayAsparagus pr-3 pl-3 pt-16 font-weight-bold '>انتخاب روش پرداخت </p>
                    <p  className='text-right Fs-14 text-GrayAsparagus pr-3 pl-3 font-weight-bold' >موجودی کیف پوش شما : {NumberSeparatorFunction(walletCount)} تومان </p>
                    <p className='border-bottom w-100'></p>
                    <div className='d-flex justify-content-between pr-3 pl-3'>
                        <span className={['flex-center text-GrayAsparagus p-3  br-15px position-relative',payType===1?"borer-MountainMeadow":"borer-Silver "].join(" ")} onClick={()=>{setpayType(1)}}>
                               <span className={[ 'position-absolute',payType===1?"d-block":"d-none "].join(" ")} style={{top:0,left:10}}><i className="fa fa-check text-MountainMeadow" aria-hidden="true"></i></span>

                              <span> اعتبار کیف پول</span>

                          <img src="/assets/img/wallet.png" alt='wallet' className='ml-2'/>
                        </span>


                        <span className={['flex-center text-GrayAsparagus p-3 br-15px position-relative ',payType===2?"borer-MountainMeadow":"borer-Silver "].join(" ")}  onClick={()=>{setpayType(2)}}>
                           <span className={[ 'position-absolute',payType===2?"d-block":"d-none "].join(" ")} style={{top:0,left:10}}><i className="fa fa-check text-MountainMeadow" aria-hidden="true"></i></span>
                            <span>پرداخت اینترنتی</span>
                            <img  src="/assets/img/shetab.png" alt='wallet' className='ml-2'/>
                        </span>
                    </div>

                    <div className='mt-3 bg-gray d-flex justify-content-between align-items-center   pr-3 pl-3' style={{height:'60px'}}>
                         <span className='btn-modal-submit flex-center' style={{width:'45%'}} onClick={submitHandler}>
                            <span>پرداخت</span>

                        </span>
                        <span>قابل پرداخت : {total}</span>


                    </div>

                </div>
            </div>

            <CenterModal compState={2}/>
        </div>
    );
}

export const PreFactor = (props) => {



    const resetStats =(type=1)=>{
        if (type===1){
            document.getElementById('close').click()
        }else {


            setTimeout(function(){    document.getElementById('close').click() }, 500);
        }


    }





    return (
        <div>
            <div style={{display:"none"}}   data-toggle="modal"
                 data-target="#PreFactor" id='PreFactorOpen'>
            </div>


            <div className="modal fade" id="PreFactor" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content w-100">
                        <span data-dismiss="modal" aria-label="Close" id='close' style={{display:"none"}}>a</span>

                        <div className="modal-body top_profile">

                            <div className='w-100 factor-header'>
                                <p className='col-sm-12 text-right text-white pt-2 '>  پیش فاکتور رزرو شما</p>
                                <div className='d-flex justify-content-center'>
                                    <div  className='col-sm-11' style={{marginTop:'4%',marginBottom:'4%'}}>

                                        <p className='container-fill '>
                                            <div className='filler-fill'></div>
                                         <span className='label-fill-factor text-ellipsis' style={{color: "#b0eb2e",maxWidth:'95px'}}dir='rtl'>{ props.data.name} </span>
                                            <span className='text-fill-factor'>نام کلاس انتخابی</span>
                                        </p>


                                        <div className='container-fill  '>
                                            <div className='filler-fill'></div>
                                            <span className='label-fill-factor' style={{color: "#b0eb2e"}} dir='rtl'>   { NumberSeparatorFunction(props.data.price)+' '+'تومان'  } </span>
                                            <span className='text-fill-factor'>مبلغ فاکتور شما</span>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='w-100 bg-white'>
                            <div className='text-center' style={{padding: '10px'}}>
                                <button style={{
                                    borderRadius: '10px',
                                    display: 'block',
                                    width: '100%',
                                    border: 'none',
                                    padding: '10px',
                                    backgroundColor: 'rgb(201,237,44)',
                                    color: 'rgb(101,96,131)',
                                }} onClick={props.goPay}>
                                    رزرو نهایی
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
};


export const PhoneValidate = (props) => {
    const [phone, setphone] = useState('');
    const [code, setcode] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const {EditUser} = UseProfile();
    useEffect(() => {

        if (props.compState!==undefined){

            ChangePage( props.compState,'fadeExit')
        }
        return ChangePage( 1,'fadeExit')

    }, [props.compState]);


    let { mode,state,ChangePage}= UseSideAnimate()
    const resetStats =(e,type=1)=>{
        setIsloading(false)
        console.log("type" )
        console.log(type )
        if (type===1){
            console.log("type1")
            // document.getElementById('close').click()
            props.toggle()
        }else {
            setphone("")
            setcode("")
            ChangePage( 1,'fadeEnter')

            // props.toggle()
            // setTimeout(function(){    document.getElementById('close').click() }, 500);
            setTimeout(function(){     props.toggle() }, 500);
        }


    }
    const submitPhone=()=>{
        let validate=true

         if (!validatephoneNumber(phone)){
            gotennisNotif(4,'شماره تلفن وارده صحیح نمی باشد ')

            validate=false
        }
        if (validate){
            let PhoneNumber='98'+ phone.slice(1,11)
            console.log(PhoneNumber)
            setIsloading(true)
            userLogin(PhoneNumber).then(response => {
                    console.log(response)
                    ChangePage(2, 'fadeExit')
                setIsloading(false)
                }
            ).catch(error => {
                showError(error)
                props.toggle()
                setIsloading(false)
                // document.getElementById('myModal').style.display = 'none'
            });
        }

    }
    const submitcode=async ()=>{
        setIsloading(true)
        await verifyMobile(code,phone).then  ( async response => {
                console.log(response)
            if (response.data.code===200){
                console.log(response.data.data.access_token)
                let userName="کاربر"
                let Token='Bearer'+' '+response.data.data.access_token
                await EditUser(Token,'token')
                if (  response.data.data.profile_pic!==null){
                    await EditUser( response.data.data.profile_pic,'img')
                }  if (  response.data.data.name!==null && response.data.data.name!=="")  {
                    userName=response.data.data.name
                    await EditUser( response.data.data.name,'name')
                }

                await EditUser(true,'phoneValidate')
                await EditUser(response.data.data.mobile,'phoneNumber')

                resetStats();
                gotennisNotif(4,'خوش آمدید '+userName)

                if (response.data.data.birthday===null){
                    window.location.reload()
                }

            }else {
                gotennisNotif(4,response.data.message )
                resetStats();
            }




                // ChangePage( 2,'fadeExit')
                // document.getElementById('exampleModalCenter').style.display = 'none'
            }
        ).catch(error => {
            showError(error) ;   props.toggle();
            setIsloading(false)
        });


    }


    return (
        <CenterScreenModal {...props}>
            <div className=" position-relative">
                <SlideAnimation mode={"fadeEnter"} state={state}>
                    <div className='mainContent  modal-body bg-white br-5px'>

                        <p className='text-center ' style={{color: "#353535", fontWeight: 'bold'}}>جهت ادامه شماره
                            موبایل خود را وارد کنید </p>
                        <div className='w-100' style={{position: "relative", height: "44px"}}>
                            <input type="number" value={phone} className='inputPhone text-center'
                                   placeholder='شماره موبایل' onChange={e => setphone(e.target.value)}/>


                            <span style={{position: "absolute", right: "8px", top: '3px'}}>  <i
                                className="fa fa-mobile fa-2x text-danger" aria-hidden="true"></i></span>

                        </div>
                        <div className='w-100 d-flex justify-content-between'>

                                         <span
                                             onClick={resetStats}
                                             style={{
                                                 background: "#fff",
                                                 color: "#000",
                                                 padding: "5px",
                                                 border: "1px solid #000",
                                                 borderRadius: "5px",
                                                 paddingRight: "10px",
                                                 paddingLeft: "10px",
                                                 marginTop: "1em",
                                                 width: "45%"
                                             }} className='text-center'>بستن</span>

                            {
                                isLoading?<span   className='flex-center'      style={{
                                    background: "#20d35e",
                                    color: "white",
                                    padding: "5px",
                                    border: "none",
                                    borderRadius: "5px",
                                    paddingRight: "10px",
                                    paddingLeft: "10px",
                                    marginTop: "1em",
                                    width: "45%"
                                }}>
                                   <i className="fa fa-spinner fa-spin   fa-fw" aria-hidden="true"></i>
                                </span>:
                                    <input type="submit" value="تایید"
                                           onClick={submitPhone}
                                           style={{
                                               background: "#20d35e",
                                               color: "white",
                                               padding: "5px",
                                               border: "none",
                                               borderRadius: "5px",
                                               paddingRight: "10px",
                                               paddingLeft: "10px",
                                               marginTop: "1em",
                                               width: "45%"
                                           }}/>
                            }




                        </div>

                        {/*<button  onClick={()=>{ChangePage( 2,'fadeExit')}}>next</button>*/}
                    </div>

                    <div className='mainContent  modal-body bg-white br-5px'>

                        <p className='text-center ' style={{color: "#353535", fontWeight: 'bold'}}>جهت ادامه کد فعال
                            سازی پیامک شده را وارد کنید </p>
                        <div className='w-100' style={{position: "relative", height: "44px"}}>
                            <input type="number" value={code} className='inputPhone text-center'
                                   placeholder='کد فعال سازی' onChange={e => setcode(e.target.value)}/>


                            <span style={{position: "absolute", right: "8px", top: '3px'}}>  <i
                                className="fa fa-mobile fa-2x text-danger" aria-hidden="true"></i></span>

                        </div>
                        <div className='w-100 d-flex justify-content-between'>

                                         <span
                                             onClick={(e) => {
                                                 resetStats(e,2)
                                             }}
                                             style={{
                                                 background: "#fff",
                                                 color: "#000",
                                                 padding: "5px",
                                                 border: "1px solid #000",
                                                 borderRadius: "5px",
                                                 paddingRight: "10px",
                                                 paddingLeft: "10px",
                                                 marginTop: "1em",
                                                 width: "45%"
                                             }} className='text-center'>بستن</span>

                            <input type="submit" value="تایید"
                                   onClick={submitcode}
                                   style={{
                                       background: "#20d35e",
                                       color: "white",
                                       padding: "5px",
                                       border: "none",
                                       borderRadius: "5px",
                                       paddingRight: "10px",
                                       paddingLeft: "10px",
                                       marginTop: "1em",
                                       width: "45%"
                                   }}/>


                        </div>


                     </div>

                </SlideAnimation>
            </div>
        </CenterScreenModal>
    );
};