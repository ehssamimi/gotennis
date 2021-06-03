import {useEffect, useState} from "react";
import {getNews} from "../../api";
import ListResponseHandler from "../../utils/AxiosResponse/Success/ListResponseHandler";
import moment from 'jalali-moment';
import {Link} from "react-router-dom";
import {IMAGE_BASE_URL} from "../../utils/Config";

const Index = ({className}) => {

    const [data, setData] = useState({
        data: [],
        loading: true,
        notFound: true
    });

    useEffect(() => {
        getNews().then(response => ListResponseHandler(response, setData))
            .catch(error => error);
    }, []);


    return (
        <div className={className ? className : 'new_p'}>
            <div className="container">
                {
                    !data.loading ?
                        data.notFound ? <p className='text-center text-danger'>اطلاعاتی یافت نشد</p> :
                            data.data.map(item =>
                                <Link to={`/news/${item.id}`} key={item.id}>
                                    <div className="row" style={{marginTop:'10px'}}>
                                        <div className="col-lg-3 new_q">
                                            <img className="new_img" src={`${IMAGE_BASE_URL}${item.image_id}`}
                                                 alt="" width='91' height='79'/>
                                            <div>
                                                {moment(item.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                                            </div>
                                        </div>
                                        <div className="col-lg-9 new_e">
                                            <div className="text_a">
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )

                        : <p className='text-center text-warning'>در حال بارگزاری</p>
                }
            </div>
        </div>
    );
}

export default Index;