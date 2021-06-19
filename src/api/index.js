import Axios from '../utils/Axios';
import Axios2 from '../utils/Axios2';
import AuthAxios from "../utils/AuthAxios";
import {gotennisNotif} from "../utils/Notification";

const getNews = () => Axios('/news');
const getSlider = () => Axios('/sliders');
const getReserve = () => Axios('/reserve');
const getUser = () => AuthAxios('/user');

const getComplexes = () => Axios('/complexes');
const getSans = (court_id, sport_id = 1) => Axios.post('/sans', {court_id, sport_id});
const checkReserved = (sans_id) => Axios.post('/reserve/check', {sans_id}).then(response=>  response).catch(error => ErrorResp(error) );
const preOrder = (sansList) => Axios.post('/pre-order', {"sans_ids":sansList}).then(response=>  response).catch(error => ErrorResp(error) );
const paymentRequest = (payment_type,credit_id,transaction_id) => Axios.post('/payment/validate', { payment_type, credit_id, transaction_id}).then(response=>  response).catch(error => ErrorResp(error) );

const getClasses = () => Axios('/class');
const getClass = id => Axios(`/class/${id}`);
const preOrderClass = ( class_id) => Axios.post(`/class/${class_id}/pre-order`, {class_id}).then(response=>  response).catch(error => ErrorResp(error) );

const getCourts = async complex_id => Axios(`/courts?complex_id=${complex_id}`) ;

const myReserved = () => Axios('/reserve');
const myClass = () => Axios('/class/my_reserves');

const getSuccess = (id) => Axios(`/credits/${id}`);

const updateUser = data => AuthAxios.post(`/user/profile`, data);
const userLogin = mobile => Axios2.post(`/login-mobile`, {mobile});
const verifyMobile = (code,mobile) => Axios2.post(`/verify-mobile`, {  mobile, code});
// const updateUser = data => Axios.post(`/user/profile`,data);

export {
    getNews,
    getSlider,
    getReserve,
    getUser,
    getClasses,
    getClass,
    getComplexes,
    getSans,
    getCourts,
    updateUser,
    userLogin,
    verifyMobile,
    checkReserved,
    preOrder,
    paymentRequest,
    preOrderClass,
    myReserved,
    myClass,
    getSuccess
}

export function ErrorResp(error) {
    console.log(error.response);

    console.log(error);
    var resp = {data:{code: '',
            data: false,
            message: ''}};
    if (error.response===undefined){
        resp={data:{code: 400,
                data: false,
                message: error.message}}

    } else if (error.response.status===400) {
        resp={data:{code: 400,
                data: false,
                message: error.response.data.detail}}

        if (error.response.data.detail==="access denied") {
            console.log("we are out !!!!!!!!!!");
            // localStorage.clear();
            //     window.location.reload();
        }

    } else if (error.response.status===422){
        resp={data:{code: 422,
                data: false,
                message: error.response.statusText}}


    } else if (error.response.status===401){
        resp={data:{code:401,
                data: false,
                message:  error.response.data.detail ||'access deny'}}
        // localStorage.clear();
        // window.location.reload();
    } else{
        resp={data:{code: error.response.status||400,
                data: false,
                message: error.response.data.detail||error.message}}


     }
    console.log("resp");
    console.log(resp);
    return resp;
}
export function showError(error) {
    let{data: {code , data , message }}= ErrorResp(error)
    console.log(error)
    gotennisNotif(4,message)

}