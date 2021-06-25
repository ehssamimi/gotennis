import {getNews, showError} from "../../api";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import moment from "jalali-moment";
import {IMAGE_BASE_URL} from "../../utils/Config";
import MainDiv from "../Common/MainDiv/MainDiv";
import TotalLoader from "../Common/IsLoader/LoaderTotal/TotalLoader";

const Detail = () => {

    const [data, setData] = useState({});
    const [isLoading, setisLoading] = useState(true);

    const param = useParams();

    useEffect(() => {
        getNews().then(response => {
            setisLoading(false)
            console.log( response.data.data.data)
            response = response.data.data.data;
            response = response.filter(item => item.id == param.id);
            setData(...response);
        })
            .catch(error =>{
                showError(error);
                setisLoading(false)
            });
    }, [param]);
    return (
        <MainDiv backUrl={'/news'} header={ data.title}>
            <TotalLoader isLoading={isLoading}>
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
                    :
                        isLoading?"":
                            <div>
                                <h4 className="text-danger text-center">خبر یافت نشد</h4>
                            </div>

            }

            </TotalLoader>
        </MainDiv>

    )
}

export default Detail;