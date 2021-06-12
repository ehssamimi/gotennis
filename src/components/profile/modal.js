import React, {useState, useEffect} from "react";
 import {paymentRequest, updateUser} from "../../api";
import {gotennisNotif} from "../../utils/Notification";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
 import SlideAnimation from "./SLideAnimation/SlideAnimation";
import {UseSideAnimate} from "../../Hooks/UseSideAnimate/UseSideAnimate";
import {NumberSeparatorFunction, validatephoneNumber} from "../../utils/HelperFunction";
import {UseProfile} from "../../Hooks/UseProfile/UseProfile";

export const Modal = ({user,changeUser}) => {
    const {User}=UseProfile();
    let [error, setError] = useState( {name:false,mobile:false})
    let [userInfo, setUserInfo] = useState( {
        birthday: null,
        gender: "1",
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
        console.log('**********user*******')
        console.log(user)
        if (user!==undefined) setUserInfo(user);
     }, [user]);

    const submitHandler = () => {
        let validate=true
        if (userInfo.name.length<2){
            setError({...error,name: true})
            validate=false
        }

        if (!validatephoneNumber(userInfo.mobile)){
            setError({...error,mobile: true})
            validate=false
        }
        if (validate){
            document.getElementById('myModal').style.display = 'none'

            document.getElementById('modalCenterOpen').click()


            // gotennisNotif(2);
            // const ext_info = {mac_address: user, push_id: '4', device_id: '2g', imei: '1w'};
            //
            // setUserInfo(old => {
            //     return {old, ...ext_info}
            // });
            console.log(userInfo)
            if (changeUser!==undefined) changeUser(userInfo);


            //
            // updateUser(userInfo).then(response => {
            //         document.getElementById('myModal').style.display = 'none'
            //     }
            // ).catch(error => error);
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
            <CenterModal compState={2}/>
        </div>
    );
}


export const CenterModal = (props) => {
    const [phone, setphone] = useState('');
    const [code, setcode] = useState('');
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
        ChangePage( 2,'fadeExit')
    }
    const submitcode=()=>{
        ChangePage( 1,'fadeExit')
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
                            <SlideAnimation mode={mode} state={state}>
                                <div className='mainContent  '>

                                    <p className='text-center ' style={{color:"#353535",fontWeight:'bold'}}>جهت ادامه شماره موبایل خود را وارد کنید </p>
                                    <div className='w-100' style={{position:"relative",height:"44px"}}>
                                        <input type="number" value={code} className='inputPhone text-center' placeholder='شماره موبایل'   onChange={e => setcode( e.target.value)}  />


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
                                        <input type="number" value={phone} className='inputPhone text-center' placeholder='کد فعال سازی'   onChange={e => setphone( e.target.value)}  />


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

export const SelectPay = ({wallet ,total , notMenu,preOrderList}) => {

    let [error, setError] = useState( {name:false,mobile:false})
    let [walletCount, setwallet] = useState( 0)
    let [payType, setpayType] = useState( null)


    useEffect(() => {
        console.log('**********wallet*******')
        console.log(wallet)
        if (wallet!==undefined) setwallet(wallet);
    }, [wallet]);

    const submitHandler = async () => {
        console.log(preOrderList)
        if (payType===null){
            gotennisNotif(4,'نوع پرداخت را انتخاب کنید')
        }else {
            document.getElementById('payModal').style.display = 'none'

            let {data: {code , data , message }}= await paymentRequest( payType,preOrderList.credit_id,'0')
            console.log(code , data , message)
            if (code===200){
                gotennisNotif(4,message)
            }else {
                gotennisNotif(4,message)
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
                                            <span className='label-fill-factor' style={{color: "#b0eb2e"}} dir='rtl'>{ props.data.name} </span>
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



// created_at: "2021-06-12 22:41:02"
// deleted_at: null
// details: Array(1)
// 0:
// cost: "55000"
// created_at: "2021-06-12 22:41:02"
// deleted_at: null
// id: 662
// is_used: null
// payment_type: 1
// reserve_id: "443"
// sans:
//     cost: "55000"
// court: {id: 3, active: "1", name: "زمین شماره 1", complex_id: "2", phone: "02433446549", …}
// court_id: "3"
// created_at: "2021-05-16 08:31:23"
// day: {due_date: "2021-06-20 00:00:00"}
// day_id: "263"
// deleted_at: null
// finish_time: "22:00:00"
// gender: "0"
// id: 5533
// sport_id: "1"
// start_time: "21:00:00"
// updated_at: "2021-06-12 22:41:06"
// __proto__: Object
// sans_id: "5533"
// trace_code: "4986997"
// updated_at: "2021-06-12 22:41:02"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// id: 443
// status_id: 1
// total: "55000.00"
// updated_at: "2021-06-12 22:41:06"
// user_id: "2"
