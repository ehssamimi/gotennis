import Axios from '../utils/Axios';
import AuthAxios from "../utils/AuthAxios";

const getNews = () => Axios('/news');
const getSlider = () => Axios('/sliders');
const getReserve = () => Axios('/reserve');
const getUser = () => AuthAxios('/user');
const getClasses = () => Axios('/class');
const getClass = id => Axios(`/class/${id}`);
const getComplexes = () => Axios('/complexes');
const getSans = (court_id, sport_id = 1) => Axios.post('/sans', {court_id, sport_id});
const getCourts = complex_id => Axios(`/courts?complex_id=${complex_id}`);
// const updateUser = data => AuthAxios.post(`/user/profile`, data);
const userLogin = data => Axios.post(`/user/login`, data);
const verifyMobile = data => Axios.post(`/user/verify-mobile`, data);
const updateUser = data => console.log(data);

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
    verifyMobile
}