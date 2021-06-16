import Top from "./top";
import Footer from "./footer";
import {Modal} from "./modal";
import {useState, useEffect} from "react";
import {getUser} from "../../api";
import {Link} from "react-router-dom";
import MainDiv from "../Common/MainDiv/MainDiv";
import {UseProfile} from "../../Hooks/UseProfile/UseProfile";
import TotalLoader from "../Common/IsLoader/LoaderTotal/TotalLoader";
import {gotennisNotif} from "../../utils/Notification";

const Index = () => {
    const {EditUser}=UseProfile();
    let [isLoading, setisLoading] = useState(true)
    let [user, setUser] = useState({
        birthday: null,
        gender: "1",
        mobile: "",
        name: "",
        profile_pic: null,
        profile_preview: "/assets/img/avatar-380-456332.png",
        username: "",
        push_id: '4',
        device_id: '2g',
        imei: '1w',
        mac_address:'3r'

    });


    useEffect(() => {
         getUser().then(response => {
            console.log(response.data.data)
            // console.log(response.data.data.birthday.splice("-"))
            let ListUser=response.data.data;


            let userirthday = {
                year: Number(response.data.data.birthday.split("-")[2]>1900?1363:response.data.data.birthday.split("-")[2]),
                month: Number(response.data.data.birthday.split("-")[1]),
                day: Number(response.data.data.birthday.split("-")[0]),
            }
            EditUser(ListUser.balance,'wallet')
            EditUser(true,'isLogin')



            ListUser ['profile_preview']= response.data.data.profile_pic!==null?response.data.data.profile_pic: "/assets/img/avatar-380-456332.png"
            ListUser ['profile_pic']= null
            ListUser ['birthday']=  userirthday
            ListUser ['push_id']=  '4'
            ListUser ['device_id']=  '2g'
            ListUser ['imei']= '1w'
            ListUser ['mac_address']=   '3r'



            // ListUser ['birthday']= response.data.data.birthday!==null? {day: response.data.data.birthday.splice("-")[0], month: response.data.data.birthday.splice("-")[1], year: response.data.data.birthday.splice("-")[2]}:null
                setUser(ListUser);
             setisLoading(false)
            console.log(ListUser)
        }).catch(error => {
         console.log(error)
             setisLoading(false)
             gotennisNotif(4,'مشکلی پیش آمده')

         });
    }, []);


    return (
        <MainDiv>
            <TotalLoader isLoading={isLoading}>

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
                                <Link to='my-reserve'>
                                    <div className="text_pro">رزروها<i className="fa fa-list-ol"
                                                                       style={{paddingLeft: "5px", fontSize: "12px"}}/></div>
                                </Link>

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

                    <Modal user={user} changeUser={setUser}/>

                    <Footer/>


            </TotalLoader>

        </MainDiv>
    );
}
export default Index;