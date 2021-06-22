import TopProfile from "./top_profile";
import SlideShow from "./slide_show";
import Reserve from "./reserve";
import {useState} from "react";
import {getSans as getSansApi} from "../../api";
import moment from "jalali-moment";
  import {Modal} from "../profile/modal";
import MainDiv from "../Common/MainDiv/MainDiv";
import TotalLoader from "../Common/IsLoader/LoaderTotal/TotalLoader";

const Index = () => {

    let [sans, setSans] = useState({});

    let [courtName, setCourtName] = useState({name:null,complex:null});

    let [courtId, setCourtId] = useState(null);

    let [reservedata, setReservedata] = useState( []);
    let [count, setcount] = useState(false);
    let [isLoading, setisLoading] = useState(true);





    const getSans = (id=courtId,name=courtName.complex) => {

         setCourtId(id);
        setCourtName({...courtName,name})
        getSansApi(id).then(response => {

            console.log(response.data.data)
            setSans(response.data.data);
            setisLoading(false)
        }).catch(error => error);


    }

    const getCourtName = (name,complex) => {

        setCourtName({name:name,complex:complex})};
    const updateReservedList = reserved =>{

        setReservedata(reserved);
        setcount(!count)

    };

    const LoadingFunc=(loader)=>{
        setisLoading(loader)
    }


    return (

            <TotalLoader isLoading={isLoading}>



            <TopProfile getSans={getSans} getCourtName={getCourtName}/>

            <div className="container" style={{margin: '15px', marginTop: '-5px'}}>
                <div className="row" id="salon_det">
                    <div className="col-lg-4" style={{textAlign: "center"}}>
                        <img className="salon_img" src="/assets/img/s4.png" alt=''/>
                    </div>
                    <div className="col-lg-4">
                        <div className="salon_text"> {courtName.name}</div>
                        <br/>
                        <div className="salon_text1">اولین زمان رزرو</div>
                        <div className="salon_tt">
                            {sans.first_sans && moment(sans.first_sans.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div style={{textAlign: "center", color: "#2d9467", marginTop: "5%"}}>
                            {sans.available_sans}
                            <br/>
                            سانس های آزاد
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

            <SlideShow court_id={courtId}  updateReservedList={updateReservedList} charts={sans.weeks} courtName={courtName}  LoadingFunc={LoadingFunc}/>

            <Reserve data={reservedata} LoadingFunc={LoadingFunc} getSans={getSans} />

            <Modal  />

            </TotalLoader>


    )
}

export default Index;