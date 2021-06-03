import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import {getClass} from "../../../api";
import NumberSeparator from "../../../utils/NumberSeparator";

const Detail = () => {

    const [data, setData] = useState({});

    const param = useParams();

    useEffect(() => {
        getClass(param.id).then(response => {
            response = response.data.data;
            setData(response);
        })
            .catch(error => error);
    }, [param]);

    return (
        (data && data.id) ?
            <div className="container" style={{margin: 0, padding: 0, backgroundColor: '#fff'}}>
                <p style={{
                    color: 'rgb(101,96,131)',
                    direction: 'rtl',
                    padding: '10px 10px 5px',
                    backgroundColor: 'rgb(246,246,246)',
                    marginBottom: 0
                }}>
                    نام مربی: {data.coach.name}
                </p>
                <div className="col-md-12" style={{padding: 0}}>
                    <img src={data.coach.image_url} alt="" style={{width: '100%'}}/>
                </div>

                <div className="col-md-12" style={{padding: '0 10px'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        padding: '13px 0'
                    }}>
                        <div className='text-success' style={{lineHeight: '30px'}}>
                            تومان <NumberSeparator number={data.cost}/>
                            <br/>
                            <p className='text-left'>مبلغ کلاس</p>

                        </div>
                        <div style={{lineHeight: '30px'}}>
                            نفر {data.capacity}
                            <br/>
                            <p>
                                ویژه {data.gender == 1 ? 'بانوان' : 'آقایان'}
                            </p>

                        </div>
                        <div style={{
                            backgroundColor: 'rgb(246,243,253',
                            color: 'rgb(77,99,122)',
                            padding: '10px 20px',
                            borderRadius: '30px 15px 15px 30px'
                        }}>
                            {data.court.complex.name}
                            <hr style={{
                                marginTop: '7px',
                                marginLeft: '25px',
                                backgroundColor: '#ccc',
                                marginBottom: '5px'
                            }}/>
                            <span className='text-success'>
    {data.court.name}
</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-12"
                     style={{
                         backgroundColor: 'rgb(246,246,246)',
                         padding: '15px 10px', color: '#000',
                         direction: 'rtl'
                     }}>
                    توضیحات کلاس
                </div>
                <div style={{direction: 'rtl', padding: '10px'}} dangerouslySetInnerHTML={{__html: data.descriptions}}/>
                <div className='text-center' style={{padding: '10px'}}>
                    <button style={{
                        borderRadius: '10px',
                        display: 'block',
                        width: '100%',
                        marginBottom: '50px',
                        border: 'none',
                        padding: '10px',
                        backgroundColor: 'rgb(201,237,44)',
                        color: 'rgb(101,96,131)',
                    }}>
                        ثبت نام در کلاس
                    </button>
                </div>
            </div>
            : <div>
                <h4 className="text-danger text-center">کلاس یافت نشد</h4>
            </div>
    )
}

export default Detail;