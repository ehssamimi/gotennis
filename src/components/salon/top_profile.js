import {useState, useEffect} from 'react';
import {getComplexes, getCourts} from "../../api";
import {useParams} from "react-router-dom";

const TopProfile = props => {

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

            setCourts(response);

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
                    <div className="col-sm-11">
                        {
                            courts.map(court => <span className="salon_btn"
                                                      style={{marginTop: '3px', cursor: 'pointer'}}
                                                      key={court.id}
                                                      onClick={(e) => parentDataHandler(e, court.id,)}
                            >
                                {court.name}
                            </span>)
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
export default TopProfile;