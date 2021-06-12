import moment from "jalali-moment";
 import {Link} from "react-router-dom";
import {NumberSeparatorFunction} from "../../utils/HelperFunction";
import Factor from "./Factor";
import FullScreenModal from "../Common/Modal/FullScreenModal";
import React, {useState} from "react";
import {SelectPay} from "../profile/modal";
import {checkReserved, preOrder} from "../../api";
import {gotennisNotif} from "../../utils/Notification";
import {UseProfile} from "../../Hooks/UseProfile/UseProfile";


const Reserve = ({data,LoadingFunc}) => {
    const {User}=UseProfile();
    let [isOpen, setisOpen] = useState(false);
    let [preOrderList, setpreOrderList] = useState({});
    const dateHandler = () => {

        const date = moment().locale('fa').format('MM-D');

        let month_text = date.split("-")[0];

        const day_text = date.split("-")[1];


        switch (month_text) {
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
        return {month_text, day_text};

    }
    const SumPrice=(data)=>{
        let sum=0;
        data.map(item=>{
            sum=sum+ parseInt(item.price)
        })
        return sum
    }
    const goPayType=async ( )=>{
        console.log(data)
        let sansList=data.map(item=>{
            return item.sans_id
        })

        LoadingFunc(true)
        //
        let {data: {code , data:validate , message }}= await preOrder(sansList)
        LoadingFunc(false)
        console.log(code ,  validate , message)
        setpreOrderList(validate)
        // balance: 950800
        // credit_id: 1265
        // data: "223a4856-8a28-11e7-bb70-000c295eb8fc"
        // type: 0
        // url: ""
        setisOpen(!isOpen);
        console.log(code==='200')
        if (code==='200' ){


            document.getElementById('payModal').style.display = 'block';
        }else {
            gotennisNotif(4,message)
        }

    }



    return (
        <div className="salon-res" style={{borderRadius: '25px 0 0 0'}}>
            <div className="container">
                <div className="row">
                    <div id="salon-col" className="col-sm-2">
                        <p>
                            <span style={{color: "#70cf8f"}}>{dateHandler()['day_text']} </span>
                            <br/>
                                {dateHandler()['month_text']}
                        </p>
                    </div>
                    <div id="salon-sm-10" className="col-sm-10">

                        <p className='container-fill '>
                            <div className='filler-fill'></div>
                            <span className='label-fill' style={{color: "#94d64e"}} dir='rtl'> { + data.length + ' ' + 'سانس'} </span>
                            <span className='text-fill'>تعداد کل روزهای شما</span>
                        </p>


                        <div className='container-fill  '>
                            <div className='filler-fill'></div>
                            <span className='label-fill' style={{color: "#94d64e"}} dir='rtl'>   { NumberSeparatorFunction(SumPrice(data))+' '+'تومان'  } </span>
                            <span className='text-fill'>مبلغ فاکتور شما</span>
                        </div>


                    </div>

                </div>
                <br/>
                <div  onClick={()=>{setisOpen(!isOpen)}}       style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingRight: "50px",
                    paddingLeft: "50px",
                    background: data.length>0?"#94d64e":"#e0e0e0",
                    borderRadius: "10px",
                    display: "block",
                    textAlign: "center"

                }} >

                        ثبت و رزرو
                 </div>
            </div>


            <FullScreenModal isOpen={isOpen} toggle={()=>{setisOpen(!isOpen)}}>
            <Factor data={data} SumPrice={SumPrice} goPayType={goPayType} />
            </FullScreenModal>
            <SelectPay wallet={User.wallet} total= { NumberSeparatorFunction(SumPrice(data))+' '+'تومان'  } preOrderList={preOrderList}/>
        </div>
    )

}

export default Reserve;
