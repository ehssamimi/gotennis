import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ErrorResp, myReserved} from "../../../api";
import {gotennisNotif} from "../../../utils/Notification";
import MainDiv from "../../Common/MainDiv/MainDiv";
import TotalLoader from "../../Common/IsLoader/LoaderTotal/TotalLoader";
import Ticket from "../Ticket/Ticket";
import {getIndexIfObjWithAttr, NumberSeparatorFunction} from "../../../utils/HelperFunction";

const JDate = require('jalali-date');
const MyReserve = () => {

    const [TicketItem, setData] = useState(null);

    const [isLoading, setisLoading] = useState(true);

    const param = useParams();

    useEffect(() => {
        setisLoading(true)
        myReserved().then(response => {

            response = response.data.data.data;
            let reservedItem=getIndexIfObjWithAttr(response,'id',Number(param.id))

            if (reservedItem!==-1){
               let reserved=response[reservedItem]
                let DataAccoure=reserved.sans_date.split(" ")[0].split("-")
                 const jdate4 = new JDate(new Date(Number(DataAccoure[0]), Number(DataAccoure[1]), Number(DataAccoure[2])));
               let TicketItem={
                   MainContainer:[
                       {label:"ساعت سانس",value: reserved.sans.start_time.split(":")[0]+ "-" +reserved.sans.finish_time.split(":")[0] },
                       {label:"تاریخ",value:jdate4.format('dddd DD MMMM')},
                       {label:"شماره زمین",value:reserved.sans.court.name},
                       {label:"قیمت",value:NumberSeparatorFunction(Number(reserved.sans.cost))},
                   ],

                   SubContainer:[
                       {label:"آدرس سالن",value:reserved.sans.court.complex.address},
                       {label:"توضیحات اضافه",value:reserved.sans.court.description},
                   ],
                   header:reserved.sans.court.complex.name,
                   trace_code:reserved.trace_code,
                   img:reserved.court_image!==null && reserved.court_image!==""?reserved.court_image:"https://panel.gotennis.ir/loadImage/46"

               }

                setData(TicketItem);

            }
            setisLoading(false)
        })
            .catch(error => {
                let{data: {code , data , message }}= ErrorResp(error)
                console.log(error)
                gotennisNotif(4,message)


            });

    }, [param]);




    return (
        <MainDiv  backUrl={'/my-reserve/main'} header={ 'رزرو'}>
            <TotalLoader isLoading={isLoading}>
                {
                    TicketItem?
                        <Ticket {...TicketItem}/>
                        : isLoading?" ":<div>
                            <h4 className="text-danger text-center">کلاس یافت نشد</h4>
                        </div>
                }

            </TotalLoader>

        </MainDiv>
    )
}

export default MyReserve;