import {useState, useEffect} from 'react';
import {getComplexes, getCourts} from "../../api";
import {useParams} from "react-router-dom";
import Swiper from 'react-id-swiper';
import "swiper/css/swiper.css";

const TopProfile = props => {
    const params = {
        initialSlide: 0,
        spaceBetween: 8,
        slidesPerView:3,
        loop: false,
        autoplay: false
    };

    let [complex, setComplex] = useState({});

    let [courts, setCourts] = useState([]);

    const param = useParams();

    useEffect(() => {

        getComplexes().then(response => {

            response = response.data.data.data;

            response = response.filter(res => res.id == param.id);

            setComplex(...response);

            document.getElementsByClassName('salon_btn')[1].click();

        }).catch(error => error);

        getCourts(param.id).then(response => {

            response = response.data.data.data;
            console.log(response)

            setCourts(response);
            props.getSans(response[0].id);


        }).catch(error => error);

    }, [param.id]);

    const parentDataHandler = (e, court_id) => {
        props.getSans(court_id);
        props.getCourtName(e.target.innerText);
    }


    return (
        <div className="top_profile">
            <div className="container">
                <div className="row" style={{marginTop: "2%"}}>
                    <div className="col-sm-2">
                        <div className="salon_t">
                            مجموعه:
                        </div>
                    </div>
                    <div className="col-sm-10">
                    <span className="salon_btn">
                        {complex.name}
                    </span>
                    </div>
                </div>

                <div className="row" style={{marginTop: "1%", marginBottom: "5%"}}>
                    <div className="col-sm-1">
                        <div className="salon_t">
                            زمین:
                        </div>
                    </div>
                    <div className="col-sm-11" style={{width: '91.66666667%'}}>
                        {/*<Swiper {...params}  >*/}
                            {
                                courts.map(court => <span className="salon_btn"
                                                          style={{marginTop: '3px', cursor: 'pointer'}}
                                                          key={court.id}
                                                          onClick={(e) => parentDataHandler(e, court.id,)}
                                >
                                {court.name}
                            </span>)


                             }
                        {/*</Swiper>*/}





                    </div>
                </div>

            </div>
        </div>
    )
}
export default TopProfile;