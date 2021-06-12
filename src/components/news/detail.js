import {getNews} from "../../api";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import moment from "jalali-moment";
import {IMAGE_BASE_URL} from "../../utils/Config";
import MainDiv from "../Common/MainDiv/MainDiv";

const Detail = () => {

    const [data, setData] = useState({});

    const param = useParams();

    useEffect(() => {
        getNews().then(response => {
            response = response.data.data.data;
            response = response.filter(item => item.id == param.id);
            setData(...response);
        })
            .catch(error => error);
    }, [param]);
    return (
        <MainDiv>
            {
                (data && data.id) ?

                    <>
                        <div style={{
                            color: '#337ab7',
                            direction: 'rtl',
                            padding: '10px 25px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <p>
                                {data.title}
                            </p>
                            <p>
                                {data.created_at && moment(data.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}

                            </p>
                        </div>

                        <img src={IMAGE_BASE_URL + data.image_id} alt="" style={{width: '100%'}}/>
                        <div className="container" style={{maxHeight: "70%", overflow: "auto"}}>
                            <div className="row">
                                <div className='col-md-12' dangerouslySetInnerHTML={{__html: data.description}}
                                     style={{padding: '10px 20px'}}/>
                            </div>
                        </div>
                    </>
                    : <div>
                        <h4 className="text-danger text-center">خبر یافت نشد</h4>
                    </div>
            }


        </MainDiv>

    )
}

export default Detail;