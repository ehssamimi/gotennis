import {Link} from "react-router-dom";

const Footer = ()=>{

    return (
        <div className="footer">
            <div style={{overflow:"auto"}}>
                <div className="row" style={{paddingTop: "7px", width: "100%", overflow: "hidden", height: "50px"}}>
                    <div className="col-sm-2 footer_b">
                        <Link to="/reserve">
                            <img src="/assets/img/v5.png" style={{width: "16px"}} alt=''/>
                            <p style={{fontSize: "12px", paddingTop: "5px", color: "#afafaf"}}>رزرو</p>
                        </Link>
                    </div>
                    <div className="col-sm-2 footer_b">
                        <Link to="/news" style={{color: "#878787"}}>
                            <i className="fa fa-newspaper-o" aria-hidden="true" style={{color: "#afafaf"}}/>
                            <p style={{fontSize: "12px", paddingTop: "5px", color: "#afafaf"}}>اخبار</p>
                        </Link>
                    </div>
                    <div className="col-sm-2 footer_b">
                        <Link to="/home" style={{color: "#878787"}}>
                            <i className="fa fa-home" aria-hidden="true" style={{color: "#afafaf"}}/>
                            <p style={{fontSize: "12px", paddingTop: "5px", color: "#afafaf"}}>خانه</p>
                        </Link>
                    </div>
                    <div className="col-sm-2 footer_b">
                        <Link to="/profile" style={{color:"#878787"}}>
                            <i className="fa fa-user" aria-hidden="true" style={{color: "#afafaf"}}/>
                            <p style={{fontSize: "12px", paddingTop: "5px", color: "#afafaf"}}>پروفایل</p>
                        </Link>
                    </div>
                    <div className="col-sm-2 footer_b">
                        <Link to="/settings" style={{color: "#878787"}}>
                            <i className="fa fa-gear" aria-hidden="true" style={{color: "#afafaf"}}/>
                            <p style={{fontSize: "12px", paddingTop: "5px", color: "#afafaf"}}>تنظیمات</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;