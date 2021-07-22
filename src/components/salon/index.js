import TopProfile from "./top_profile";
import SlideShow from "./slide_show";
import Reserve from "./reserve";
import {useState} from "react";
import {getSans as getSansApi} from "../../api";
import moment from "jalali-moment";
  import {Modal} from "../profile/modal";
import MainDiv from "../Common/MainDiv/MainDiv";
import TotalLoader from "../Common/IsLoader/LoaderTotal/TotalLoader";
import {IMAGE_BASE_URL} from "../../utils/Config";

const Index = () => {

    let [sans, setSans] = useState({});

    let [courtName, setCourtName] = useState({name:null,complex:null,complexImg:'/assets/img/s4.png'});

    let [courtId, setCourtId] = useState(null);

    let [reservedata, setReservedata] = useState( []);
    let [count, setcount] = useState(false);
    let [isLoading, setisLoading] = useState(true);
    let [LoadingOutSide, setLoadingOutSide] = useState(1);





    const getSans = (id=courtId,name=courtName.complex,complexImg) => {
        setisLoading(true)
         setCourtId(id);

        // console.log('**************complexImg**********')
        // console.log(complexImg)
        setCourtName({...courtName,name,complexImg})
        getSansApi(id).then(response => {

            // console.log(response.data.data)
            setSans(response.data.data);
            setisLoading(false)
        }).catch(error => error);


    }

    const getCourtName = (name,complex) => {
        setCourtName({...courtName, name: name, complex: complex})
        // setCourtName({name:name,complex:complex });
    }
    const updateReservedList = reserved =>{

        setReservedata(reserved);
        setcount(!count)

    };

    const LoadingFunc=(loader)=>{
        setisLoading(loader)
    }

// console.log('*********LoadingOutSide***')
// console.log(LoadingOutSide)

    return (

            <TotalLoader isLoading={isLoading}>



            <TopProfile getSans={getSans} getCourtName={getCourtName} LoadingFunc={LoadingFunc}/>

            <div className="container d-flex justify-content-center  " style={{  marginTop: '-5px'}}>
                <div className="row w-100" id="salon_det">
                    <div className="col-lg-4" style={{textAlign: "end"}}>
                        {/*<img className="salon_img" src={courtName.complex!==null?courtName.complex.images.length>0?IMAGE_BASE_URL + courtName.complex.images[0].id:IMAGE_BASE_URL +29:'/assets/img/s4.png'} alt=''/>*/}
                        <img className="salon_img" src={courtName.complexImg} alt=''/>
                    </div>
                    <div className="col-lg-4 h-100 d-flex align-items-center   justify-content-center">
                        <div>
                            <div className="salon_text text-center"> {courtName.name}</div>
                            <br/>
                            <div className="salon_text1 text-center ">اولین زمان رزرو</div>
                            <div className="salon_tt text-center ">
                                {sans.first_sans && moment(sans.first_sans.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-4 h-100 d-flex align-items-center pl-0 justify-content-center">
                        <div>
                            <div className='Fs-12' style={{textAlign: "center", color: "#2d9467", marginTop: "5%"}}>
                                {sans.available_sans}
                                <br/>
                                سانس های آزاد
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container" style={{marginTop: '-20px'}}>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="salon-r">
                            <img className="" src="/assets/img/r1.png" alt=''/>
                            <span>
                    سانس آزاد
                </span>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="salon-r">
                            <img className="" src="/assets/img/r2.png" alt=''/>
                            <span>
                    رزرو شده
                </span>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="salon-r">
                            <img className="" src="/assets/img/r3.png" alt=''/>
                            <span>
                    کلاس
                </span>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="salon-r">
                            <img className="" src="/assets/img/r4.png" alt=''/>
                            <span>
                    انتخاب شما
                </span>
                        </div>
                    </div>

                </div>
                <p className="salon-p">رنگ صورتی مربوط به سانس بانوان و رنگ آبی مربوط به سانس آقایان می باشد.</p>
            </div>

            <SlideShow court_id={courtId}  updateReservedList={updateReservedList} LoadingOutSide={LoadingOutSide} courtName={courtName}  LoadingFunc={LoadingFunc} getSans={getSans}/>

            <Reserve data={reservedata} LoadingFunc={LoadingFunc} getSans={getSans}  SetyLoading={()=>{setLoadingOutSide(prevState =>prevState+1)}}/>

            <Modal  />

            </TotalLoader>


    )
}

export default Index;