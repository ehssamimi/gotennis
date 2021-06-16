import {useState, useEffect} from 'react';
import {getComplexes, getCourts} from "../../api";
import {useParams} from "react-router-dom";
import Swiper from 'react-id-swiper';
import "swiper/css/swiper.css";
import {UseProfile} from "../../Hooks/UseProfile/UseProfile";
import {getIndexIfObjWithAttr} from "../../utils/HelperFunction";

const TopProfile = props => {
    const params = {
        initialSlide: 0,
        spaceBetween: 8,
        slidesPerView:3.4,
        loop: false,
        autoplay: false,
        // rtl: "ltr",
    };

    const {EditUser}=UseProfile();
    let [complex, setComplex] = useState({});

    let [courts, setCourts] = useState([]);

    const param = useParams();

    useEffect(() => {

        getComplexes().then(response => {

            response = response.data.data.data;

            response = response.filter(res => res.id == param.id);

            setComplex(...response);
             EditUser(response[0].name,'complexName')

            // document.getElementsByClassName('salon_btn')[1].click();

        }).catch(error => error);

        getCourts(param.id).then(response => {

            response = response.data.data.data;
             // console.log(response)
            // response.map(item=> {return {...item," selectedselected":true}   )
            // arr.map((item,index) => ({ ...item, selected:true }));


            let arr=[];
            response.map((item,index)=>{
                let row={...item,selected:index===0};
                arr.push(row)
            })

            setCourts(arr);
            props.getSans(response[0].id,response[0].name,complex.name );


        }).catch(error => error);

    }, [param.id]);

    const parentDataHandler = (e, court_id) => {
        props.getSans(court_id);
        props.getCourtName(e.target.innerText, complex.name);
       let indexCourt= getIndexIfObjWithAttr(courts,'id',court_id)
        console.log(indexCourt)
        let arr=[];
        courts.map((item,index)=>{
            let row={};
            if (index===indexCourt){
                  row={...item,selected:!item.selected }
            }else{
                row={...item,selected:false };
            }

            arr.push(row)
        })
        setCourts(arr);
        console.log(arr)

    }


    return (
        <div className="top_profile">
            <div className="container">
                <div className="row" style={{marginTop: "2%"}}>
                    <div className="col-sm-2">
                        <div className="salon_t" style={{marginTop: "1%"}}>
                            مجموعه:
                        </div>
                    </div>
                    <div className="col-sm-10">
                    <span className="salon_btn salon_btn_selected">
                        {complex.name}
                    </span>
                    </div>
                </div>

                <div className="row align-items-center" style={{marginTop: "3%", marginBottom: "7%"}}>
                    <div className="col-sm-1">
                        <div className="salon_t" style={{marginTop: "2%"}}>
                            زمین:
                        </div>
                    </div>
                    <div className="col-sm-11 pl-0" style={{width: '91.66666667%'}} dir='rtl'>


                            {
                                courts.length>1?      <Swiper {...params}  >

                                    {
                                        courts.map(court => <span className={["salon_btn ",court.selected?' salon_btn_selected':' salon_btn_unselected'].join(' ')}
                                                                  style={{marginTop: '3px', cursor: 'pointer'}}
                                                                  key={court.id}
                                                                  onClick={(e) => parentDataHandler(e, court.id,)}
                                        >
                                {court.name}
                            </span>)


                                    }
                                </Swiper>:""

                            }









                    </div>
                </div>

            </div>
        </div>
    )
}
export default TopProfile;