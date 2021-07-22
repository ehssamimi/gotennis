import React, {useCallback, useEffect, useState} from "react";
import {checkReserved, getSans} from "../../api";
import {gotennisNotif} from "../../utils/Notification";
import {getIndexIfObjWithAttr, monthHandler} from "../../utils/HelperFunction";
import IsLoader from "../Common/IsLoader/IsLoader";
import IsLoader2 from "../Common/IsLoader/IsLoader2";
import {UseProfile} from "../../Hooks/UseProfile/UseProfile";
import {PhoneValidate} from "../profile/modal";
import {UseModals} from "../../Hooks/UseModals/UseModals";
// import {hours} from "jalali-react-datepicker/dist/utils/timePicker";

const SlideShow = ({court_id,updateReservedList,LoadingOutSide,courtName, LoadingFunc}) => {
    const {User}=UseProfile();
    const { Modal,toggleModal,openModal}=UseModals();
    const DaysArray=[ 'شنبه','یکشنبه','دوشنبه','سه شنبه','چهار شنبه','پنج شنبه','جمعه'  ]
    let [slideIndex, setSlideIndex] = useState(1);
    let [isLoading, setisLoading] = useState(true);
    let [reservedata, setReservedata] = useState( []);



    let [sansList, setSans] = useState([]);


    let [sansCount, setSansCount] = useState(0);

    const plusSlides = n => {
        setSlideIndex(slideIndex + n);
        showSlides(slideIndex);
    }

    const showSlides = useCallback(n => {

        let i;
        let slides = document.getElementsByClassName("mySlide");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) {
            setSlideIndex(1);
            return;
        }
        if (n < 1) {
            setSlideIndex(slides.length);
            return;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";

    }, [slideIndex]);


    const yearHandler = date => {

        return date.split("-")[0];
    }

    const headerDateHandler = date => {

        let _date = date.split("-");

        return _date[1] + '-' + _date[2];
    }

    const timeHandler = date => {

        let start_time = date.start_time.split(":");
        let finish_time = date.finish_time.split(":");

        if (start_time[0].charAt(0) == "0")
            start_time[0] = start_time[0].replace("0", "");

        if (finish_time[0].charAt(0) == "0")
            finish_time[0] = finish_time[0].replace("0", "");


        return start_time[0] + '-' + finish_time[0];

    }


    const handleClick = async (sans,key,date,key4,index) => {
        // console.log(sans)
        //  console.log(key)
        // console.log(date)
        // console.log(key4)
        // console.log(index)
        // console.log( courtName)

            // console.log(User.phoneValidate)
        let Profile='';
        if (localStorage.getItem("GoTennisInfo")){
            Profile=JSON.parse(localStorage.getItem("GoTennisInfo"))
        }else {
            Profile=User
        }
    // && Profile.name!== 'کاربر'
        if (Profile.phoneValidate ){
            let type=["expired","occupied","reserved"]


            if ( !type.includes(sans.status)){
                // if(sans.gender === 1){
                //     gotennisNotif(3)
                // }else  if(sans.gender === 0){
                    LoadingFunc(true)
                    let {data: {code , data , message }}= await checkReserved(sans.sans_id )
                    LoadingFunc(false)

                    if (code===200 && data){

                        let indexItem= getIndexIfObjWithAttr(reservedata,'sans_id',sans.sans_id)
                        if (sansList[key][date][key4].status==='selected'){
                            sansList[key][date][key4].status= "available"
                            reservedata.splice(indexItem,1)

                        }else {
                            sansList[key][date][key4].status='selected'
                            let mount=monthHandler(date);
                            let newD=date.split("-")
                            let NewSanse={...sans,'sanse_Date':[newD[2],mount,newD[0],DaysArray[index]],courtName}
                            reservedata.push(NewSanse)
                        }



                        setSans(sansList);
                        setReservedata(reservedata)
                        updateReservedList(reservedata)


                    }else {

                        console.log(code)

                        console.log(message)

                        if(Number(code)===400){
                            document.getElementById('myModal').style.display = 'block';
                        }

                        gotennisNotif(4,message)
                    }







                }


            // }
        }else {
            console.log(User.phoneValidate)
            console.log(Profile.phoneValidate)
            if (Profile.phoneValidate){
                document.getElementById('myModal').style.display = 'block';
            }else {
                toggleModal("profile")
            }


        }







    }




    useEffect(() => {
        setisLoading(true)


            // document.getElementById('modalCenterOpen').click()

            // document.getElementById('myModal').style.display = 'block';
        if (court_id!==null){
            getSans(court_id).then(response => {
                setisLoading(false)
                 setSans(response.data.data.weeks);

                showSlides(slideIndex);

            })
                .catch(error => error);
        }

    }, [court_id, showSlides, slideIndex, LoadingOutSide]);

    useEffect(() => {
        setisLoading(true)

        let Profile=JSON.parse(localStorage.getItem("GoTennisInfo"))
        console.log(Profile)
        if (!Profile.phoneValidate || Profile.name=== 'کاربر'){

            if (Profile.phoneValidate){
                console.log("open User")
                // document.getElementById('myModal').style.display = 'block';
            }else {
                toggleModal("profile")
            }
        }
    }, [ ]);



// console.log('***************sans**********')
// console.log(sans)
    return (
        <div className="slideshow-container " style={{borderRadius: '20px 20px 0 0' }}>

            {
                sansList.length > 0 && sansList.map((item, key) => {
                    return Object.keys(item).map((date, key2) => {
                            return <div className="mySlide" key={key + key2}>
                                <p className="mySlide-p">{yearHandler(date)} { monthHandler(date)}</p>

                                <div className="row">

                                    {
                                        DaysArray.map((day,index)=>

                                            <div className="col" key={index}>
                                                <span>{headerDateHandler(Object.keys(item)[index])}</span>
                                                <p className="mySlide-a" dir='rtl'>{ index===0?"شنبه":index===6?"جمعه":`${index} شنبه  `} </p>
                                            </div>
                                        ) }
                                </div>


                                    <IsLoader2 isLoader={isLoading}>
                                        <div className="row slideshow-container-mb" style={{minHeight: '205px',height:"35vh",overflowY:"scroll"}}>

                                            {
                                                DaysArray.map((day,index)=>

                                                    <div className="col" key={index}>

                                                        {Object.values(item)[index].map((row, key4) =>
                                                            <p className="mySlide-null" key={key4} onClick={() => handleClick(row,key,Object.keys(item)[index],key4,index)}>
                                                          <span className={[" mySlide-default ",`${
                                                              row.status === "selected" ?"mySlide-s":
                                                                  ( row.status === "expired" || row.status === "undefined" ||row.status === "locked") ?"mySlide-n":
                                                                      row.status === "occupied" ?"mySlide-c":
                                                                          row.status === "reserved" ?"mySlide-r":
                                                                              row.gender === 1 ? "mySlide-w" : "mySlide-m"}`].join(" ")}>
                                                                {timeHandler(row)}
                                                          </span>

                                                            </p>)}
                                                    </div>

                                                )
                                            }

                                        </div>
                                    </IsLoader2>



                            </div>

                        }
                    )
                })
            }

            <a className="prev" id="prev" onClick={() => plusSlides(-1)}>❮</a>
            <a className="next" id="next" onClick={() => plusSlides(1)}>❯</a>
            <PhoneValidate isOpen={Modal.isOpen} toggle={()=>{toggleModal("profile")}}  finishRequest={()=>{ window.location.reload()} }/>
        </div>
    )
}

export default SlideShow;