import {getClasses} from "../../../api";
import ListResponseHandler from "../../../utils/AxiosResponse/Success/ListResponseHandler";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NumberSeparator from "../../../utils/NumberSeparator";
import {IMAGE_BASE_URL} from "../../../utils/Config";

const Index = () => {
    const [data, setData] = useState({
        data: [],
        loading: true,
        notFound: true
    });
    useEffect(() => {
        getClasses().then(response => ListResponseHandler(response, setData))
            .catch(error => error);
    }, []);
    console.log(data.data)

    return (
        <div id="registration" className="tabcontent">
            {
                !data.loading ?
                    data.notFound ? <p className='text-center text-danger'>اطلاعاتی یافت نشد</p> :
                        data.data.map(item => <div className="row mb-2 p-2 bg-white br-15px" key={item.id}>
                            <Link to={`/class/${item.id}`}>
                                <div className="col-lg-3 new_q">
                                    <img className="new_img"
                                         src={`${IMAGE_BASE_URL}${item.coach.image_id}`} alt=''/>
                                    <div>
                                        {item.coach.name}
                                    </div>
                                </div>

                                <div className="col-lg-9 new_e">

                                    <div className="tabcontent-text">
                                        نام ورزش: {item.title}
                                    </div>
                                    <div className="tabcontent-t"> قیمت: <NumberSeparator number={item.cost}/></div>
                                    <div className="tabcontent-t">ظرفیت کلاس: {item.capacity}</div>

                                </div>
                            </Link>

                        </div>)
                    : <p className='text-center text-warning'>در حال بارگزاری</p>
            }
        </div>
    );
}

export default Index;