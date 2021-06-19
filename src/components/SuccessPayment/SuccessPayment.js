import React, {useState, useEffect} from 'react';
import {NumberSeparatorFunction} from "../../utils/HelperFunction";
import RowShowEdit from "../Common/RowShowEdit/RowShowEdit";
import {getNews, getSuccess} from "../../api";
import ListResponseHandler from "../../utils/AxiosResponse/Success/ListResponseHandler";
import {useParams} from "react-router-dom";
 import IsLoader from "../Common/IsLoader/IsLoader";
import ListResponseData from "../../utils/AxiosResponse/Success/ListResponseData";


const RowItem=(item)=>{
    const User=JSON.parse(localStorage.getItem('GoTennisInfo'));

    // let{courtName,finish_time,start_time ,sanse_Date,price}=item
    let{cost,trace_code}=item
    return(
        <div className='w-100 ' style={{marginTop:"8px"   }}>
            <div className=' w-100 d-flex justify-content-between   pr-4 pl-4  '   >
                 <RowShowEdit label='هزینه :' value={cost}/>
                <RowShowEdit label=' شماره پیگیری :' value={trace_code}/>
            </div>
            <div className='border-bottom col-sm-12 ' style={{margin:"16px" }}></div>
        </div>

    )
}
const SuccessPayment = (props) => {
    const param = useParams();
    const [Desc, setData] = useState(  {data: {training_class:{},total:3000,cost:3000}, loading: true, notFound: true});
    useEffect(() => {
        getSuccess(param.id).then(response =>setData({data:response.data.data, loading: false, notFound: true}))
            .catch(error => setData({data:{training_class:{},total:3000,cost:3000}, loading: false, notFound: false}));
    }, []);
    console.log(Desc.data)


    return (
        <IsLoader isLoading={Desc.loading}>
            {
                Desc.notFound?
                    <div className='w-100  vh-100 top_profile d-flex flex-column' >
                        <div className='w-100 factor-header'>
                            <p className='col-sm-12 text-right text-white pt-2 '>  رزرو شما با موفقیت ثبت شد</p>
                            <div className='d-flex justify-content-center'>
                                <div  className='col-sm-11' style={{marginTop:'4%',marginBottom:'4%'}}>
                                    {
                                        Desc.data.details!==undefined?
                                            <p className='container-fill '>
                                                <div className='filler-fill'></div>
                                                <span className='label-fill-factor' style={{color: "#b0eb2e"}} dir='rtl'> { +  Desc.data.details.length + ' ' + 'سانس'} </span>
                                                <span className='text-fill-factor'>تعداد کل روزهای شما</span>
                                            </p> :
                                            <p className='container-fill '>
                                                <div className='filler-fill'></div>
                                                <span className='label-fill-factor2 text-ellipsis' style={{color: "#b0eb2e",maxWidth:'95px'}} dir='rtl'> {   Desc.data.training_class.title  } </span>
                                                <span className='text-fill-factor'>نام کلاس انتخابی شما</span>
                                            </p>
                                    }




                                    <div className='container-fill  '>
                                        <div className='filler-fill'></div>
                                        <span className='label-fill-factor2' style={{color: "#b0eb2e"}} dir='rtl'>   { NumberSeparatorFunction(Desc.data.details!==undefined?Desc.data.total:Desc.data.cost)+' '+'تومان'  } </span>
                                        <span className='text-fill-factor'>مبلغ فاکتور شما</span>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className='w-100 factor-main overflow-y-hidden'>
                            <div className='w-100 overflow-y-scroll ' style={{marginTop:'40px',height:'70%' }}>
                                {
                                    Desc.data.details!==undefined?   Desc.data.details.map( item =><RowItem {...item} key={item.sans_id} />  ):
                                        <div className='w-100 pr-16 pl-16'>
                                            <p className='text-BlueBayoux text-right font-weight-bold'>{Desc.data.training_class.title}</p>
                                            <p className='text-RomanSilver text-right '  dangerouslySetInnerHTML={{__html: Desc.data.training_class.descriptions}}/>
                                             <p className='Fs-14 text-MountainMeadow text-center  mb-0 ticket-border-top pr-3 mt-2 pt-2 pb-2 font-weight-bold w-100'>کد رهگیری :{Desc.data.trace_code}</p>

                                        </div>

                                }

                            </div>
                            <div className='w-100 d-flex justify-content-center'  style={{ marginBottom:'60px'}}>
                                <a      className='text-SeaGreen position-absolute'  href='/my-reserve/main'  style={{
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    paddingRight: "50px",
                                    paddingLeft: "50px",
                                    background:  "#94d64e" ,
                                    borderRadius: "10px",
                                    display: "block",

                                    textAlign: "center",
                                    width:'90%',
                                    bottom:60,


                                }} >

                                    لیست رزرو
                                </a>

                            </div>





                        </div>


                    </div>  :
                    <div className='w-100'>
                        <p>دیتای مورد نظر پیدا نشد </p>
                        <div className='w-100 d-flex justify-content-center'  style={{ marginBottom:'60px'}}>
                            <a      className='text-SeaGreen position-absolute'  href='/my-reserve/main'  style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                paddingRight: "50px",
                                paddingLeft: "50px",
                                background:  "#94d64e" ,
                                borderRadius: "10px",
                                display: "block",

                                textAlign: "center",
                                width:'90%',
                                bottom:60,


                            }} >

                                لیست رزرو
                            </a>

                        </div>
                    </div>

            }

        </IsLoader>

    );
};

export default SuccessPayment;