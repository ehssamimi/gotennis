import Header from "./header";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getComplexes, myReserved} from "../../api";
import ListResponseHandler from "../../utils/AxiosResponse/Success/ListResponseHandler";
import Classes from "./classes";
import {IMAGE_BASE_URL} from "../../utils/Config";
import MainDiv from "../Common/MainDiv/MainDiv";

const Index = () => {

    const [data, setData] = useState({
        data: [],
        loading: true,
        notFound: true
    });


    useEffect(() => {
        myReserved().then(response => ListResponseHandler(response, setData))
            .catch(error => error);
    }, []);

    return (
        <MainDiv>
        <>
            <Header/>

            <div className="container">
                <div id="reserve" className="tabcontent">
                    {
                        !data.loading ?
                            data.notFound ? <p className='text-center text-danger'>اطلاعاتی یافت نشد</p> :
                                data.data.map(item => <div className="row" key={item.id}>
                                    <Link to={`/salon/${item.id}`}>
                                        <div className="col-lg-3 new_q">
                                            {/*<img className="new_img" src={IMAGE_BASE_URL + item.images[0].id} alt=''/>*/}
                                        </div>
                                        <div className="col-lg-9 new_e">

                                            <div className="tabcontent-text">
                                                {item.name}
                                            </div>
                                            <div className="tabcontent-t"> تعداد زمین</div>

                                        </div>
                                    </Link>

                                </div>)
                            : <p className='text-center text-warning'>در حال بارگزاری</p>
                    }
                </div>
                <Classes/>
            </div>
        </>
        </MainDiv>
    )
}
export default Index;