import Header from "./header";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { myReserved} from "../../api";
import ListResponseHandler from "../../utils/AxiosResponse/Success/ListResponseHandler";
import Classes from "./MyClassess";
import {IMAGE_BASE_URL} from "../../utils/Config";
import MainDiv from "../Common/MainDiv/MainDiv";
 import RowShowEdit from "../Common/RowShowEdit/RowShowEdit";
const JDate = require('jalali-date');

const EachReserved=({item})=>{

    let DataAccoure=item.sans_date.split(" ")[0].split("-")

    const jdate4 = new JDate(new Date(Number(DataAccoure[0]), Number(DataAccoure[1]), Number(DataAccoure[2])));


    return(

        <Link to={`/my-reserve/reserve/${item.id}`} className=' w-100 col-container mb-2' dir='rtl'>
            <div className="  new_q col-item mb-0">
                <img className="new_img" src={item.court_image!==null && item.court_image!==""?item.court_image:"https://panel.gotennis.ir/loadImage/46" } alt=''/>
            </div>
            <div className="pr-3 new_e col-item ">
                <div className='w-100 h-100 d-flex justify-content-around flex-column'>

                        <p className='text-right Fs-14 text-BostonBlue mb-0' dir='rtl' > {item.sans.court.complex.name}</p>


                    <div className='w-100 d-flex  ' dir='rtl'>
                        <RowShowEdit label={'مورخ :'} value={jdate4.format('dddd DD MMMM')}/>
                        <RowShowEdit label={'ساعت : '} value={ item.sans.start_time.split(":")[0]+ "-"+item.sans.finish_time.split(":")[0]}  className='mr-4'/>
                    </div>
                </div>

            </div>
        </Link>

    )
}

const Index = () => {

    const [data, setData] = useState({
        data: [],
        loading: true,
        notFound: true
    });


    useEffect(() => {
        myReserved().then(response => {
             ListResponseHandler(response, setData)})
            .catch(error => error);
    }, []);

    console.log(data.data)
    return (
        <MainDiv>
        <>
            <Header/>

            <div className="container">
                <div id="reserve" className="tabcontent" style={{paddingBottom:'50px'}}>
                    {
                        !data.loading ?
                            data.notFound ? <p className='text-center text-danger'>اطلاعاتی یافت نشد</p> :
                                data.data.map((item,index) => <EachReserved item={item} key={index}/>)
                            : <p className='text-center text-warning'>در حال بارگزاری</p>
                    }
                </div>
                <Classes/>
            </div>
        </>
        </MainDiv>
    )
}
export default Index;