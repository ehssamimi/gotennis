import {useState, useEffect} from 'react';
import {getComplexes, getCourts} from "../../api";
import {Link, useParams} from "react-router-dom";
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
    let [complexList, setcomplexList] = useState({});

    let [courts, setCourts] = useState([]);

    const param = useParams();

    useEffect(() => {
        props.LoadingFunc(true)

        getComplexes().then(response => {

            response = response.data.data.data;
            console.log(param.id)
            console.log(Number(param.id)===2)
           let newArray= response.map(obj=> ({ ...obj, isSelected:Number(param.id)===obj.id   }))
            console.log(newArray)
            setcomplexList(newArray)

            response = response.filter(res => res.id == param.id);

            setComplex(...response);
             EditUser(response[0].name,'complexName')

            // document.getElementsByClassName('salon_btn')[1].click();

        }).catch(error => error);

        getCourts(param.id).then(response => {

            response = response.data.data.data;

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
        // props.LoadingFunc(false)
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
    const selectCourt=(id)=>{
        // complexList.map(obj=> ({ ...obj, isSelected: obj.id ===id }))
        // console.log(complexList)
        // setComplex(complexList)
    }
        console.log(courts)

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
                        {
                            complexList.length>0?complexList.map(item =>
                                <Link to={`/salon/${item.id}`} className={["salon_btn ",item.isSelected?' salon_btn_selected':' salon_btn_unselected'].join(' ')}   key={item.id}>
                                   {item.name}
                                </Link>
                             ):""
                        }

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
                                </Swiper>:  courts.length>0?

                                    <span className={["salon_btn ",courts[0].selected?' salon_btn_selected':' salon_btn_unselected'].join(' ')}
                                                                  style={{marginTop: '3px', cursor: 'pointer'}}
                                                                  key={ courts[0].id}
                                                                  onClick={(e) => parentDataHandler(e, courts[0].id,)}>
                                          { courts[0].name}
                                       </span>:""

                            }









                    </div>
                </div>

            </div>
        </div>
    )
}
export default TopProfile;