const Top = ({user}) => {

    const modal = () => {
        document.getElementById('myModal').style.display = 'block';
    }

    return (
        <div className="top_profile">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 profile_right">
                        <img src={user.profile_pic} alt=''/>
                        <div>{user.name != null && user.name}</div>
                        <div>{user.mobile}</div>
                    </div>
                    <div className="col-lg-6 profile_left">
                        <div className="profile_w">
                            <button id="myBtn" onClick={() => modal()}
                                    style={{background: "none", border: "none"}}>ویرایش پروفایل
                            </button>
                            <i className="fa fa-user"/>
                        </div>

                        <span className="profile_r">{user.balance} تومان</span>
                        <div className="profile_q">
                            <span>افزایش موجودی</span>
                            <i className="fa fa-dollar"/>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    );
}
export default Top;