import TopProfile from "./top_profile";
import SlideShow from "./slide_show";
import Reserve from "./reserve";
import {useState} from "react";
import {getSans as getSansApi} from "../../api";
import moment from "jalali-moment";

const Index = () => {

    let [sans, setSans] = useState({});

    let [courtName, setCourtName] = useState(null);

    let [courtId, setCourtId] = useState(1);

    let [reservedata, setReservedata] = useState({
        price: 0,
        count: 0
    });


    const reserveData = sans => {

        setReservedata({
            price: parseInt(reservedata.price) + parseInt(sans.price),
            count: reservedata.count + 1
        });
    }


    const getSans = id => {

        getSansApi(id).then(response => {
            setSans(response.data.data);
        }).catch(error => error);

        setCourtId(id);
    }

    const getCourtName = name => setCourtName(name);

    return (
        <>
            <TopProfile getSans={getSans} getCourtName={getCourtName}/>

            <div className="container" style={{margin: '15px', marginTop: '-5px'}}>
                <div className="row" id="salon_det">
                    <div className="col-lg-4" style={{textAlign: "center"}}>
                        <img className="salon_img" src="/assets/img/s4.png" alt=''/>
                    </div>
                    <div className="col-lg-4">
                        <div className="salon_text"> {courtName}</div>
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

            <SlideShow court_id={courtId} reserveData={reserveData}/>

            <Reserve data={reservedata}/>
        </>
    )
}

export default Index;