import React, {useState, useEffect} from 'react';
import FullScreenModal from "../Common/Modal/FullScreenModal";
import {NumberSeparatorFunction} from "../../utils/HelperFunction";
import {SelectPay} from "../profile/modal";


const RowItem=(item)=>{
    // console.log(item)

    let{courtName,finish_time,start_time ,sanse_Date,price}=item
        // console.log(courtName)
    return(
        <div className='w-100 ' style={{marginTop:"8px"   }}>
            <div className=' w-100 d-flex justify-content-between flex-reverse pr-4 pl-4  '   >
                <div className='d-flex flex-column courtColor justify-content-center ' dir='rtl'  >
                    <p  className='text-BlueBayoux' style={{ marginBottom:0}}>{courtName.complex}</p>
                    <div className='border-bottom text-right 'style={{width:'80%'}}></div>
                    <div className='d-flex align-items-center text-SeaGreen'><i className="fa  fa-angle-double-left text-GrayAsparagus" aria-hidden="true"  style={{marginLeft:"8px" }}></i>
                        {courtName.name} </div>
                </div>
                <div className='d-flex flex-column justify-content-center'>
                    <p className='text-center text-GrayAsparagus mb-0'> {sanse_Date[3]}</p>
                    <p className='text-center text-GrayAsparagus mb-0' dir='rtl'>{sanse_Date[0]+' '+ sanse_Date[1]+' '+sanse_Date[2]} </p>
                </div>
                <div className='d-flex flex-column justify-content-center'>
                    <p   className='text-SeaGreen mb-0' dir='rtl'>{NumberSeparatorFunction( Number(price) )}</p>
                    <p  className='text-SeaGreen mb-0' dir='ltr'>{start_time.split(':')[0]}-{finish_time.split(':')[0]}</p>
                </div>

            </div>
            <div className='border-bottom col-sm-12 ' style={{margin:"16px" }}></div>
        </div>

    )
}

const Factor = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {

    }, []);
    let{data,SumPrice,goPayType}=props
    // console.log(data)


    return (


                <div className='w-100  vh-100 top_profile factor'  >
                    <div className='w-100 factor-header'>
                        <p className='col-sm-12 text-right text-white pt-2 '>  پیش فاکتور رزرو شما</p>
                        <div className='d-flex justify-content-center'>
                            <div  className='col-sm-11' style={{marginTop:'4%',marginBottom:'4%'}}>

                                <p className='container-fill '>
                                    <div className='filler-fill'></div>
                                    <span className='label-fill-factor' style={{color: "#b0eb2e"}} dir='rtl'> { + data.length + ' ' + 'سانس'} </span>
                                    <span className='text-fill-factor'>تعداد کل روزهای شما</span>
                                </p>


                                <div className='container-fill  '>
                                    <div className='filler-fill'></div>
                                    <span className='label-fill-factor' style={{color: "#b0eb2e"}} dir='rtl'>   { NumberSeparatorFunction(SumPrice(data))+' '+'تومان'  } </span>
                                    <span className='text-fill-factor'>مبلغ فاکتور شما</span>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className='w-100 factor-main overflow-y-hidden'>
                        <div className='w-100 overflow-y-scroll ' style={{marginTop:'40px',height:'85%' }}>
                            {
                                data.map( item =><RowItem {...item} key={item.sans_id} />  )

                            }

                        </div>
                        <div className='w-100 d-flex justify-content-center'>
                            <div      className='text-SeaGreen position-absolute'  onClick={goPayType}  style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                paddingRight: "50px",
                                paddingLeft: "50px",
                                background: data.length>0?"#94d64e":"#e0e0e0",
                                borderRadius: "10px",
                                display: "block",
                                textAlign: "center",
                                width:'90%',
                                bottom:9,


                            }} >

                                رزرو نهایی
                            </div>

                        </div>





                    </div>
                    <div>

                    </div>



                </div>





    );
};

export default Factor;