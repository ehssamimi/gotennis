import Top from "./top";
import Footer from "./footer";
import Modal from "./modal";
import {useState, useEffect} from "react";
import {getUser} from "../../api";
import {Link} from "react-router-dom";

const Index = () => {

    let [user, setUser] = useState({});

    useEffect(() => {
        getUser().then(response => {
            setUser(response.data.data);
        }).catch(error => error);
    }, []);

    return (
        <>
            <Top user={user}/>

            <div className="container">
                <div id="profile_re">
                </div>
                <div className="row" id="profile_box">
                    <div className="col-sm-4">
                        <Link to='/salon/2'>
                            <div className="text_pro">رزرو جدید<i className="fa fa-list-alt"
                                                                  style={{paddingLeft: "5px", fontSize: "12px"}}/>
                            </div>
                        </Link>
                    </div>
                    <div className="col-sm-4">
                        <div className="text_pro">رزروها<i className="fa fa-list-ol"
                                                           style={{paddingLeft: "5px", fontSize: "12px"}}/></div>
                    </div>
                    <div className="col-sm-4">
                        <div className="text_pro">تراکنش ها<i className="fa fa-clock-o"
                                                              style={{paddingLeft: "5px", fontSize: "12px"}}/></div>
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="boxpro">
                            <p className="boxpro_q">تعداد رزرو ها</p>
                            <br/>
                            <p>
                                {user.total_reserves}
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="boxpro">
                            <p className="boxpro_q">ساعت بازی</p>
                            <br/>
                            <p>
                                {user.total_play_time}
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="boxpro">
                            <p className="boxpro_q">رزرو های فعال</p>
                            <br/>
                            <p>
                                {user.active_reserves}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="boxpro">

                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="boxpro">

                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="boxpro">

                        </div>
                    </div>

                </div>
            </div>

            <Modal user={user}/>

            <Footer/>

        </>
    );
}
export default Index;