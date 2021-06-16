import {useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {ErrorResp, getClass, myClass} from "../../../api";
 import MainDiv from "../../Common/MainDiv/MainDiv";

import {gotennisNotif} from "../../../utils/Notification";
import TotalLoader from "../../Common/IsLoader/LoaderTotal/TotalLoader";
 import Ticket from "../Ticket/Ticket";
import {getIndexIfObjWithAttr, NumberSeparatorFunction} from "../../../utils/HelperFunction";

const Detail = () => {

    const [TicketItem, setData] = useState(null);

    const [isLoading, setisLoading] = useState(true);

    const param = useParams();

    useEffect(() => {
        setisLoading(true)
        myClass().then(response => {

            response = response.data.data.data ;
            let reservedItemIndex=getIndexIfObjWithAttr(response,'id',Number(param.id))

            if (reservedItemIndex!==-1){
                let reserved=response[reservedItemIndex]
                console.log(reserved)
                  let TicketItem={
                    MainContainer:[
                        {label:"مربی",value: reserved.training_class.coach.name },
                        {label:"نام مجموعه",value: reserved.training_class.court.complex.name},
                        {label:"شماره زمین",value:reserved.training_class.court.name},
                        {label:"قیمت",value:NumberSeparatorFunction(Number(reserved.training_class.cost))},
                    ],
                    SubContainer:[
                        {label:"آدرس سالن",value:reserved.training_class.court.complex.address},
                        {label:"توضیحات اضافه",value:reserved.training_class.descriptions},
                    ],
                    header:reserved.training_class.title,
                    trace_code:reserved.trace_code,
                    // img:reserved.court_image!==null && reserved.court_image!==""?reserved.court_image:"https://panel.gotennis.ir/loadImage/46"
                    img:reserved.court_image!==null && reserved.court_image!==""&& reserved.court_image!==undefined?reserved.court_image:"https://panel.gotennis.ir/loadImage/46"

                }
                console.log(TicketItem)

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
        <MainDiv  backUrl={'/my-reserve/main'} header={ 'کلاس'}>
            <TotalLoader isLoading={isLoading}>
                {
                    TicketItem   ?
                       <Ticket {...TicketItem}/>
                        : isLoading?" ":<div>
                            <h4 className="text-danger text-center">کلاس یافت نشد</h4>
                        </div>
                }

            </TotalLoader>

        </MainDiv>
    )
}

export default Detail;