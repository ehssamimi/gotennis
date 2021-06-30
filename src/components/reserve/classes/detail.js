import {useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {ErrorResp, getClass, preOrderClass} from "../../../api";
import NumberSeparator from "../../../utils/NumberSeparator";
import MainDiv from "../../Common/MainDiv/MainDiv";
import {Modal as ModalComponent, PhoneValidate, PreFactor, SelectPay} from "../../profile/modal";
import {NumberSeparatorFunction} from "../../../utils/HelperFunction";
import {gotennisNotif} from "../../../utils/Notification";
import TotalLoader from "../../Common/IsLoader/LoaderTotal/TotalLoader";
import {UseProfile} from "../../../Hooks/UseProfile/UseProfile";
import {UseModals} from "../../../Hooks/UseModals/UseModals";

const Detail = () => {

    const [data, setData] = useState({});
    const {User}=UseProfile();
    const [preOrderList, setpreOrderList] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const { Modal,toggleModal}=UseModals();
    const param = useParams();

    useEffect(() => {
        setisLoading(true)
        GetClassInfo()

    }, [param]);

    const GetClassInfo=async ()=>{
       await getClass(param.id).then(response => {

            console.log(response.data.data)
            response = response.data.data;
            setData(response);
            setisLoading(false)
        }).catch(error => {
            let{data: {code , data , message }}= ErrorResp(error)
            console.log(error)
            gotennisNotif(4,message)


        });
    }
    const goFactor=()=>{
        let Profile='';
        if (localStorage.getItem("GoTennisInfo")){
            Profile=JSON.parse(localStorage.getItem("GoTennisInfo"))
        }else {
            Profile=User
        }
        if (Profile.phoneValidate && Profile.name!== 'کاربر'){
            document.getElementById('PreFactor').style.display = 'block'
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

    const goPay= async ()=>{

        let {data: {code , data  , message }}= await preOrderClass(param.id)
        console.log(code , data  , message)
        document.getElementById('PreFactor').style.display = 'none';
        if (code ==='200'){
            setpreOrderList(data)
            document.getElementById('payModal').style.display = 'block'

        }else {
            gotennisNotif(4,message)
        }
    }

    return (
        <MainDiv  backUrl={'/reserve'} header={ 'کلاس'}>
            <TotalLoader isLoading={isLoading}>
                {
                    (data && data.id) ?
                        <div className="container" style={{margin: 0, padding: 0, backgroundColor: '#fff'}}>
                            <p style={{
                                color: 'rgb(101,96,131)',
                                direction: 'rtl',
                                padding: '10px 10px 5px',
                                backgroundColor: 'rgb(246,246,246)',
                                marginBottom: 0
                            }}>
                                نام مربی: {data.coach.name}
                            </p>
                            <div className="col-md-12" style={{padding: 0}}>
                                <img src={data.coach.image_url} alt="" style={{width: '100%'}}/>
                            </div>

                            <div className="col-md-12" style={{padding: '0 10px'}}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    textAlign: 'center',
                                    padding: '13px 0'
                                }}>
                                    <div className='text-success' style={{lineHeight: '30px'}} >
                                        تومان <NumberSeparator number={data.cost}/>
                                        <br/>
                                        <p className='text-left'>مبلغ کلاس</p>

                                    </div>
                                    <div style={{lineHeight: '30px'}}>
                                        نفر {data.capacity}
                                        <br/>
                                        <p>
                                            ویژه {data.gender == 1 ? 'بانوان' : 'آقایان'}
                                        </p>

                                    </div>
                                    <div style={{
                                        backgroundColor: 'rgb(246,243,253',
                                        color: 'rgb(77,99,122)',
                                        padding: '10px 20px',
                                        borderRadius: '30px 15px 15px 30px'
                                    }}>
                                        {data.court.complex.name}
                                        <hr style={{
                                            marginTop: '7px',
                                            marginLeft: '25px',
                                            backgroundColor: '#ccc',
                                            marginBottom: '5px'
                                        }}/>
                                        <span className='text-success'>
                             {data.court.name}
                                </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12"
                                 style={{
                                     backgroundColor: 'rgb(246,246,246)',
                                     padding: '15px 10px', color: '#000',
                                     direction: 'rtl'
                                 }}>
                                توضیحات کلاس
                            </div>
                            <div style={{direction: 'rtl', padding: '10px'}} dangerouslySetInnerHTML={{__html: data.descriptions}}/>
                            <div className='text-center' style={{padding: '10px'}}>
                                <button style={{
                                    borderRadius: '10px',
                                    display: 'block',
                                    width: '100%',
                                    marginBottom: '50px',
                                    border: 'none',
                                    padding: '10px',
                                    backgroundColor: 'rgb(201,237,44)',
                                    color: 'rgb(101,96,131)',
                                }} onClick={goFactor}>
                                    ثبت نام در کلاس
                                </button>
                            </div>
                        </div>
                        : isLoading?" ":<div>
                            <h4 className="text-danger text-center">کلاس یافت نشد</h4>
                        </div>
                }

            </TotalLoader>

            <PreFactor data={{name:data.title,price:Number(data.cost)}} goPay={goPay}/>
            <SelectPay wallet={User.wallet} total= { NumberSeparatorFunction(Number(data.cost) )+' '+'تومان' } notMenu={true} preOrderList={preOrderList} getSans={GetClassInfo} SetyLoading={()=>{console.log(' ')}}/>
            <PhoneValidate isOpen={Modal.isOpen} toggle={()=>{toggleModal("profile")}}  finishRequest={()=>{ window.location.reload()} }/>
            <ModalComponent/>

        </MainDiv>
    )
}

export default Detail;