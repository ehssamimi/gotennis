import {useState, useEffect} from "react";
import {DatePicker} from "jalali-react-datepicker";
import {updateUser} from "../../api";


const Modal = ({user}) => {

    let [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        setUserInfo(user);
    }, [user]);

    const submitHandler = () => {
        const ext_info = {mac_address: user, push_id: '4', device_id: '2g', imei: '1w'};

        setUserInfo(old => {
            return {old, ...ext_info}
        });
        updateUser(userInfo).then(response => {
                document.getElementById('myModal').style.display = 'none'
            }
        ).catch(error => error);
    }
    return (
        <div id="myModal" className="modal">

            <div className="modal-content" style={{bottom: 0}}>
                <div className="modal-header">
                    <img className="modal-img" src={user.profile_pic} alt='profile_pic'/>
                    <span className="close"
                          onClick={() => document.getElementById('myModal').style.display = 'none'}>&times;</span>
                </div>
                <div className="modal-body">
                    <div className="modal-form">
                        <div className="group">
                            <input id="name"
                                   name="name"
                                   type="text"
                                   onChange={e => setUserInfo({name: e.target.value})}
                                   value={userInfo.name}
                                   required=""/>
                            <span className="highlight"/>
                            <span className="bar"/>
                            <label>نام و نام خانوادگی</label>
                        </div>
                        <div className="group">
                            <DatePicker
                                onClickSubmitButton={({value}) => setUserInfo({birthday: value._i.slice(0, -3)})}
                                value={userInfo.birthday}
                            />
                            <span className="highlight"/>
                            <span className="bar"/>
                            <label>تاریخ تولد (اختیاری)</label>
                        </div>
                        <div className="group">
                            <input id="mobile"
                                   name="mobile"
                                   type="text"
                                   value={userInfo.mobile}
                                   onChange={e => setUserInfo({mobile: e.target.mobile})}

                                   required=""/>
                            <span className="highlight"/>
                            <span className="bar"/>
                            <label>شماره همراه</label>
                        </div>
                        <div className="" style={{direction: "rtl"}}>
                            <label htmlFor="male" style={{display: 'inline-block', width: '25%'}}>جنسیت: </label>

                            <input type="radio"
                                   id="male"
                                   name="gender"
                                   defaultValue="1"
                                   value="1"
                                   checked={user.gender == 1}
                                   onChange={e => setUserInfo({gender: 1})}
                                   style={{marginRight: "10px"}}/>
                            <label htmlFor="male" style={{
                                marginRight: '5px',
                                verticalAlign: 'middle'
                            }}>مرد</label>

                            <input type="radio" id="female"
                                   name="gender"
                                   defaultValue="0"
                                   value="0"
                                   checked={user.gender == 0}
                                   onChange={e => setUserInfo({gender: 0})}
                                   style={{marginRight: "10px"}}/>
                            <label htmlFor="female" style={{
                                marginRight: '5px',
                                verticalAlign: 'middle'
                            }}>زن</label>

                            <br/>
                        </div>
                        <div className="" style={{direction: "rtl", textAlign: "center", marginTop: '25px'}}>
                            <input type="submit" value="ذخیره اطلاعات"
                                   onClick={() => submitHandler()}
                                   style={{
                                       background: "#20d35e",
                                       color: "white",
                                       padding: "5px",
                                       border: "none",
                                       borderRadius: "5px",
                                       paddingRight: "10px",
                                       paddingLeft: "10px",
                                       marginLeft: "10px"
                                   }}/>
                            <button onClick={() => document.getElementById('myModal').style.display = 'none'}
                                    style={{
                                        background: "#b2b2b1",
                                        color: "white",
                                        padding: "5px",
                                        border: "none",
                                        borderRadius: "5px",
                                        paddingRight: "10px",
                                        paddingLeft: "10px"
                                    }}>انصراف
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Modal;