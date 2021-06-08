import {useCallback, useEffect, useState} from "react";
import {getSans} from "../../api";
import {gotennisNotif} from "../../utils/Notification";
import {getIndexIfObjWithAttr} from "../../utils/HelperFunction";
import IsLoader from "../Common/IsLoader/IsLoader";
import IsLoader2 from "../Common/IsLoader/IsLoader2";
// import {hours} from "jalali-react-datepicker/dist/utils/timePicker";

const SlideShow = ({court_id,updateReservedList,charts}) => {
    const DaysArray=[0,1,2,3,4,5,6]
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

    const monthHandler = date => {
        let month_number = date.split("-")[1];

        let month_text = '';

        switch (month_number) {
            case '01':
                month_text = 'فروردین';
                break;
            case '02':
                month_text = 'اردیبهشت';
                break;
            case '03':
                month_text = 'خرداد';
                break;
            case '04':
                month_text = 'تیر';
                break;
            case '05':
                month_text = 'مرداد';
                break;
            case '06':
                month_text = 'شهریور';
                break;
            case '07':
                month_text = 'مهر';
                break;
            case '08':
                month_text = 'آبان';
                break;
            case '09':
                month_text = 'آذر';
                break;
            case '10':
                month_text = 'دی';
                break;
            case '11':
                month_text = 'بهمن';
                break;
            case '12':
                month_text = 'اسفند';
                break;
            default:
                throw Error('ماه ناشناخته است.خطا از سمت سرور')
        }
        return month_text;

    }

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


    const handleClick = (sans,key,date,key4) => {
        // document.getElementById('myModal').style.display = 'block';

        let type=["expired","occupied","reserved"]
        if ( !type.includes(sans.status)){
            if(sans.gender === 1){
                gotennisNotif(3)
            }else  if(sans.gender === 0){



                let indexItem= getIndexIfObjWithAttr(reservedata,'sans_id',sans.sans_id)
                if (sansList[key][date][key4].status==='selected'){
                     sansList[key][date][key4].status= "available"
                    reservedata.splice(indexItem,1)

                }else {
                    sansList[key][date][key4].status='selected'
                    reservedata.push(sans)
                }


                setSans(sansList);
                setReservedata(reservedata)
                updateReservedList(reservedata)


            }


        }



    }




    useEffect(() => {
        setisLoading(true)
        if (court_id!==null){
            getSans(court_id).then(response => {
                setisLoading(false)
                console.log(response.data.data)
                setSans(response.data.data.weeks);

                showSlides(slideIndex);

            })
                .catch(error => error);
        }

    }, [court_id, showSlides, slideIndex]);



// console.log('***************sans**********')
// console.log(sans)
    return (
        <div className="slideshow-container" style={{borderRadius: '20px 20px 0 0',marginBottom:'144px'}}>

            {
                sansList.length > 0 && sansList.map((item, key) => {
                    return Object.keys(item).map((date, key2) => {
                            return <div className="mySlide" key={key + key2}>
                                <p className="mySlide-p">{yearHandler(date)} {monthHandler(date)}</p>

                                <div className="row">

                                    {
                                        DaysArray.map((day,index)=>

                                            <div className="col">
                                                <span>{headerDateHandler(Object.keys(item)[index])}</span>
                                                <p className="mySlide-a" dir='rtl'>{ index===0?"شنبه":index===6?"جمعه":`${index} شنبه  `} </p>
                                            </div>
                                        ) }
                                </div>


                                    <IsLoader2 isLoader={isLoading}>
                                        <div className="row" style={{minHeight: '180px',height:"25vh",overflowY:"scroll"}}>

                                            {
                                                DaysArray.map((day,index)=>

                                                    <div className="col">

                                                        {Object.values(item)[index].map((row, key4) =>
                                                            <p className="mySlide-null" key={key4} onClick={() => handleClick(row,key,Object.keys(item)[index],key4)}>
                                                          <span className={[" mySlide-default ",`${
                                                              row.status === "selected" ?"mySlide-s":
                                                                  ( row.status === "expired" || row.status === "undefined") ?"mySlide-n":
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

        </div>
    )
}

export default SlideShow;