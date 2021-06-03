const Index = () => {

    return (
        <div className="container">
            <ul className="reserve_ul">
                <li style={{borderBottom: "1px solid #c8c8c8"}}>
                    <img src="/assets/img/g1.png" style={{width: "25px"}} alt=''/>
                    <span>قوانین و مقررات</span>
                </li>
                <li>
                    <img src="/assets/img/g2.png" style={{width: "25px"}} alt=''/>
                    <span>ثبت شکایت / انتقادات</span>
                </li>
            </ul>
            <ul className="reserve_ul">
                <li style={{borderBottom: "1px solid #c8c8c8"}}>
                    <img src="/assets/img/g3.png" style={{width: "25px"}} alt=''/>
                    <span>درباره ما</span>
                </li>
                <li>
                    <img src="/assets/img/g4.png" style={{width: "25px"}} alt=''/>
                    <span>تماس با ما</span>
                </li>
            </ul>
        </div>
    );
}

export default Index;